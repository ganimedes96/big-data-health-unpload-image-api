/*
  Warnings:

  - Added the required column `assertId` to the `images` table without a default value. This is not possible if the table is not empty.
  - Added the required column `displayName` to the `images` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "images" ADD COLUMN     "assertId" TEXT NOT NULL,
ADD COLUMN     "displayName" TEXT NOT NULL;
