import React from "react";
import SemuaKegiatan from "@/components/SemuaKegiatan";

const KegiatanPage = async (searchParams) => {
  const params = await searchParams;

  const page = Math.max(1, parseInt(params?.page) || "1");
  const limit = 8;

  const [kegiatanData, totalCount] = await prisma.$transaction([
    prisma.kegiatan.findMany({
      where: { statusPublish: "Published" },
      orderBy: {
        date: "desc",
      },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        _count: {
          select: {
            likedBy: true,
            comments: true,
          },
        },
      },
    }),
    prisma.kegiatan.count(),
  ]);

  const totalPages = Math.ceil(totalCount / limit);

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

      <SemuaKegiatan
        kegiatanData={kegiatanData}
        pagination={{ totalItems: totalCount, currentPage: page, totalPages }}
      />
    </div>
  );
};

export default KegiatanPage;
