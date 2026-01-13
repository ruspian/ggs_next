"use client";

import React from "react";
import fullContactImage from "@/public/fullContactImage.png";
import { motion } from "framer-motion"; // Import motion

import bubleKotak from "@/public/bubleKotak.png";
import Image from "next/image";
import { Instagram, MailIcon, MapIcon, PhoneCall } from "lucide-react";

const ContactComponent = () => {
  // Define animation variants for a staggered effect
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Delay between child animations
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const textBlockVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className="h-auto relative overflow-hidden py-12"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible" // Animasi berjalan saat elemen terlihat
      viewport={{ once: false, amount: 0.3 }} // Animasi hanya berjalan sekali saat 30% elemen terlihat
    >
      {/* awal animasi bg */}
      <motion.img
        src={bubleKotak}
        alt="Animasi2"
        className="absolute top-10 left-0 w-48 h-48 md:w-64 md:h-64 z-0 opacity-20 mix-blend-multiply blur-lg"
        animate={{ x: [0, 20, 0], y: [0, -20, 0], rotate: [0, 360, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.img
        src={bubleKotak}
        alt="Animasi"
        className="absolute bottom-0 right-0 w-48 h-48 md:w-64 md:h-64 z-0 opacity-20 mix-blend-multiply blur-lg"
        animate={{ x: [0, -20, 0], y: [0, 20, 0], rotate: [0, -360, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <motion.div className="container mx-auto px-6 md:px-20  py-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center md:items-start  md:justify-beetwen justify-center gap-8">
          {/* Gambar Kontak */}
          <motion.div
            className="w-full md:w-1/2 flex flex-col justify-center relative overflow-hidden "
            variants={imageVariants}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-emerald-600 mb-4">
              Hubungi Kami
            </h1>
            <p className="text-md w-120 text-gray-600">
              Kami siap membantu Anda! Jika Anda memiliki pertanyaan, saran,
              atau masukan, silakan hubungi kami melalui kontak tertera. Terima
              kasih atas dukungan Anda!
            </p>
          </motion.div>

          {/* Informasi Kontak */}
          <motion.div
            className="flex flex-col w-full md:w-1/2 text-left space-y-4"
            variants={textBlockVariants}
          >
            {/* Alamat Kantor */}
            <motion.div
              className="flex flex-row md:items-start gap-4 p-4 border rounded-md shadow-md"
              variants={itemVariants}
            >
              <MapIcon className="text-2xl text-emerald-600 shrink-0" />
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  Alamat Kantor
                </h2>
                <p className="text-gray-600 text-base">
                  Jln. KH. Abdul Ghofir Nawawi Desa
                </p>
                <p className="text-gray-600 text-base">
                  Banuroja, Randangan, Pohuwato, Gorontalo, Indonesia
                </p>
              </div>
            </motion.div>

            {/* Imstagram */}
            <motion.div
              className="flex flex-row items-start gap-4 p-4 border rounded-md shadow-md"
              variants={itemVariants}
            >
              <Instagram className="text-2xl text-emerald-600 shrink-0" />
              <div>
                <h2 className="text-xl font-bold text-gray-800">Instagram</h2>
                <p className="text-gray-600 text-base">
                  @gorontalo_green_school
                </p>
              </div>
            </motion.div>

            {/* Telepon */}
            <motion.div
              className="flex flex-row items-start gap-4 p-4 border rounded-md shadow-md"
              variants={itemVariants}
            >
              <PhoneCall className="text-2xl text-emerald-600 shrink-0" />
              <div>
                <h2 className="text-xl font-bold text-gray-800">Telepon</h2>
                <p className="text-gray-600 text-base">+62 811-4341124</p>
              </div>
            </motion.div>

            {/* Email */}
            <motion.div
              className="flex flex-row items-start gap-4 p-4 border rounded-md shadow-md"
              variants={itemVariants}
            >
              <MailIcon className="text-2xl text-emerald-600 shrink-0" />
              <div>
                <h2 className="text-xl font-bold text-gray-800">Email</h2>
                <p className="text-gray-600 text-base">ggs.gogreen@gmail.com</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ContactComponent;
