-- AlterTable
ALTER TABLE "users" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "images" (
    "id" SERIAL NOT NULL,
    "publicId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "images_publicId_key" ON "images"("publicId");

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
