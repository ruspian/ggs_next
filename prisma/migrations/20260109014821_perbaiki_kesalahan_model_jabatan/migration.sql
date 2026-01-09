/*
  Warnings:

  - The `jabatan` column on the `jabatan` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `jabatan` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "jabatan" DROP COLUMN "jabatan",
ADD COLUMN     "jabatan" "MemberStatus" NOT NULL DEFAULT 'Anggota',
DROP COLUMN "status",
ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'Active';
