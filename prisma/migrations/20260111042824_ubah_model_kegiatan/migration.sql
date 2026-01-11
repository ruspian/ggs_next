/*
  Warnings:

  - You are about to drop the column `description` on the `kegiatan` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `kegiatan` table. All the data in the column will be lost.
  - Added the required column `content` to the `kegiatan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kategori` to the `kegiatan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `kegiatan` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "KategoriPost" AS ENUM ('Konservasi', 'Edukasi', 'Komunitas', 'Aksi');

-- AlterTable
ALTER TABLE "kegiatan" DROP COLUMN "description",
DROP COLUMN "name",
ADD COLUMN     "author" TEXT,
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "kategori" "KategoriPost" NOT NULL,
ADD COLUMN     "lokasi" TEXT,
ADD COLUMN     "title" TEXT NOT NULL,
ALTER COLUMN "image" DROP NOT NULL,
ALTER COLUMN "image" SET DATA TYPE TEXT;
