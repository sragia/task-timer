/*
  Warnings:

  - You are about to drop the `BoughtProduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserPayment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BoughtProduct" DROP CONSTRAINT "BoughtProduct_productId_fkey";

-- DropForeignKey
ALTER TABLE "BoughtProduct" DROP CONSTRAINT "BoughtProduct_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserPayment" DROP CONSTRAINT "UserPayment_productId_fkey";

-- DropForeignKey
ALTER TABLE "UserPayment" DROP CONSTRAINT "UserPayment_userId_fkey";

-- DropTable
DROP TABLE "BoughtProduct";

-- DropTable
DROP TABLE "Product";

-- DropTable
DROP TABLE "UserPayment";

-- CreateTable
CREATE TABLE "Day" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Day_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL,
    "endedAt" TIMESTAMP(3) NOT NULL,
    "dayId" TEXT NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Day" ADD CONSTRAINT "Day_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "Day"("id") ON DELETE CASCADE ON UPDATE CASCADE;
