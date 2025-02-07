/*
  Warnings:

  - You are about to drop the column `kitId` on the `material` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `material` DROP FOREIGN KEY `Material_kitId_fkey`;

-- DropIndex
DROP INDEX `Material_kitId_fkey` ON `material`;

-- AlterTable
ALTER TABLE `kit` ADD COLUMN `materials_id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `material` DROP COLUMN `kitId`;
