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
    <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
      {/* kiri */}
      <div className="md:w-1/2 text-center md:text-left space-y-4 z-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl md:text-7xl font-black text-emerald-800 leading-tight"
        >
          GORONTALO GREEN SCHOOL
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-2xl text-gray-800"
        >
          Tumbuh Bersama Generasi Lestari
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap items-center gap-4 justify-center md:justify-start"
        >
          {/* Tombol Gabung  */}
          <AuthDialog
            tampilan="w-full md:w-50 h-10 mt-5 text-white bg-emerald-600 hover:bg-emerald-700  text-lg font-semibold hover:text-white cursor-pointer"
            text="Gabung Sekarang!"
          />
        </motion.div>
      </div>

      {/* kanan  */}
      <div className="md:w-1/2 relative w-full h-100 flex justify-center items-center mt-10 md:mt-0">
        {/* ui card poto */}
        <motion.div
          className="w-75 md:w-85  bg-white shadow-2xl rounded-sm p-3 absolute top-10 md:top-5 left-10 z-20"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Image
            src={foto1}
            alt="Foto Utama"
            className="rounded-sm w-full h-auto object-cover"
            placeholder="blur" // Efek blur pas loading
          />
        </motion.div>

        <motion.div
          className="w-45 h-42 bg-white shadow-2xl rounded-sm p-2 absolute bottom-0 right-0 md:top-5 md:-right-4 z-10"
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
          className="w-45 bg-white shadow-2xl rounded-sm p-2 absolute -bottom-8 left-28 md:bottom-5 md:left-5 z-30"
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
          className="bg-white rounded-sm shadow-lg p-2 w-50 md:w-85 h-52 absolute -bottom-10 md:right-0 z-0"
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
