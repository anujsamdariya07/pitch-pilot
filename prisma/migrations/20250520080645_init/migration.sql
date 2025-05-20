/*
  Warnings:

  - You are about to drop the column `lookChat` on the `Webinar` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Webinar" DROP COLUMN "lookChat",
ADD COLUMN     "lockChat" BOOLEAN NOT NULL DEFAULT false;
