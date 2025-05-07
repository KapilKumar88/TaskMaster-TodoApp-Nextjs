-- AlterTable
ALTER TABLE "Jobs" ADD COLUMN     "emailNotificationRequested" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "fcmNotificationRequested" BOOLEAN NOT NULL DEFAULT false;
