import KegiatanAdminClient from "@/components/KegiatanAdminClient";

export default function BeritaKegiatanAdmin() {
  const posts = [
    {
      id: 1,
      title: "Sukses! GGS Tanam 1000 Mangrove di Pesisir Torosiaje",
      date: "02 Jan 2026",
      author: "Admin",
      views: "1.2k",
      status: "Published",
      category: "Konservasi",
    },
    {
      id: 2,
      title: "Edukasi Limbah Plastik di SMP Negeri 1 Limboto",
      date: "28 Des 2025",
      author: "Relawan A",
      views: "850",
      status: "Published",
      category: "Edukasi",
    },
    {
      id: 3,
      title: "Rencana Aksi Bersih Pantai Pohuwato (Draft)",
      date: "04 Jan 2026",
      author: "Admin",
      views: "0",
      status: "Draft",
      category: "Aksi",
    },
  ];

  return <KegiatanAdminClient posts={posts} />;
}
