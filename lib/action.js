"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { sanitizeHtml } from "./protectDangerouslySetInnerHTML";
import bcryptjs from "bcryptjs";

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

    const lowerEmail = email.toLowerCase();

    // Gunakan transaction agar data User dan Jabatan sinkron
    const result = await prisma.$transaction(async (tx) => {
      // Cek apakah user dengan email ini sudah ada di tabel User
      const existingUser = await tx.user.findUnique({
        where: { email: lowerEmail },
      });

      // Buat data Anggota (Jabatan)
      const newAnggota = await tx.jabatan.create({
        data: {
          nama,
          email: lowerEmail,
          alamat,
          phone,
          jabatan,
          jenisKelamin,
          image,
          tanggalBergabung: tanggalBergabung
            ? new Date(tanggalBergabung)
            : new Date(),
          status,
          userId: existingUser ? existingUser.id : null,
        },
      });

      // Jika user sudah ada, update statusUser-nya agar sinkron dengan jabatan baru
      if (existingUser) {
        await tx.user.update({
          where: { id: existingUser.id },
          data: { statusUser: jabatan },
        });
      }

      return newAnggota;
    });

    revalidatePath("/admin/anggota");
    revalidatePath("/anggota");

    return {
      data: result,
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

    const lowerEmail = email.toLowerCase();

    // Gunakan transaction agar jika update User gagal, update Jabatan juga batal
    const result = await prisma.$transaction(async (tx) => {
      // Update data di tabel Jabatan
      const updatedAnggota = await tx.jabatan.update({
        where: { id },
        data: {
          nama,
          email: lowerEmail,
          alamat,
          phone,
          jabatan,
          jenisKelamin,
          image,
          tanggalBergabung: tanggalBergabung
            ? new Date(tanggalBergabung)
            : new Date(),
          status,
        },
      });

      // Apakah anggota ini terhubung ke akun User
      if (updatedAnggota.userId) {
        await tx.user.update({
          where: { id: updatedAnggota.userId },
          data: {
            statusUser: jabatan,
          },
        });
      }

      return updatedAnggota;
    });

    revalidatePath("/admin/anggota");
    revalidatePath("/anggota");

    return {
      data: result,
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

// fungsi update dan insert profil organisasi
export const UpsertProfilOrganisasi = async (data) => {
  const session = await auth();

  if (!session.user || session.user.role !== "Admin") {
    return {
      success: false,
      message: "Akses ditolak!",
    };
  }

  try {
    const {
      id,
      name,
      logo,
      visi,
      misi,
      about,
      tanggal,
      alamat,
      email,
      telephone,
    } = data;

    if (!name || !visi || !misi || !about) {
      return {
        success: false,
        message: "Data tidak lengkap!",
      };
    }

    const targetID = id || "fixed-org-id";

    const profilOrganisasi = await prisma.about.upsert({
      where: { id: targetID },
      update: {
        name,
        logo,
        visi,
        misi,
        about,
        tanggal: tanggal ? new Date(tanggal) : null,
        alamat,
        email,
        telephone,
      },
      create: {
        name,
        logo,
        visi,
        misi,
        about,
        tanggal: new Date(tanggal),
        alamat,
        email,
        telephone,
      },
    });

    revalidatePath("/admin/settings");

    return {
      data: profilOrganisasi,
      success: true,
      message: "Data profil organisasi berhasil disimpan!",
    };
  } catch (error) {
    console.log("gagal menambahkan profil organisasi: ", error);

    return {
      success: false,
      message: "Kesalahan server, silahkan coba lagi!",
    };
  }
};

// fungsi update pengelola
export const UpdatePengelola = async (data) => {
  const session = await auth();

  if (!session.user || session.user.role !== "Admin") {
    return {
      success: false,
      message: "Akses ditolak!",
    };
  }

  const { id, role } = data;

  // tolak jika id pengelola kosong
  if (!id) {
    return {
      success: false,
      message: "ID pengelola diperlukan!",
    };
  }

  // tolak jika user mengubah role dirinya
  if (id === session.user.id) {
    return {
      success: false,
      message: "Anda tidak dapat mengubah Role Anda sendiri demi keamanan.",
    };
  }
  try {
    const updatedPengelola = await prisma.user.update({
      where: { id },
      data: {
        role,
      },
    });

    revalidatePath("/admin/settings");

    return {
      data: updatedPengelola,
      success: true,
      message: "Data pengelola berhasil diubah!",
    };
  } catch (error) {
    console.log("gagal ubah role :", error);

    return {
      success: false,
      message: "Kesalahan server, silahkan coba lagi!",
    };
  }
};

// fungsi ubah sandi
export const EditPassword = async (data) => {
  const session = await auth();

  // tolak jika user belum login
  if (!session?.user) {
    return { success: false, message: "Anda harus login!" };
  }

  const { id, currentPassword, newPassword } = data;

  try {
    //  Ambil data User dari DB
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user || !user.password) {
      return { success: false, message: "User tidak ditemukan!" };
    }

    // Verifikasi Password Saat Ini
    const isPasswordCorrect = await bcryptjs.compare(
      currentPassword,
      user.password,
    );

    if (!isPasswordCorrect) {
      return { success: false, message: "Password saat ini salah!" };
    }

    // Hash Password Baru
    const hashedNewPassword = await bcryptjs.hash(newPassword, 10);

    //  Update di Database
    await prisma.user.update({
      where: { id: session.user.id },
      data: { password: hashedNewPassword },
    });

    return { success: true, message: "Password berhasil diperbarui!" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Terjadi kesalahan server." };
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
    if (error.code === "P2002") {
      console.log("User sudah melihat kegiatan ini");
    }
  }
};

// fungsu buat komentar
export const PostKomentar = async (formData) => {
  const session = await auth();

  //  Harus login untuk komen
  if (!session?.user) {
    return { success: false, message: "Silakan login terlebih dahulu!" };
  }

  const content = formData.get("content");
  const kegiatanId = formData.get("kegiatanId");

  if (!content || content.trim() === "") {
    return { success: false, message: "Komentar tidak boleh kosong!" };
  }

  try {
    await prisma.comment.create({
      data: {
        comment: content,
        kegiatanId,
        userId: session.user.id,
        date: new Date(),
      },
    });

    // Refresh data halaman detail kegiatan
    revalidatePath(`/kegiatan/${kegiatanId}`);

    return { success: true, message: "Komentar berhasil dikirim!" };
  } catch (error) {
    console.error("Gagal kirim komentar:", error);
    return { success: false, message: "Terjadi kesalahan server." };
  }
};

// fungsi like
export const PostLikeKegiatan = async (kegiatanId) => {
  const session = await auth();

  if (!session?.user) {
    return { success: false, message: "Silakan login terlebih dahulu!" };
  }

  try {
    // cek apakah user sudah like kegiatan ini
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_kegiatanId: {
          userId: session.user.id,
          kegiatanId: kegiatanId,
        },
      },
    });

    // dislike / hapus like jika user sudah like
    if (existingLike) {
      await prisma.like.delete({
        where: {
          userId_kegiatanId: {
            userId: session.user.id,
            kegiatanId: kegiatanId,
          },
        },
      });

      revalidatePath(`/kegiatan/${kegiatanId}`);
      return {
        success: true,
        message: "Like berhasil dihapus!",
        isLiked: false,
      };
    }

    // tambahkan like
    const kegiatan = await prisma.like.create({
      data: {
        kegiatanId,
        userId: session.user.id,
      },
    });

    revalidatePath(`/kegiatan/${kegiatanId}`);
    return {
      data: kegiatan,
      success: true,
      message: "Like berhasil dikirim!",
    };
  } catch (error) {
    console.log("gagal like kegiatan:", error);

    return {
      message: "Kesalahan server, silahkan coba lagi!",
      success: false,
    };
  }
};
