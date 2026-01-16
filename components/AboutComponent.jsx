"use client"; // Pastikan ada ini karena Framer Motion butuh client-side

import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowRight, Leaf, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const AboutComponent = ({ aboutData }) => {
  return (
    <section className="relative overflow-hidden py-24 px-6 lg:px-12 bg-white">
      {/* Background Decorative Circles */}
      <div className="absolute top-0 right-0 -z-10 h-125 w-125 rounded-full bg-emerald-50/50 blur-[120px]" />
      <div className="absolute bottom-0 left-0 -z-10 h-100 w-100 rounded-full bg-blue-50/50 blur-[100px]" />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Kiri */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative flex-1"
          >
            {/* Main Image Container */}
            <div className="relative z-10 w-full max-w-100 aspect-square p-6 ">
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Image
                  alt="Logo GGS"
                  src={aboutData?.logo || "/placeholder-logo.png"}
                  width={300}
                  height={300}
                  className="object-contain w-full h-full rounded-md"
                />
              </motion.div>
            </div>

            {/* dekorasi lingkaran */}
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[radial-gradient(#10b981_2px,transparent_2px)] [bg-size:16px_16px] opacity-20" />
          </motion.div>

          {/* kanan */}
          <div className="flex-1 space-y-8 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-black uppercase tracking-widest"
            >
              <Sparkles size={14} className="animate-pulse" />
              Tentang Gorontalo Green School
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1]"
            >
              Tumbuh Bersama <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-600 via-emerald-500 to-teal-400">
                Generasi Lestari
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-slate-600 text-lg md:text-xl leading-relaxed font-medium"
            >
              {aboutData?.about || "Tentang Gorontalo Green School Belum diisi"}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start pt-4"
            >
              <Button
                asChild
                className="group bg-slate-900 hover:bg-emerald-600 text-white px-10 py-7 rounded-2xl text-base font-bold transition-all duration-300 hover:shadow-[0_20px_40px_-10px_rgba(16,185,129,0.3)]"
              >
                <Link href="/tentang">
                  Lihat Selengkapnya
                  <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutComponent;
