/*
  Warnings:

  - The values [Light,Dark,System] on the enum `AppTheme` will be removed. If these variants are still used in the database, this will fail.
  - The values [Hour,Day,Min] on the enum `TaskTimeFrequency` will be removed. If these variants are still used in the database, this will fail.
  - The values [Sunday,Monday,Saturday] on the enum `WeekStartDay` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AppTheme_new" AS ENUM ('light', 'dark', 'system');
ALTER TABLE "Settings" ALTER COLUMN "appTheme" DROP DEFAULT;
ALTER TABLE "Settings" ALTER COLUMN "appTheme" TYPE "AppTheme_new" USING ("appTheme"::text::"AppTheme_new");
ALTER TYPE "AppTheme" RENAME TO "AppTheme_old";
ALTER TYPE "AppTheme_new" RENAME TO "AppTheme";
DROP TYPE "AppTheme_old";
ALTER TABLE "Settings" ALTER COLUMN "appTheme" SET DEFAULT 'system';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "TaskTimeFrequency_new" AS ENUM ('hour', 'day', 'min');
ALTER TABLE "Settings" ALTER COLUMN "autoArchiveTimeFrequency" DROP DEFAULT;
ALTER TABLE "Settings" ALTER COLUMN "taskDueTimeFrequency" DROP DEFAULT;
ALTER TABLE "Settings" ALTER COLUMN "autoArchiveTimeFrequency" TYPE "TaskTimeFrequency_new" USING ("autoArchiveTimeFrequency"::text::"TaskTimeFrequency_new");
ALTER TABLE "Settings" ALTER COLUMN "taskDueTimeFrequency" TYPE "TaskTimeFrequency_new" USING ("taskDueTimeFrequency"::text::"TaskTimeFrequency_new");
ALTER TYPE "TaskTimeFrequency" RENAME TO "TaskTimeFrequency_old";
ALTER TYPE "TaskTimeFrequency_new" RENAME TO "TaskTimeFrequency";
DROP TYPE "TaskTimeFrequency_old";
ALTER TABLE "Settings" ALTER COLUMN "autoArchiveTimeFrequency" SET DEFAULT 'hour';
ALTER TABLE "Settings" ALTER COLUMN "taskDueTimeFrequency" SET DEFAULT 'hour';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "WeekStartDay_new" AS ENUM ('sunday', 'monday', 'saturday');
ALTER TABLE "Settings" ALTER COLUMN "weekStartDay" DROP DEFAULT;
ALTER TABLE "Settings" ALTER COLUMN "weekStartDay" TYPE "WeekStartDay_new" USING ("weekStartDay"::text::"WeekStartDay_new");
ALTER TYPE "WeekStartDay" RENAME TO "WeekStartDay_old";
ALTER TYPE "WeekStartDay_new" RENAME TO "WeekStartDay";
DROP TYPE "WeekStartDay_old";
ALTER TABLE "Settings" ALTER COLUMN "weekStartDay" SET DEFAULT 'sunday';
COMMIT;

-- AlterTable
ALTER TABLE "Settings" ALTER COLUMN "weekStartDay" SET DEFAULT 'sunday',
ALTER COLUMN "taskDueTimeFrequency" SET DEFAULT 'hour',
ALTER COLUMN "appTheme" SET DEFAULT 'system',
ALTER COLUMN "autoArchiveTimeFrequency" SET DEFAULT 'hour';
