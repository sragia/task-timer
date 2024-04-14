import { taskManager } from "$lib/server/tasks";
import type { Day } from "@prisma/client";
import { redirect } from "@sveltejs/kit";
import type { RequestEvent } from "../$types";

export const load = async (event: RequestEvent): Promise<{
    activeDay: Day | false
}> => {
    if (!event.locals.user) redirect(302, '/');
    const user = await taskManager.getUser(event.locals.user.id);
    if (user?.DayTasks) {
        user.DayTasks = user.DayTasks.reverse();
    }
    return {
        days: user?.DayTasks
    };
}