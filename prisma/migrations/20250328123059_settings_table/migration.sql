-- CreateEnum
CREATE TYPE "WeekStartDay" AS ENUM ('Sunday', 'Monday', 'Saturday');

-- CreateEnum
CREATE TYPE "TaskTimeFrequency" AS ENUM ('Hour', 'Day', 'Min');

-- CreateEnum
CREATE TYPE "AppTheme" AS ENUM ('Light', 'Dark', 'System');

-- CreateTable
CREATE TABLE "Settings" (
    "id" SERIAL NOT NULL,
    "userId" UUID NOT NULL,
    "timeZone" TEXT NOT NULL,
    "dateFormat" TEXT NOT NULL,
    "weekStartDay" "WeekStartDay" NOT NULL DEFAULT 'Sunday',
    "autoArchive" BOOLEAN NOT NULL DEFAULT false,
    "emailNotifications" BOOLEAN NOT NULL DEFAULT true,
    "pushNotification" BOOLEAN NOT NULL DEFAULT true,
    "taskDueReminder" BOOLEAN NOT NULL DEFAULT true,
    "taskDueTime" INTEGER NOT NULL DEFAULT 1,
    "taskDueTimeFrequency" "TaskTimeFrequency" NOT NULL DEFAULT 'Hour',
    "weeklySummary" BOOLEAN NOT NULL DEFAULT false,
    "appTheme" "AppTheme" NOT NULL DEFAULT 'System',
    "accentColor" TEXT,
    "glassEffectIntensity" INTEGER NOT NULL DEFAULT 50,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Settings_userId_key" ON "Settings"("userId");

-- AddForeignKey
ALTER TABLE "Settings" ADD CONSTRAINT "Settings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
