/*
  Warnings:

  - You are about to drop the column `createdAt` on the `category_image` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `category_image` table. All the data in the column will be lost.
  - You are about to drop the column `filename` on the `category_image` table. All the data in the column will be lost.
  - You are about to drop the column `mimetype` on the `category_image` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "category_image" DROP COLUMN "createdAt",
DROP COLUMN "description",
DROP COLUMN "filename",
DROP COLUMN "mimetype",
ADD COLUMN     "format" TEXT,
ADD COLUMN     "public_id" TEXT,
ADD COLUMN     "version" TEXT;
