/*
  Warnings:

  - Added the required column `userId` to the `Jobs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Jobs" ADD COLUMN     "userId" UUID NOT NULL,
ALTER COLUMN "sentOn" DROP DEFAULT;
