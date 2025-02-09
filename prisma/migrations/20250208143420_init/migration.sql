/*
  Warnings:

  - You are about to drop the column `kits` on the `order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `order` DROP COLUMN `kits`;

-- CreateTable
CREATE TABLE `OrdersKits` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `order_id` INTEGER NOT NULL,
    `kit_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `OrdersKits` ADD CONSTRAINT `OrdersKits_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrdersKits` ADD CONSTRAINT `OrdersKits_kit_id_fkey` FOREIGN KEY (`kit_id`) REFERENCES `Kit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
