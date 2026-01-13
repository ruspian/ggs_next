/*
  Warnings:

  - The values [Suspended] on the enum `UserStatus` will be removed. If these variants are still used in the database, this will fail.
  - The primary key for the `_UserDislikes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_UserLikes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `Galeri` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[A,B]` on the table `_UserDislikes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[A,B]` on the table `_UserLikes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "JenisKelamin" AS ENUM ('LakiLaki', 'Perempuan');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "MemberStatus" ADD VALUE 'Relawan';
ALTER TYPE "MemberStatus" ADD VALUE 'Kontributor';

-- AlterEnum
BEGIN;
CREATE TYPE "UserStatus_new" AS ENUM ('Active', 'Inactive');
ALTER TABLE "users" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "users" ALTER COLUMN "status" TYPE "UserStatus_new" USING ("status"::text::"UserStatus_new");
ALTER TYPE "UserStatus" RENAME TO "UserStatus_old";
ALTER TYPE "UserStatus_new" RENAME TO "UserStatus";
DROP TYPE "UserStatus_old";
ALTER TABLE "users" ALTER COLUMN "status" SET DEFAULT 'Active';
COMMIT;

-- AlterTable
ALTER TABLE "_UserDislikes" DROP CONSTRAINT "_UserDislikes_AB_pkey";

-- AlterTable
ALTER TABLE "_UserLikes" DROP CONSTRAINT "_UserLikes_AB_pkey";

-- DropTable
DROP TABLE "Galeri";

-- CreateTable
CREATE TABLE "jabatan" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "jenis_kelamin" "JenisKelamin" NOT NULL,
    "alamat" TEXT,
    "image" TEXT,
    "jabatan" TEXT,
    "tanggalBergabung" TIMESTAMP(3),
    "status" "MemberStatus" NOT NULL DEFAULT 'Anggota',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "jabatan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "jabatan_email_key" ON "jabatan"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_UserDislikes_AB_unique" ON "_UserDislikes"("A", "B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserLikes_AB_unique" ON "_UserLikes"("A", "B");
