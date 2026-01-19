/*
  Warnings:

  - You are about to drop the column `alamat` on the `jabatan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "jabatan" DROP COLUMN "alamat",
ADD COLUMN     "deskripsi" TEXT;
