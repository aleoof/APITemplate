/*
  Warnings:

  - You are about to drop the column `material_id` on the `kit` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `kit` DROP FOREIGN KEY `Kit_material_id_fkey`;

-- DropIndex
DROP INDEX `Kit_material_id_fkey` ON `kit`;

-- AlterTable
ALTER TABLE `kit` DROP COLUMN `material_id`;

-- AlterTable
ALTER TABLE `material` ADD COLUMN `kitId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Material` ADD CONSTRAINT `Material_kitId_fkey` FOREIGN KEY (`kitId`) REFERENCES `Kit`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
