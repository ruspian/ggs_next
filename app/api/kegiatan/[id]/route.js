import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { sanitizeHtml } from "@/lib/protectDangerouslySetInnerHTML";

export const PATCH = async (req, { params }) => {
  const session = await auth();
  if (!session.user || session.user.role !== "Admin") {
    return NextResponse.json({ message: "Akses ditolak!" }, { status: 401 });
  }

  const { id } = await params;

  if (!id) {
    return NextResponse.json(
      { message: "ID kegiatan diperlukan!" },
      { status: 400 }
    );
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

    const cleanContent = sanitizeHtml(content);

    const updatedKegiatan = await prisma.kegiatan.update({
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

    return NextResponse.json(
      { message: "Kegiatan berhasil diupdate!", data: updatedKegiatan },
      { status: 200 }
    );
  } catch (error) {
    console.log("gagal mengupdate kegiatan: ", error || error.message);

    return NextResponse.json(
      { message: "Kesalahan server, silahkan coba lagi!" },
      { status: 500 }
    );
  }
};

export const DELETE = async (req, { params }) => {
  const session = await auth();
  if (!session.user || session.user.role !== "Admin") {
    return NextResponse.json({ message: "Akses ditolak!" }, { status: 401 });
  }

  const { id } = await params;

  if (!id) {
    return NextResponse.json(
      { message: "ID kegiatan diperlukan!" },
      { status: 400 }
    );
  }

  try {
    const deletedKegiatan = await prisma.kegiatan.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Kegiatan berhasil dihapus!", data: deletedKegiatan },
      { status: 200 }
    );
  } catch (error) {
    console.log("gagal menghapus kegiatan: ", error || error.message);

    return NextResponse.json(
      { message: "Kesalahan server, silahkan coba lagi!" },
      { status: 500 }
    );
  }
};
