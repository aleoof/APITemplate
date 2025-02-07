/*
  Warnings:

  - You are about to drop the column `material_is` on the `kit` table. All the data in the column will be lost.
  - Added the required column `material_id` to the `Kit` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `kit` DROP FOREIGN KEY `Kit_material_is_fkey`;

-- DropIndex
DROP INDEX `Kit_material_is_fkey` ON `kit`;

-- AlterTable
ALTER TABLE `kit` DROP COLUMN `material_is`,
    ADD COLUMN `material_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Kit` ADD CONSTRAINT `Kit_material_id_fkey` FOREIGN KEY (`material_id`) REFERENCES `Material`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
