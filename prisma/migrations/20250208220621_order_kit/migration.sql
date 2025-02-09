/*
  Warnings:

  - Added the required column `quantity` to the `OrdersKits` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `orderskits` ADD COLUMN `quantity` VARCHAR(191) NOT NULL;
