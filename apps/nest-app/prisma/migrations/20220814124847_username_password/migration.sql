/*
  Warnings:

  - Made the column `password` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "user" RENAME COLUMN "name" TO "username";
ALTER TABLE "user" ALTER COLUMN "username" SET NOT NULL;
ALTER TABLE "user" ADD COLUMN "password" TEXT NOT NULL;

CREATE UNIQUE INDEX "user_username_key" ON "user"("username");