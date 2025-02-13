/*
  Warnings:

  - You are about to alter the column `registerDay` on the `order` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `order` MODIFY `registerDay` DATETIME(3) NOT NULL;
