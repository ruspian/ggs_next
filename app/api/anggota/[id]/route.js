import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export const PATCH = async (request, { params }) => {
  const session = await auth();

  if (!session.user || session.user.role !== "Admin") {
    return NextResponse.json({ message: "Akses ditolak!" }, { status: 401 });
  }

  const body = await request.json();

  const { id } = await params;
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
  } = body;

  if (!id) {
    return NextResponse.json(
      { message: "ID anggota diperlukan!" },
      { status: 400 }
    );
  }

  if (!nama || !email) {
    return NextResponse.json(
      { message: "Data tidak lengkap!" },
      { status: 400 }
    );
  }

  try {
    const updatedAnggota = await prisma.jabatan.update({
      where: { id },
      data: {
        nama,
        email,
        alamat,
        phone,
        jabatan,
        jenisKelamin,
        image,
        tanggalBergabung,
        status,
      },
    });

    return NextResponse.json(
      {
        message: "Anggota berhasil diperbarui!",
        data: { anggota: updatedAnggota },
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("gagal memperbaharui anggota: ", error);
    return NextResponse.json(
      { message: "Kesalahan server, silahkan coba lagi!" },
      { status: 500 }
    );
  }
};
