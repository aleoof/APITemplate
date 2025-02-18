/*
  Warnings:

  - You are about to alter the column `qr_code` on the `order` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `order` MODIFY `qr_code` INTEGER NOT NULL;
