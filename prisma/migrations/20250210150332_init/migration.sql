/*
  Warnings:

  - Made the column `active` on table `order` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `order` MODIFY `active` BOOLEAN NOT NULL DEFAULT true;
