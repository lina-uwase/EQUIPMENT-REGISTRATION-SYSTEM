/*
  Warnings:

  - You are about to drop the column `departmentId` on the `employee` table. All the data in the column will be lost.
  - You are about to drop the column `laptopId` on the `employee` table. All the data in the column will be lost.
  - You are about to drop the column `nationalId` on the `employee` table. All the data in the column will be lost.
  - You are about to drop the column `telephone` on the `employee` table. All the data in the column will be lost.
  - You are about to drop the `department` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `laptop` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `department` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `laptopManufacturer` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `model` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serialNumber` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `employee` DROP FOREIGN KEY `Employee_departmentId_fkey`;

-- DropForeignKey
ALTER TABLE `employee` DROP FOREIGN KEY `Employee_laptopId_fkey`;

-- AlterTable
ALTER TABLE `employee` DROP COLUMN `departmentId`,
    DROP COLUMN `laptopId`,
    DROP COLUMN `nationalId`,
    DROP COLUMN `telephone`,
    ADD COLUMN `department` VARCHAR(191) NOT NULL,
    ADD COLUMN `laptopManufacturer` VARCHAR(191) NOT NULL,
    ADD COLUMN `model` VARCHAR(191) NOT NULL,
    ADD COLUMN `serialNumber` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `department`;

-- DropTable
DROP TABLE `laptop`;
