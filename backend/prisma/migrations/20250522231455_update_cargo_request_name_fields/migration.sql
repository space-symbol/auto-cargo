/*
  Warnings:

  - You are about to drop the column `name` on the `CargoRequest` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `CargoRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `CargoRequest` table without a default value. This is not possible if the table is not empty.

*/
-- Сначала добавляем новые колонки как nullable
ALTER TABLE "CargoRequest" ADD COLUMN "firstName" TEXT;
ALTER TABLE "CargoRequest" ADD COLUMN "lastName" TEXT;

-- Обновляем существующие данные, разделяя name на firstName и lastName
UPDATE "CargoRequest"
SET 
  "firstName" = SPLIT_PART("name", ' ', 1),
  "lastName" = SUBSTRING("name" FROM POSITION(' ' IN "name") + 1);

-- Делаем колонки обязательными
ALTER TABLE "CargoRequest" ALTER COLUMN "firstName" SET NOT NULL;
ALTER TABLE "CargoRequest" ALTER COLUMN "lastName" SET NOT NULL;

-- Удаляем старую колонку name
ALTER TABLE "CargoRequest" DROP COLUMN "name";
