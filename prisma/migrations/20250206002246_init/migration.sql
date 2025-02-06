/*
  Warnings:

  - You are about to drop the column `code` on the `kit` table. All the data in the column will be lost.
  - You are about to drop the column `code` on the `material` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Kit_code_key` ON `kit`;

-- DropIndex
DROP INDEX `Material_code_key` ON `material`;

-- AlterTable
ALTER TABLE `kit` DROP COLUMN `code`;

-- AlterTable
ALTER TABLE `material` DROP COLUMN `code`;
