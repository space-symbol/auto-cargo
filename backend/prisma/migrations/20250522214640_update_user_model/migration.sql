-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('CLIENT', 'ADMIN', 'MANAGER');

-- CreateEnum
CREATE TYPE "CargoRequestStatus" AS ENUM ('PENDING', 'PROCESSING', 'IN_TRANSIT', 'COMPLETED', 'CANCELLED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'CLIENT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- Add firstName and lastName columns
ALTER TABLE "User" ADD COLUMN "firstName" TEXT;
ALTER TABLE "User" ADD COLUMN "lastName" TEXT;
ALTER TABLE "User" ADD COLUMN "company" TEXT;

-- Update existing data
UPDATE "User" SET 
    "firstName" = SPLIT_PART("name", ' ', 1),
    "lastName" = SUBSTRING("name" FROM POSITION(' ' IN "name") + 1);

-- Make firstName and lastName required
ALTER TABLE "User" ALTER COLUMN "firstName" SET NOT NULL;
ALTER TABLE "User" ALTER COLUMN "lastName" SET NOT NULL;

-- Drop the name column
ALTER TABLE "User" DROP COLUMN "name";

-- CreateTable
CREATE TABLE "CargoRequest" (
    "id" TEXT NOT NULL,
    "cargoType" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "volume" DOUBLE PRECISION NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "distance" DOUBLE PRECISION,
    "vehicleType" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "status" "CargoRequestStatus" NOT NULL DEFAULT 'PENDING',
    "cost" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

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

-- CreateIndex
CREATE UNIQUE INDEX "VehicleType_name_key" ON "VehicleType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CargoType_name_key" ON "CargoType"("name");

-- AddForeignKey
ALTER TABLE "CargoRequest" ADD CONSTRAINT "CargoRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CargoRequestStatusHistory" ADD CONSTRAINT "CargoRequestStatusHistory_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "CargoRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
