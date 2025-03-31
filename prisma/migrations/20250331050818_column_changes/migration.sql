-- AlterTable
ALTER TABLE "Settings"
ADD COLUMN     "autoArchiveTime" INTEGER NOT NULL,
ADD COLUMN     "autoArchiveTimeFrequency" "TaskTimeFrequency" NOT NULL DEFAULT 'Hour';
