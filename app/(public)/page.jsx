// import PatnershipComponent from "@/components/PatnershipComponent";
import AboutComponent from "@/components/AboutComponent";
import KegiatanComponent from "@/components/KegiatanComponent";
import BackgroundMotionComponent from "@/components/BackgroundMotionComponent";
import HeroSection from "@/components/HeroSection";
import PatnershipComponent from "@/components/PatnershipComponent";
import AnggotaComponent from "@/components/AnggotaComponent";
import ContactComponent from "@/components/ContactComponent";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function HomePage() {
  const aboutData = await prisma.about.findFirst();
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
    <main className="relative overflow-hidden w-full">
      <BackgroundMotionComponent />
      <section className="w-full relative min-h-screen px-6 md:px-20 py-24 flex flex-col md:flex-row items-center justify-between overflow-hidden">
        <HeroSection />
      </section>

      <section>
        <PatnershipComponent />
      </section>

      <section className="py-16">
        <AboutComponent aboutData={aboutData} />
      </section>

      <div className="border-t md:mx-20 my-2" />

      <section className="py-16">
        <div className="flex flex-col items-center justify-center mb-10 px-4">
          <h2 className="text-3xl font-bold text-emerald-600 mb-4">
            Kegiatan <span className="text-gray-800">Kami</span>
          </h2>
          <p className="text-gray-600 text-center max-w-2xl">
            Berikut adalah beberapa kegiatan yang telah kami lakukan untuk
            mendukung misi dan visi kami dalam menciptakan dampak positif bagi
            masyarakat dan lingkungan sekitar.
          </p>
        </div>

        <KegiatanComponent kegiatanData={kegiatanData} />

        <div className="flex flex-col items-center justify-center mt-10 px-4">
          <Link
            href="/kegiatan"
            className="text-sm text-emerald-600 font-semibold hover:underline"
          >
            {" "}
            Lihat Semua Kegiatan
            <ArrowRight className="inline-block ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="py-6">
        <AnggotaComponent />
      </section>

      <section className="py-6">
        <ContactComponent />
      </section>
    </main>
  );
}
