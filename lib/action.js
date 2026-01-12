"use server";

import { prisma } from "./prisma";

export const UpdateViews = async (postId, userId) => {
  // abaikan jika user tidak login
  if (!userId) return;

  try {
    // tambahkan log  view baru
    await prisma.postView.create({
      data: {
        postId,
        userId,
      },
    });

    //  jika berhasil tambahkan view di model kegiatan
    await prisma.kegiatan.update({
      where: { id: postId },
      data: {
        views: { increment: 1 },
      },
    });
  } catch (error) {
    if (error.code === P2002) {
      console.log("User sudah melihat kegiatan ini");
    }
  }
};
