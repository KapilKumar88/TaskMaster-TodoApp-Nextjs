/*
  Warnings:

  - You are about to drop the column `sentOn` on the `Jobs` table. All the data in the column will be lost.
  - Added the required column `scheduledTime` to the `Jobs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Jobs" DROP COLUMN "sentOn",
ADD COLUMN     "scheduledTime" TIMESTAMP(3) NOT NULL;
