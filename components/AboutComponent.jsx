"use client";

import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const AboutComponent = ({ aboutData }) => {
  return (
    <section className="relative overflow-hidden py-16 md:py-24 bg-white rounded-2xl md:rounded-3xl">
      <div className="absolute top-0 right-0 -z-10 h-75 w-75 md:h-125 md:w-125 rounded-full bg-emerald-50/50 blur-[80px] md:blur-[120px]" />
      <div className="absolute bottom-0 left-0 -z-10 h-62.5 w-62.5 md:h-100 md:w-100 rounded-full bg-blue-50/50 blur-[80px] md:blur-[100px]" />

      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 md:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full lg:w-1/2 flex justify-center"
          >
            <div className="relative z-10 w-full max-w-62.5 sm:max-w-75 md:max-w-100 aspect-square p-4 md:p-6">
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-full h-full"
              >
                <Image
                  alt="Logo GGS"
                  src={aboutData?.logo || "/placeholder-logo.png"}
                  width={400}
                  height={400}
                  className="object-contain w-full h-full drop-shadow-xl"
                />
              </motion.div>
            </div>

            <div className="absolute bottom-0 -left-4 md:-bottom-10 md:-left-10 w-24 h-24 md:w-32 md:h-32 bg-[radial-gradient(#10b981_2px,transparent_2px)] bg-size-[16px_16px] opacity-20 -z-10" />
          </motion.div>

          <div className="w-full lg:w-1/2 space-y-6 md:space-y-8 text-center lg:text-left z-10 px-4 md:px-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 md:px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-[10px] md:text-xs font-black uppercase tracking-widest"
            >
              <Sparkles size={14} className="animate-pulse" />
              Tentang Gorontalo Green School
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-black text-slate-900 leading-[1.2] md:leading-[1.1]"
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
              className="text-slate-600 text-sm sm:text-base md:text-lg xl:text-xl leading-relaxed font-medium line-clamp-4 sm:line-clamp-none"
            >
              {aboutData?.about || "Tentang Gorontalo Green School Belum diisi"}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-2 md:pt-4"
            >
              <Button
                asChild
                className="group w-full sm:w-auto bg-slate-900 hover:bg-emerald-600 text-white px-6 md:px-8 py-6 rounded-xl md:rounded-2xl text-sm md:text-base font-bold transition-all duration-300 hover:shadow-[0_20px_40px_-10px_rgba(16,185,129,0.3)]"
              >
                <Link
                  href="/tentang"
                  className="flex items-center justify-center"
                >
                  Lihat Selengkapnya
                  <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-2 transition-transform" />
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
