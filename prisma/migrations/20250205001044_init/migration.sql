/*
  Warnings:

  - You are about to drop the column `código` on the `material` table. All the data in the column will be lost.
  - You are about to drop the column `descrição` on the `material` table. All the data in the column will be lost.
  - You are about to drop the column `quantidade` on the `material` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[code]` on the table `Material` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `Material` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Material` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Material` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Material_código_key` ON `material`;

-- AlterTable
ALTER TABLE `material` DROP COLUMN `código`,
    DROP COLUMN `descrição`,
    DROP COLUMN `quantidade`,
    ADD COLUMN `code` VARCHAR(191) NOT NULL,
    ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `quantity` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Material_code_key` ON `Material`(`code`);
