-- AlterTable
ALTER TABLE "Settings" ALTER COLUMN "autoArchiveTime" DROP NOT NULL,
ALTER COLUMN "autoArchiveTime" SET DEFAULT 30,
ALTER COLUMN "autoArchiveTimeFrequency" SET DEFAULT 'day';
