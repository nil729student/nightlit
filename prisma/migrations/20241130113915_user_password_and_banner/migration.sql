-- AlterTable
ALTER TABLE "Club" ADD COLUMN     "banner" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT NOT NULL DEFAULT 'password';
