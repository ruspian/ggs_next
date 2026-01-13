import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcryptjs from "bcryptjs";

export const POST = async (req) => {
  try {
    const body = await req.json();

    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Semua field harus diisi" },
        { status: 400 }
      );
    }

    //     cek email duplikat
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    //     jika ada, tolak pendaftaran
    if (existingUser) {
      return NextResponse.json(
        { message: "Email sudah terdaftar, gunakan email lain!" },
        { status: 409 } // 409 = Conflict
      );
    }

    //     hash password
    const hashedPassword = await bcryptjs.hash(password, 10);

    //     default avatar
    const defaultAvatar = `https://api.dicebear.com/8.x/initials/svg?seed=${name}`;

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        image: defaultAvatar,
      },
    });

    return NextResponse.json(
      { message: "Pendaftaran Akun Berhasil!" },
      { status: 200 }
    );
  } catch (error) {
    console.log("gagal membuat user baru: ", error);

    return NextResponse.json(
      {
        message: "Kesalahan Pada Server!",
      },
      { status: 500 }
    );
  }
};
