// import PatnershipComponent from "@/components/PatnershipComponent";
import AboutComponent from "@/components/AboutComponent";
// import KegiatanComponent from "@/components/KegiatanComponent";
import BackgroundMotionComponent from "@/components/BackgroundMotionComponent";
import HeroSection from "@/components/HeroSection";
import PatnershipComponent from "@/components/PatnershipComponent";
// import GaleryComponent from "@/components/GaleryComponent";
// import AnggotaComponent from "@/components/AnggotaComponent";
// import ContactComponent from "@/components/ContactComponent";

export default function HomePage() {
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
        <AboutComponent />
      </section>

      <div className="border-t md:mx-20 my-2" />

      {/* <section className="py-16">
        <KegiatanComponent />
      </section> */}

      {/* <section className="py-16 bg-slate-50">
        <GaleryComponent />
      </section> */}

      {/* <section className="py-16">
        <AnggotaComponent />
      </section> */}

      {/* <section className="py-16">
        <ContactComponent />
      </section>  */}
    </main>
  );
}
