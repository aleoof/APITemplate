-- DropForeignKey
ALTER TABLE `orderskits` DROP FOREIGN KEY `OrdersKits_order_id_fkey`;

-- DropIndex
DROP INDEX `OrdersKits_order_id_fkey` ON `orderskits`;

-- AlterTable
ALTER TABLE `orderskits` MODIFY `order_id` INTEGER NULL,
    MODIFY `quantity` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `OrdersKits` ADD CONSTRAINT `OrdersKits_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `Order`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
