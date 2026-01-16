import React, { Fragment } from "react";
import { AnimatedTooltip } from "./ui/animated-tooltip";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";

const AnggotaComponent = async () => {
  const anggotaData = await prisma.jabatan.findMany({
    select: {
      id: true,
      nama: true,
      jabatan: true,
      image: true,
    },
    take: 6,
  });

  return (
    <>
      <div className="flex flex-col items-center justify-center mb-10 px-4 ">
        <h2 className="text-3xl font-bold text-emerald-600 mb-4">
          Anggota <span className="text-gray-800 text-center">Kami</span>
        </h2>
        <p className="text-gray-600 text-center max-w-2xl">
          Tim kami terdiri dari individu-individu berdedikasi yang bersemangat
          tentang pendidikan berkelanjutan dan pelestarian lingkungan. Kenali
          lebih dekat dengan anggota-anggota kami yang berkontribusi dalam
          mewujudkan visi dan misi Gorontalo Green School.
        </p>
      </div>

      <div className="flex flex-row items-center justify-center mb-10 w-full">
        <AnimatedTooltip items={anggotaData} />
      </div>

      <div className="flex flex-col items-center justify-center mb-10 px-4">
        <Link
          href="/anggota"
          className="text-sm text-emerald-600 font-semibold hover:underline"
        >
          {" "}
          Lihat Semua Anggota
          <ArrowRight className="inline-block ml-2 h-4 w-4" />
        </Link>
      </div>
    </>
  );
};

export default AnggotaComponent;
