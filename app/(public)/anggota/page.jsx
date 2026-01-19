import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { prisma } from "@/lib/prisma";

export default async function Anggota() {
  const anggotaData = await prisma.jabatan.findMany({
    select: {
      nama: true,
      jabatan: true,
      image: true,
      deskripsi: true,
      email: true,
    },
  });

  const formatedAnggota = anggotaData.map((anggota) => ({
    name: anggota.nama,
    designation: anggota.jabatan,
    src: anggota.image,
    quote: anggota.deskripsi,
    email: anggota.email,
  }));

  return <AnimatedTestimonials testimonials={formatedAnggota} />;
}
