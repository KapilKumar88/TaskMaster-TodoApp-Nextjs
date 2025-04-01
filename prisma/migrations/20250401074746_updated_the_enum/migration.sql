/*
  Warnings:

  - The `taskDueTimeFrequency` column on the `Settings` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `autoArchiveTimeFrequency` column on the `Settings` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "TimeFrequency" AS ENUM ('hour', 'day', 'min');

-- AlterTable
ALTER TABLE "Settings" DROP COLUMN "taskDueTimeFrequency",
ADD COLUMN     "taskDueTimeFrequency" "TimeFrequency" NOT NULL DEFAULT 'hour',
DROP COLUMN "autoArchiveTimeFrequency",
ADD COLUMN     "autoArchiveTimeFrequency" "TimeFrequency" NOT NULL DEFAULT 'day';

-- DropEnum
DROP TYPE "TaskTimeFrequency";
