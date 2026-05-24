"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import AuthDialog from "@/components/ui/auth-dialog";

import foto1 from "@/public/1.jpeg";
import foto2 from "@/public/2.jpeg";
import foto3 from "@/public/3.jpeg";
import foto6 from "@/public/6.jpeg";

const HeroSection = () => {
  return (
    <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-12 md:gap-8 px-4 sm:px-6">
      <div className="w-full md:w-1/2 text-center md:text-left space-y-4 md:space-y-6 z-10 mt-10 md:mt-0">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-emerald-800 leading-tight"
        >
          GORONTALO GREEN SCHOOL
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base sm:text-lg lg:text-xl text-gray-800"
        >
          Pusat aksi dan dokumentasi lingkungan GGS. Mari berkontribusi dan
          jadilah bagian dari perubahan untuk alam kita.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap items-center gap-4 justify-center md:justify-start pt-2"
        >
          <div className="w-full sm:w-auto">
            <AuthDialog
              tampilan="w-full sm:w-[200px] h-12 text-white bg-emerald-600 hover:bg-emerald-700 text-lg font-semibold rounded-md transition-colors duration-300"
              text="Gabung Sekarang!"
            />
          </div>
        </motion.div>
      </div>

      <div className="w-full md:w-1/2 relative h-87.5 sm:h-112.5 md:h-125 lg:h-150 flex justify-center items-center">
        <motion.div
          className="w-[50%] sm:w-[30%] lg:w-[55%] bg-white shadow-2xl rounded-md p-2 absolute top-10 left-2 sm:left-4 z-20 lg:top-28"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Image
            src={foto1}
            alt="Foto Utama"
            className="rounded-sm w-full h-auto object-cover"
            placeholder="blur"
          />
        </motion.div>

        <motion.div
          className="w-[40%] sm:w-[35%] lg:w-[40%] bg-white shadow-xl rounded-md p-2 absolute top-8 right-0 sm:right-0 md:-right-4 z-10 lg:top-32"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Image
            src={foto3}
            alt="Foto Kecil 1"
            className="rounded-sm w-full h-auto object-cover"
          />
        </motion.div>

        <motion.div
          className="w-[40%] sm:w-[35%] lg:w-[40%] bg-white shadow-2xl rounded-md p-2 absolute bottom-20 left-2 sm:left-12 lg:left-0 z-30 lg:bottom-30"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <Image
            src={foto6}
            alt="Foto Kecil 2"
            className="rounded-sm w-full h-auto object-cover"
          />
        </motion.div>

        <motion.div
          className="w-[50%] sm:w-[40%] lg:w-[60%] bg-white rounded-md shadow-lg p-2 absolute bottom-20 right-0 sm:right-4 md:-right-8 z-0 lg:bottom-20"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9 }}
        >
          <Image
            src={foto2}
            alt="Foto Landscape"
            className="object-cover rounded-sm w-full h-auto"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
