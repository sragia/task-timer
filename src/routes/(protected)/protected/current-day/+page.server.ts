import { taskManager } from "$lib/server/tasks";
import type { Day } from "@prisma/client";
import { redirect, type Actions, fail } from "@sveltejs/kit";
import type { RequestEvent } from "../$types";

export const actions: Actions = {
    createNewDay: async (event) => {
        if (!event.locals.user) redirect(302, '/');
        await taskManager.createNewDay(event.locals.user.id);

        return {
            message: 'Started New Day'
        }
    },
    createNewTask: async (event) => {
        const formData = await event.request.formData();

        const dayId = formData.get('dayId') as string;
        const description = formData.get('description') as string;
        console.log(dayId, description);
        if (!dayId || !description) {
            return fail(400, {
                message: 'Missing Description'
            });
        }

        await taskManager.createNewTask(dayId, description);

        return {
            message: 'New Task Created'
        }
    },
    endCurrentDay: async (event) => {
        if (!event.locals.user) redirect(302, '/');
        await taskManager.endCurrentDay(event.locals.user.id);

        return {
            message: 'Ended Day. Cya tomorrow'
        }
    }
};

export const load = async (event: RequestEvent): Promise<{
    activeDay: Day | false
}> => {
    if (!event.locals.user) redirect(302, '/');
    const activeDay = await taskManager.getActiveDay(event.locals.user.id);
    if (activeDay) {
        activeDay.Tasks = activeDay.Tasks.reverse();
    }
    return {
        activeDay
    };
}