"use server";

import { prisma } from "./prisma";
import { auth } from "./auth";
import { revalidatePath } from "next/cache";
import { sanitizeHtml } from "./protectDangerouslySetInnerHTML";

// fungsi tambah kegiatan
export const PostKegiatan = async (data) => {
  const session = await auth();

  // tolak jika user bukan admin
  if (!session?.user || session.user.role !== "Admin") {
    return {
      success: false,
      message: "Akses ditolak!",
    };
  }

  try {
    // ambil data dari input user
    const { title, content, date, location, category, image, status } = data;

    // amankan konten html dengan sanitize
    const cleanContent = sanitizeHtml(content);

    // simpan data ke database
    const post = await prisma.kegiatan.create({
      data: {
        title,
        content: cleanContent,
        date: new Date(date),
        lokasi: location,
        kategori: category,
        image,
        author: session.user.role,
        statusPublish: status,
      },
    });

    // hapus cache kegiatan
    revalidatePath("/admin/kegiatan");
    revalidatePath("/kegiatan");

    // kembalikan data
    return { data: post, success: true, message: "Data berhasil disimpan!" };
  } catch (error) {
    console.log("gagal post kegiatan: ", error.message);

    return {
      success: false,
      message: "Kesalahan server, silahkan coba lagi!",
    };
  }
};

// fungsi update kegiatan
export const UpdateKegiatan = async (id, data) => {
  const session = await auth();

  // tolak jika user bukan admin
  if (!session?.user || session.user.role !== "Admin") {
    return {
      success: false,
      message: "Akses ditolak!",
    };
  }

  if (!id) {
    return {
      success: false,
      message: "ID kegiatan diperlukan!",
    };
  }

  try {
    const { title, content, date, location, category, image, status } = data;

    if (!title) {
      return {
        success: false,
        message: "Judul wajib diisi!",
      };
    }

    const cleanContent = sanitizeHtml(content);

    const editedKegiatan = await prisma.kegiatan.update({
      where: { id },
      data: {
        title,
        content: cleanContent,
        date: new Date(date),
        lokasi: location,
        kategori: category,
        image,
        author: session.user.role,
        statusPublish: status,
      },
    });

    // hapus cache kegiatan
    revalidatePath("/admin/kegiatan");
    revalidatePath("/kegiatan");
    revalidatePath(`/kegiatan/${id}`);

    // kembalikan data
    return {
      data: editedKegiatan,
      success: true,
      message: "Data berhasil disimpan!",
    };
  } catch (error) {
    console.log("gagal update kegiatan: ", error);

    return {
      success: false,
      message: "Kesalahan server, silahkan coba lagi!",
    };
  }
};

// fungsi update view
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
