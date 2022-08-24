-- CreateEnum
CREATE TYPE "ChannelCategory" AS ENUM ('Streamer', 'Clipper');

-- AlterTable
ALTER TABLE "Channel" ADD COLUMN     "category" "ChannelCategory" NOT NULL DEFAULT 'Streamer';
