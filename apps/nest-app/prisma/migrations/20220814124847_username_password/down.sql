-- AlterTable
DROP INDEX "user_username_key";
ALTER TABLE "user" RENAME COLUMN "username" TO "name";
ALTER TABLE "user" DROP COLUMN "password";