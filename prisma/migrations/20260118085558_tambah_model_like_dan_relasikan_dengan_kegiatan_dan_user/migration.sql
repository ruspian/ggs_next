/*
  Warnings:

  - You are about to drop the `_UserDislikes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UserLikes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_UserDislikes" DROP CONSTRAINT "_UserDislikes_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserDislikes" DROP CONSTRAINT "_UserDislikes_B_fkey";

-- DropForeignKey
ALTER TABLE "_UserLikes" DROP CONSTRAINT "_UserLikes_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserLikes" DROP CONSTRAINT "_UserLikes_B_fkey";

-- DropTable
DROP TABLE "_UserDislikes";

-- DropTable
DROP TABLE "_UserLikes";

-- CreateTable
CREATE TABLE "Like" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "kegiatanId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Like_userId_kegiatanId_key" ON "Like"("userId", "kegiatanId");

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_kegiatanId_fkey" FOREIGN KEY ("kegiatanId") REFERENCES "kegiatan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
