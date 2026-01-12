import KegiatanAdminClient from "@/components/KegiatanAdminClient";
import { formatDateToDisplayID } from "@/lib/formatTanggal";
import { prisma } from "@/lib/prisma";

export default async function BeritaKegiatanAdmin() {
  const kegiatan = await prisma.kegiatan.findMany();

  const formatKegiatan = kegiatan.map((keg) => ({
    id: keg.id,
    title: keg.title,
    date: formatDateToDisplayID(keg.date),
    author: keg.author,
    views: keg.views,
    status: keg.status || "Draft",
    category: keg.kategori,
  }));

  return <KegiatanAdminClient posts={formatKegiatan} />;
}
