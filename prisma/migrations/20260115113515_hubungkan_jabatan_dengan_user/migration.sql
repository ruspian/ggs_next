/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `jabatan` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "jabatan" ADD COLUMN     "userId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "jabatan_userId_key" ON "jabatan"("userId");

-- AddForeignKey
ALTER TABLE "jabatan" ADD CONSTRAINT "jabatan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
