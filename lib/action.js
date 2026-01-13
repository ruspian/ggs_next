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

// fungsi hapus kegiatan
export const DeleteKegiatan = async (id) => {
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
    const deletedKegiatan = await prisma.kegiatan.delete({
      where: { id },
    });

    //  hapus cache kegiatan
    revalidatePath("/admin/kegiatan");
    revalidatePath("/kegiatan");

    return {
      data: deletedKegiatan,
      success: true,
      message: "Kegiatan berhasil dihapus!",
    };
  } catch (error) {
    console.log("Gagal menghapus kegiatan: ", error);

    return {
      success: false,
      message: "Kesalahan server, silahkan coba lagi!",
    };
  }
};

// fungsi post anggota
export const PostAnggota = async (data) => {
  const session = await auth();

  if (!session.user || session.user.role !== "Admin") {
    return {
      success: false,
      message: "Akses ditolak!",
    };
  }

  try {
    const {
      nama,
      email,
      alamat,
      phone,
      jabatan,
      jenisKelamin,
      image,
      tanggalBergabung,
      status,
    } = data;

    if (!nama || !email || !jenisKelamin || !status) {
      return {
        success: false,
        message: "Data tidak lengkap!",
      };
    }

    const newAnggota = await prisma.jabatan.create({
      data: {
        nama,
        email,
        alamat,
        phone,
        jabatan,
        jenisKelamin,
        image,
        tanggalBergabung: new Date(tanggalBergabung),
        status,
      },
    });

    revalidatePath("/admin/anggota");
    revalidatePath("/anggota");

    return {
      data: newAnggota,
      success: true,
      message: "Data anggota berhasil disimpan!",
    };
  } catch (error) {
    console.log("Gagal menambahkan anggota: ", error);

    if (error.code === "P2002") {
      return {
        success: false,
        message: "Email sudah terdaftar!",
      };
    }

    return {
      success: false,
      message: "Kesalahan server, silahkan coba lagi!",
    };
  }
};

// fungsi update anggota
export const UpdateAnggota = async (id, data) => {
  const session = await auth();

  if (!session.user || session.user.role !== "Admin") {
    return {
      success: false,
      message: "Akses ditolak!",
    };
  }

  if (!id) {
    return {
      success: false,
      message: "ID anggota diperlukan!",
    };
  }

  try {
    const {
      nama,
      email,
      alamat,
      phone,
      jabatan,
      jenisKelamin,
      image,
      tanggalBergabung,
      status,
    } = data;

    if (!nama || !email || !jenisKelamin || !status) {
      return {
        success: false,
        message: "Data tidak lengkap!",
      };
    }

    const editedAnggota = await prisma.jabatan.update({
      where: { id },
      data: {
        nama,
        email,
        alamat,
        phone,
        jabatan,
        jenisKelamin,
        image,
        tanggalBergabung: new Date(tanggalBergabung),
        status,
      },
    });

    revalidatePath("/admin/anggota");
    revalidatePath("/anggota");

    return {
      data: editedAnggota,
      success: true,
      message: "Data anggota berhasil diubah!",
    };
  } catch (error) {
    console.log("Gagal mengubah anggota: ", error);

    if (error.code === "P2002") {
      return {
        success: false,
        message: "Email sudah terdaftar!",
      };
    }

    return {
      success: false,
      message: "Kesalahan server, silahkan coba lagi!",
    };
  }
};

// fungsi delete anggota
export const DeleteAnggota = async (id) => {
  const session = await auth();

  if (!session.user || session.user.role !== "Admin") {
    return {
      success: false,
      message: "Akses ditolak!",
    };
  }

  if (!id) {
    return {
      success: false,
      message: "ID anggota diperlukan!",
    };
  }

  try {
    const deletedAnggota = await prisma.jabatan.delete({
      where: { id },
    });

    revalidatePath("/admin/anggota");
    revalidatePath("/anggota");

    return {
      data: deletedAnggota,
      success: true,
      message: "Data anggota berhasil dihapus!",
    };
  } catch (error) {
    console.log("gagal menghapus anggota: ", error);

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
