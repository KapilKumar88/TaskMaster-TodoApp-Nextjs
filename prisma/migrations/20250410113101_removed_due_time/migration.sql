/*
  Warnings:

  - You are about to drop the column `dueDate` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `dueTime` on the `Task` table. All the data in the column will be lost.
  - Added the required column `dueDateTime` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "dueDate",
DROP COLUMN "dueTime",
ADD COLUMN     "dueDateTime" TIMESTAMP(3) NOT NULL;
