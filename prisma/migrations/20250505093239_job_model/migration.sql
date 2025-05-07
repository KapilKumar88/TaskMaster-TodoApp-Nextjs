-- CreateEnum
CREATE TYPE "JobStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED');

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "archived" BOOLEAN DEFAULT false;

-- CreateTable
CREATE TABLE "Jobs" (
    "id" SERIAL NOT NULL,
    "taskId" INTEGER NOT NULL,
    "jobId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" "JobStatus" NOT NULL,
    "fcmErrorLog" TEXT,
    "emailErrorLog" TEXT,
    "retryCount" INTEGER NOT NULL DEFAULT 0,
    "emailSent" BOOLEAN NOT NULL DEFAULT false,
    "fcmSent" BOOLEAN NOT NULL DEFAULT false,
    "sentOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Jobs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Jobs_jobId_key" ON "Jobs"("jobId");

-- AddForeignKey
ALTER TABLE "Jobs" ADD CONSTRAINT "Jobs_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;
