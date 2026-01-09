import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export const POST = async (request) => {
  const session = await auth();

  if (!session.user || session.user.role !== "Admin") {
    return NextResponse.json({ message: "Akses ditolak!" }, { status: 401 });
  }

  try {
    const data = await request.json();
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
      return NextResponse.json(
        { message: "Data tidak lengkap!" },
        { status: 400 }
      );
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

    return NextResponse.json(
      {
        message: "Anggota berhasil ditambahkan!",
        data: { anggota: newAnggota },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error menambahkan anggota:", error);

    if (error.code === "P2002") {
      return NextResponse.json(
        { message: "Email sudah terdaftar!" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: "Terjadi kesalahan server." },
      { status: 500 }
    );
  }
};
