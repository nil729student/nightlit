/*
  Warnings:

  - Made the column `name` on table `Club` required. This step will fail if there are existing NULL values in that column.
  - Made the column `addrCity` on table `Club` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Club" ADD COLUMN     "tiktok" TEXT,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "addrCity" SET NOT NULL,
ALTER COLUMN "latitude" DROP NOT NULL,
ALTER COLUMN "longitude" DROP NOT NULL,
ALTER COLUMN "nodeId" DROP NOT NULL;
