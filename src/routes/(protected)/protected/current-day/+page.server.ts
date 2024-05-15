import { taskManager } from "$lib/server/tasks";
import type { Day, Project } from "@prisma/client";
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
        const project = formData.get('project') as string;
        const ticketNr = formData.get('ticketNr') as string;
        const offset = formData.get('offset') as string;
        console.log(dayId, description);
        if (!dayId || !description) {
            return fail(400, {
                message: 'Missing Description'
            });
        }
        console.log(dayId, description, project, ticketNr);
        await taskManager.createNewTask(dayId, description, project, ticketNr, offset);

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
    projects: Project[] | null
}> => {
    if (!event.locals.user) redirect(302, '/');
    const activeDay = await taskManager.getActiveDay(event.locals.user.id);
    if (activeDay) {
        activeDay.Tasks = activeDay.Tasks.reverse();
    }

    const projects = await taskManager.getProjects();
    return {
        activeDay,
        projects
    };
}