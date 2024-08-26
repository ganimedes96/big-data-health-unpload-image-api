/*
  Warnings:

  - The primary key for the `images` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "images" DROP CONSTRAINT "images_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "images_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "images_id_seq";
