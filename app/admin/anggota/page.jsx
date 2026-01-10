import AnggotaAdminClient from "@/components/AnggotaAdminClient";
import { prisma } from "@/lib/prisma";

export default async function AnggotaAdminPage({ searchParams }) {
  const params = await searchParams;

  // inisialisasi search query
  const searchQuery = params?.search || "";
  const page = Math.max(1, parseInt(params?.page || "1"));
  const limit = 10;

  // membuat where clause untuk pencarian jika ada maka tampilkan berdasarkan pencarian
  // jika tidak ada maka tampilkan semua data
  const whereClause = searchQuery
    ? {
        OR: [
          {
            nama: {
              contains: searchQuery,
              mode: "insensitive",
            },
          },
          {
            email: {
              contains: searchQuery,
              mode: "insensitive",
            },
          },
        ],
      }
    : {};

  const [anggota, totalCount] = await prisma.$transaction([
    prisma.jabatan.findMany({
      where: whereClause,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        nama: "asc",
      },
    }),
    prisma.jabatan.count({
      where: whereClause,
    }),
  ]);

  const formatAnggota = anggota.map((item) => ({
    id: item.id,
    name: item.nama,
    email: item.email,
    address: item.alamat || "Alamat Belum Ditambahkan!",
    role: item.jabatan || "Anggota",
    status: item.status === "Active" ? "Aktif" : "Tidak Aktif",
  }));

  const totalPages = Math.ceil(totalCount / limit);
  return (
    <AnggotaAdminClient
      members={formatAnggota}
      pagination={{ totalItems: totalCount, currentPage: page, totalPages }}
    />
  );
}
