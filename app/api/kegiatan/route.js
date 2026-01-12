import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export const POST = async (req) => {
  const session = await auth();
  if (!session.user || session.user.role !== "Admin") {
    return NextResponse.json({ message: "Akses ditolak!" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, content, date, location, category, image, status } = body;

    if (!title) {
      return NextResponse.json(
        { message: "Judul wajib diisi!" },
        { status: 400 }
      );
    }

    const newKegiatan = await prisma.kegiatan.create({
      data: {
        title,
        content,
        date: new Date(date),
        lokasi: location,
        kategori: category,
        image,
        author: session.user.role,
        statusPublish: status,
      },
    });

    return NextResponse.json(
      {
        message: "Kegiatan berhasil ditambahkan!",
        data: newKegiatan,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("gagal membuat kegiatan: ", error || error.message);

    return NextResponse.json(
      { message: "Kesalahan Server, Silahkan Coba Lagi!" },
      { status: 500 }
    );
  }
};
