/*
  Warnings:

  - Added the required column `youtubeData` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "youtubeData" JSONB,
ALTER COLUMN "tags" SET DEFAULT ARRAY[]::TEXT[];
