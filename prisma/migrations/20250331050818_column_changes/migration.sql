/*
  Warnings:

  - You are about to drop the column `authArchiveTime` on the `Settings` table. All the data in the column will be lost.
  - Added the required column `autoArchiveTime` to the `Settings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Settings" DROP COLUMN "authArchiveTime",
ADD COLUMN     "autoArchiveTime" INTEGER NOT NULL,
ADD COLUMN     "autoArchiveTimeFrequency" "TaskTimeFrequency" NOT NULL DEFAULT 'Hour';
