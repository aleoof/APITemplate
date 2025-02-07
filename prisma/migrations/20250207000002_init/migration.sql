/*
  Warnings:

  - You are about to drop the column `material` on the `kit` table. All the data in the column will be lost.
  - Added the required column `material_is` to the `Kit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `kit` DROP COLUMN `material`,
    ADD COLUMN `material_is` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Kit` ADD CONSTRAINT `Kit_material_is_fkey` FOREIGN KEY (`material_is`) REFERENCES `Material`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
