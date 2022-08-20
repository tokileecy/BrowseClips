/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `ChannelGroup` will be added. If there are existing duplicate values, this will fail.
  - Made the column `name` on table `ChannelGroup` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ChannelGroup" ALTER COLUMN "name" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ChannelGroup_name_key" ON "ChannelGroup"("name");
