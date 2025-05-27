/*
  Warnings:

  - You are about to drop the column `cargoTypeId` on the `Tariff` table. All the data in the column will be lost.
  - You are about to drop the column `vehicleTypeId` on the `Tariff` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Tariff" DROP CONSTRAINT "Tariff_cargoTypeId_fkey";

-- DropForeignKey
ALTER TABLE "Tariff" DROP CONSTRAINT "Tariff_vehicleTypeId_fkey";

-- DropIndex
DROP INDEX "Tariff_cargoTypeId_idx";

-- DropIndex
DROP INDEX "Tariff_vehicleTypeId_idx";

-- AlterTable
ALTER TABLE "Tariff" DROP COLUMN "cargoTypeId",
DROP COLUMN "vehicleTypeId";

-- CreateTable
CREATE TABLE "VehicleTypeOnTariff" (
    "vehicleTypeId" TEXT NOT NULL,
    "tariffId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VehicleTypeOnTariff_pkey" PRIMARY KEY ("vehicleTypeId","tariffId")
);

-- CreateTable
CREATE TABLE "CargoTypeOnTariff" (
    "cargoTypeId" TEXT NOT NULL,
    "tariffId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CargoTypeOnTariff_pkey" PRIMARY KEY ("cargoTypeId","tariffId")
);

-- CreateIndex
CREATE INDEX "VehicleTypeOnTariff_vehicleTypeId_idx" ON "VehicleTypeOnTariff"("vehicleTypeId");

-- CreateIndex
CREATE INDEX "VehicleTypeOnTariff_tariffId_idx" ON "VehicleTypeOnTariff"("tariffId");

-- CreateIndex
CREATE INDEX "CargoTypeOnTariff_cargoTypeId_idx" ON "CargoTypeOnTariff"("cargoTypeId");

-- CreateIndex
CREATE INDEX "CargoTypeOnTariff_tariffId_idx" ON "CargoTypeOnTariff"("tariffId");

-- CreateIndex
CREATE INDEX "Tariff_isActive_idx" ON "Tariff"("isActive");

-- AddForeignKey
ALTER TABLE "VehicleTypeOnTariff" ADD CONSTRAINT "VehicleTypeOnTariff_vehicleTypeId_fkey" FOREIGN KEY ("vehicleTypeId") REFERENCES "VehicleType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehicleTypeOnTariff" ADD CONSTRAINT "VehicleTypeOnTariff_tariffId_fkey" FOREIGN KEY ("tariffId") REFERENCES "Tariff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CargoTypeOnTariff" ADD CONSTRAINT "CargoTypeOnTariff_cargoTypeId_fkey" FOREIGN KEY ("cargoTypeId") REFERENCES "CargoType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CargoTypeOnTariff" ADD CONSTRAINT "CargoTypeOnTariff_tariffId_fkey" FOREIGN KEY ("tariffId") REFERENCES "Tariff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
