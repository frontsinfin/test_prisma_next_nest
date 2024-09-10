/*
  Warnings:

  - You are about to drop the `category_image` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `image` to the `category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "category" ADD COLUMN     "image" TEXT NOT NULL;

-- DropTable
DROP TABLE "category_image";
