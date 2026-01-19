import React from "react";
import { Target, TreePine } from "lucide-react";

const AboutPage = async () => {
  const aboutData = await prisma.about.findFirst();

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="pt-30 px-6 text-center text-emerald-500 ">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 italic">
            Tentang Gorontalo Green School
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            Membangun harmoni antara manusia dan alam Gorontalo melalui edukasi
            berkelanjutan dan aksi konservasi nyata.
          </p>
        </div>
      </section>

      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Visi */}
          <div className="bg-white p-10 rounded-3xl shadow-sm border border-green-100 relative overflow-hidden">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-green-100 rounded-xl text-green-700">
                <Target size={28} />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Visi Kami</h2>
            </div>
            <p className="text-lg text-slate-600 leading-relaxed italic">
              &quot;{aboutData?.visi}.&quot;
            </p>
          </div>

          {/* Misi */}
          <div className="bg-green-900 p-10 rounded-3xl shadow-xl text-white">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-green-700 rounded-xl text-green-200">
                <TreePine size={28} />
              </div>
              <h2 className="text-2xl font-bold">Misi Kami</h2>
            </div>
            <ul className="space-y-4">
              {aboutData?.misi.map((misi, index) => (
                <li
                  key={index}
                  className="flex gap-3 items-start text-green-100"
                >
                  <span className="h-6 w-6 bg-green-700 rounded-full flex items-center justify-center text-xs shrink-0">
                    {index + 1}
                  </span>
                  {misi}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
