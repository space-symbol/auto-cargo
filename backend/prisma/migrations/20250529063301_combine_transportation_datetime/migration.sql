-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('CLIENT', 'ADMIN', 'MANAGER');

-- CreateEnum
CREATE TYPE "CargoRequestStatus" AS ENUM ('PENDING', 'PROCESSING', 'IN_TRANSIT', 'COMPLETED', 'CANCELLED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "company" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'CLIENT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CargoRequest" (
    "id" TEXT NOT NULL,
    "cargoTypeId" TEXT NOT NULL,
    "vehicleTypeId" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "volume" DOUBLE PRECISION NOT NULL,
    "distance" DOUBLE PRECISION NOT NULL,
    "status" "CargoRequestStatus" NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL,
    "userId" TEXT NOT NULL,
    "tariffId" TEXT NOT NULL,
    "baseRate" DOUBLE PRECISION NOT NULL,
    "weightRate" DOUBLE PRECISION NOT NULL,
    "volumeRate" DOUBLE PRECISION NOT NULL,
    "distanceRate" DOUBLE PRECISION NOT NULL,
    "fromAddressId" TEXT NOT NULL,
    "toAddressId" TEXT NOT NULL,
    "transportationDateTime" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CargoRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CargoRequestStatusHistory" (
    "id" TEXT NOT NULL,
    "status" "CargoRequestStatus" NOT NULL,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "requestId" TEXT NOT NULL,

    CONSTRAINT "CargoRequestStatusHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tariff" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "baseRate" DOUBLE PRECISION NOT NULL,
    "weightRate" DOUBLE PRECISION NOT NULL,
    "volumeRate" DOUBLE PRECISION NOT NULL,
    "distanceRate" DOUBLE PRECISION NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tariff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VehicleType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "maxWeight" DOUBLE PRECISION NOT NULL,
    "maxVolume" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VehicleType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CargoType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CargoType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "building" TEXT NOT NULL,
    "region" TEXT,
    "postalCode" TEXT,
    "country" TEXT NOT NULL DEFAULT 'Россия',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

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
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_createdAt_idx" ON "User"("createdAt");

-- CreateIndex
CREATE INDEX "CargoRequest_status_idx" ON "CargoRequest"("status");

-- CreateIndex
CREATE INDEX "CargoRequest_userId_idx" ON "CargoRequest"("userId");

-- CreateIndex
CREATE INDEX "CargoRequest_createdAt_idx" ON "CargoRequest"("createdAt");

-- CreateIndex
CREATE INDEX "CargoRequest_vehicleTypeId_idx" ON "CargoRequest"("vehicleTypeId");

-- CreateIndex
CREATE INDEX "CargoRequestStatusHistory_requestId_idx" ON "CargoRequestStatusHistory"("requestId");

-- CreateIndex
CREATE UNIQUE INDEX "Tariff_name_key" ON "Tariff"("name");

-- CreateIndex
CREATE INDEX "Tariff_isActive_idx" ON "Tariff"("isActive");

-- CreateIndex
CREATE UNIQUE INDEX "VehicleType_name_key" ON "VehicleType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CargoType_name_key" ON "CargoType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Address_city_street_building_postalCode_key" ON "Address"("city", "street", "building", "postalCode");

-- CreateIndex
CREATE INDEX "VehicleTypeOnTariff_vehicleTypeId_idx" ON "VehicleTypeOnTariff"("vehicleTypeId");

-- CreateIndex
CREATE INDEX "VehicleTypeOnTariff_tariffId_idx" ON "VehicleTypeOnTariff"("tariffId");

-- CreateIndex
CREATE INDEX "CargoTypeOnTariff_cargoTypeId_idx" ON "CargoTypeOnTariff"("cargoTypeId");

-- CreateIndex
CREATE INDEX "CargoTypeOnTariff_tariffId_idx" ON "CargoTypeOnTariff"("tariffId");

-- AddForeignKey
ALTER TABLE "CargoRequest" ADD CONSTRAINT "CargoRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CargoRequest" ADD CONSTRAINT "CargoRequest_cargoTypeId_fkey" FOREIGN KEY ("cargoTypeId") REFERENCES "CargoType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CargoRequest" ADD CONSTRAINT "CargoRequest_vehicleTypeId_fkey" FOREIGN KEY ("vehicleTypeId") REFERENCES "VehicleType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CargoRequest" ADD CONSTRAINT "CargoRequest_tariffId_fkey" FOREIGN KEY ("tariffId") REFERENCES "Tariff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CargoRequest" ADD CONSTRAINT "CargoRequest_fromAddressId_fkey" FOREIGN KEY ("fromAddressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CargoRequest" ADD CONSTRAINT "CargoRequest_toAddressId_fkey" FOREIGN KEY ("toAddressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CargoRequestStatusHistory" ADD CONSTRAINT "CargoRequestStatusHistory_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "CargoRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehicleTypeOnTariff" ADD CONSTRAINT "VehicleTypeOnTariff_vehicleTypeId_fkey" FOREIGN KEY ("vehicleTypeId") REFERENCES "VehicleType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehicleTypeOnTariff" ADD CONSTRAINT "VehicleTypeOnTariff_tariffId_fkey" FOREIGN KEY ("tariffId") REFERENCES "Tariff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CargoTypeOnTariff" ADD CONSTRAINT "CargoTypeOnTariff_cargoTypeId_fkey" FOREIGN KEY ("cargoTypeId") REFERENCES "CargoType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CargoTypeOnTariff" ADD CONSTRAINT "CargoTypeOnTariff_tariffId_fkey" FOREIGN KEY ("tariffId") REFERENCES "Tariff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
