/*
  Warnings:

  - You are about to drop the column `emailErrorLog` on the `Jobs` table. All the data in the column will be lost.
  - You are about to drop the column `fcmErrorLog` on the `Jobs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Jobs" DROP COLUMN "emailErrorLog",
DROP COLUMN "fcmErrorLog";
