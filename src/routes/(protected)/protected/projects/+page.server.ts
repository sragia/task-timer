import { taskManager } from "$lib/server/tasks";
import type { Day, Project } from "@prisma/client";
import { redirect, type Actions, fail } from "@sveltejs/kit";
import type { RequestEvent } from "../$types";

export const actions: Actions = {
    create: async (event) => {
        if (!event.locals.user) redirect(302, '/');
        const formData = await event.request.formData();
        await taskManager.createProject(formData.get('tag') as string);
    },

    delete: async (event) => {
        if (!event.locals.user) redirect(302, '/');
        const formData = await event.request.formData();
        await taskManager.deleteProject(formData.get('tag') as string);
    }
};

export const load = async (event: RequestEvent): Promise<{
    projects: Project[] | null
}> => {
    if (!event.locals.user) redirect(302, '/');

    const projects = await taskManager.getProjects();

    return {
        projects
    };
}