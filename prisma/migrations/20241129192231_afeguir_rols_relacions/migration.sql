-- CreateEnum
CREATE TYPE "Role" AS ENUM ('STANDARD', 'OWNER', 'ADMIN');

-- AlterTable
ALTER TABLE "Club" ADD COLUMN     "ownerId" INTEGER;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "authProvider" TEXT,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "nif" TEXT,
ADD COLUMN     "provider_id" TEXT,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'STANDARD';

-- AddForeignKey
ALTER TABLE "Club" ADD CONSTRAINT "Club_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
