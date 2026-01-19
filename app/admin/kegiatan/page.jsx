export const dynamic = "force-dynamic";

import KegiatanAdminClient from "@/components/KegiatanAdminClient";
import { formatDateToDisplayID } from "@/lib/formatTanggal";
import { prisma } from "@/lib/prisma";

export default async function BeritaKegiatanAdmin({ searchParams }) {
  const params = await searchParams;

  const search = params?.search || "";
  const page = Math.max(1, parseInt(params.page || "1"));
  const limit = 10;

  const whereClause = search
    ? {
        OR: [
          {
            title: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      }
    : {};

  const [kegiatan, totalCount, totalViews, totalPublished, totalDraft] =
    await prisma.$transaction([
      prisma.kegiatan.findMany({
        where: whereClause,
        orderBy: {
          date: "desc",
        },
        take: limit,
        skip: (page - 1) * limit,
      }),
      prisma.kegiatan.count({
        where: whereClause,
      }),
      prisma.kegiatan.aggregate({
        _sum: {
          views: true,
        },
      }),
      prisma.kegiatan.count({
        where: {
          statusPublish: "Published",
        },
      }),
      prisma.kegiatan.count({
        where: {
          statusPublish: "Draft",
        },
      }),
    ]);

  const totalPages = Math.ceil(totalCount / limit);

  const formatKegiatan = kegiatan.map((keg) => ({
    id: keg.id,
    title: keg.title,
    date: formatDateToDisplayID(keg.date),
    author: keg.author || "Admin",
    views: keg.views || 0,
    status: keg.statusPublish || "Draft",
    category: keg.kategori,
  }));

  return (
    <KegiatanAdminClient
      posts={formatKegiatan}
      pagination={{ totalItems: totalCount, currentPage: page, totalPages }}
      totalViews={totalViews._sum.views || 0}
      totalPublished={totalPublished}
      totalDraft={totalDraft}
    />
  );
}
