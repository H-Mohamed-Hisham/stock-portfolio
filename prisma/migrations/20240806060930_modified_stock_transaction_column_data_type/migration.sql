/*
  Warnings:

  - You are about to alter the column `price` on the `StockTransaction` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(9,2)`.
  - You are about to alter the column `tax` on the `StockTransaction` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(9,2)`.
  - You are about to alter the column `total` on the `StockTransaction` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(9,2)`.

*/
-- AlterTable
ALTER TABLE "StockTransaction" ALTER COLUMN "price" SET DATA TYPE DECIMAL(9,2),
ALTER COLUMN "tax" SET DATA TYPE DECIMAL(9,2),
ALTER COLUMN "total" SET DATA TYPE DECIMAL(9,2);
