-- CreateTable
CREATE TABLE `Material` (
    `id` VARCHAR(191) NOT NULL,
    `código` VARCHAR(191) NOT NULL,
    `descrição` VARCHAR(191) NOT NULL,
    `quantidade` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Material_código_key`(`código`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
