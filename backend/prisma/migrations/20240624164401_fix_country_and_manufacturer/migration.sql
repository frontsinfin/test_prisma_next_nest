/*
  Warnings:

  - A unique constraint covering the columns `[country_id]` on the table `product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[manufacturer_id]` on the table `product` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "category_image" DROP CONSTRAINT "category_image_category_id_fkey";

-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_category_id_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "product_country_id_key" ON "product"("country_id");

-- CreateIndex
CREATE UNIQUE INDEX "product_manufacturer_id_key" ON "product"("manufacturer_id");

-- AddForeignKey
ALTER TABLE "category_image" ADD CONSTRAINT "category_image_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
