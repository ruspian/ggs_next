export const dynamic = "force-dynamic";

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
          likes: true,
          comments: true,
        },
      },
    },
  });

  return (
    <main className="relative overflow-hidden w-full">
      <BackgroundMotionComponent />

      <section className="w-full relative min-h-dvh md:min-h-screen px-4 sm:px-8 md:px-16 lg:px-24 py-20 md:py-24 flex flex-col lg:flex-row items-center justify-between overflow-hidden">
        <HeroSection />
      </section>

      <section className="w-full px-4 sm:px-8 md:px-16 lg:px-24 py-8 md:py-12">
        <PatnershipComponent />
      </section>

      <section className="w-full px-4 sm:px-8 md:px-16 lg:px-24 py-12 md:py-16">
        <AboutComponent aboutData={aboutData} />
      </section>

      <div className="border-t mx-4 sm:mx-8 md:mx-16 lg:mx-24 my-6 md:my-8" />

      <section className="w-full px-4 sm:px-8 md:px-16 lg:px-24 py-12 md:py-16">
        <div className="flex flex-col items-center justify-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-emerald-600 mb-3 md:mb-4 text-center">
            Kegiatan <span className="text-gray-800">Kami</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-600 text-center max-w-2xl px-2">
            Berikut adalah beberapa kegiatan yang telah kami lakukan untuk
            mendukung misi dan visi kami dalam menciptakan dampak positif bagi
            masyarakat dan lingkungan sekitar.
          </p>
        </div>

        <KegiatanComponent kegiatanData={kegiatanData} />

        <div className="flex flex-col items-center justify-center mt-8 md:mt-12">
          <Link
            href="/kegiatan"
            className="text-sm md:text-base text-emerald-600 font-semibold hover:underline flex items-center group"
          >
            Lihat Semua Kegiatan
            <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      <section className="w-full px-4 sm:px-8 md:px-16 lg:px-24 py-8 md:py-12">
        <AnggotaComponent />
      </section>

      <section className="w-full px-4 sm:px-8 md:px-16 lg:px-24 py-8 md:py-12 mb-10">
        <ContactComponent />
      </section>
    </main>
  );
}
