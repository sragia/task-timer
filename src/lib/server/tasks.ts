import type { Day, PrismaClient, Project, Task, User } from "@prisma/client"
import { db, lucia } from "./auth"
import type { Lucia } from "lucia"

class TaskManager {
    db: PrismaClient
    lucia: Lucia

    constructor() {
        this.db = db
        this.lucia = lucia
    }
    async getUser(userId: string): Promise<User | null> {
        return await this.db.user.findFirst({
            where: {
                id: userId
            },
            include: {
                DayTasks: {
                    include: {
                        Tasks: true
                    }
                }
            }
        });
    }

    async getActiveDay(userId: string): Promise<Day | false> {
        const user = await this.getUser(userId);
        if (!user) {
            return false;
        }

        const day = await this.db.day.findFirst({
            where: {
                userId: user.id,
                endedAt: null
            },
            include: {
                Tasks: true
            }
        });
        if (!day) {
            return false;
        }

        return day;
    }

    async createNewDay(userId: string) {
        const user = await this.getUser(userId);
        if (!user) {
            return false;
        }

        await this.db.day.updateMany({
            where: {
                endedAt: null
            },
            data: {
                endedAt: new Date()
            }
        });

        const day = await this.db.day.create({
            data: {
                userId: user.id,
                startedAt: new Date(),
            }
        });
    }

    async endCurrentDay(userId: string, dayId: string) {
        const activeDay = await this.getActiveDay(userId);

        if (!activeDay) {
            return false;
        }

        await this.db.day.update({
            where: {
                id: activeDay.id
            },
            data: {
                endedAt: new Date()
            }
        });

        await this.db.task.updateMany({
            where: {
                dayId: activeDay.id,
                endedAt: null
            },
            data: {
                endedAt: new Date()
            }
        });
    }

    async createNewTask(dayId: string, description: string, project?: string, ticketNr?: string, offset?: string): Promise<Task> {
        const off = this.cleanValue(offset);
        const currentDate = new Date(Date.now() - (off ? parseInt(off) * 1000 : 0));

        console.log(currentDate, typeof offset);
        // Update any previous tasks as completed (usually should be just 1)
        await this.db.task.updateMany({
            where: {
                dayId,
                endedAt: null
            },
            data: {
                endedAt: currentDate
            }
        });

        console.log(project)
        return this.db.task.create({
            data: {
                description,
                dayId,
                project: this.cleanValue(project),
                ticketNr: ticketNr || null,
                startedAt: currentDate
            }
        })
    }

    cleanValue(value?: string): string | null | undefined {
        if (value === 'undefined') {
            return null;
        }

        return value;
    }

    async createProject(projectName: string): Promise<Project> {
        return this.db.project.create({
            data: { tag: projectName }
        });
    }

    async deleteProject(tag: string): Promise<void> {
        console.log(tag);
        await this.db.project.deleteMany({
            where: {
                tag
            }
        });
    }

    async getProjects(): Promise<Project[]> {
        return this.db.project.findMany();
    }
}

export const taskManager = new TaskManager();