/*
  Warnings:

  - A unique constraint covering the columns `[assertId]` on the table `images` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "images_assertId_key" ON "images"("assertId");
