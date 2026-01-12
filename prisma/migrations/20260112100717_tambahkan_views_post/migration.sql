-- CreateEnum
CREATE TYPE "StatusPost" AS ENUM ('Published', 'Draft');

-- AlterTable
ALTER TABLE "kegiatan" ADD COLUMN     "statusPublish" "StatusPost" NOT NULL DEFAULT 'Draft';

-- CreateTable
CREATE TABLE "PostView" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "PostView_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PostView_postId_userId_key" ON "PostView"("postId", "userId");

-- AddForeignKey
ALTER TABLE "PostView" ADD CONSTRAINT "PostView_postId_fkey" FOREIGN KEY ("postId") REFERENCES "kegiatan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
