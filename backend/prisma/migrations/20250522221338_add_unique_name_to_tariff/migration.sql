/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Tariff` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Tariff_name_key" ON "Tariff"("name");
