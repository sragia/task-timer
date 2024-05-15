-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "project" TEXT,
ADD COLUMN     "ticketNr" TEXT;

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "tag" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);
