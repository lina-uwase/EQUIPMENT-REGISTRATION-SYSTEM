/*
  Warnings:

  - Added the required column `nationalId` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telephone` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `employee` ADD COLUMN `nationalId` VARCHAR(191) NOT NULL,
    ADD COLUMN `telephone` INTEGER NOT NULL;
