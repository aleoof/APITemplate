-- AlterTable
ALTER TABLE `kit` ADD COLUMN `active` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `order` ADD COLUMN `protocol` VARCHAR(191) NOT NULL DEFAULT '';
