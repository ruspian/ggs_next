import React from "react";
import SemuaKegiatan from "@/components/SemuaKegiatan";

const KegiatanPage = async () => {
  const kegiatanData = await prisma.kegiatan.findMany({
    where: { statusPublish: "Published" },
    orderBy: {
      date: "desc",
    },
    take: 4,
    include: {
      _count: {
        select: {
          likedBy: true,
          comments: true,
        },
      },
    },
  });

  return (
    <div className="min-h-screen">
      <div className="pt-30 px-6 text-center text-emerald-500 ">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 italic">
            Kegiatan
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            Membangun harmoni antara manusia dan alam Gorontalo melalui edukasi
            berkelanjutan dan aksi konservasi nyata.
          </p>
        </div>
      </div>

      <SemuaKegiatan kegiatanData={kegiatanData} />
    </div>
  );
};

export default KegiatanPage;
