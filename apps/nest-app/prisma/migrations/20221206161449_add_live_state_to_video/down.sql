/*
  Warnings:

  - Added the required column `youtubeData` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Video" DROP COLUMN "liveState";