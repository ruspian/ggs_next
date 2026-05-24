"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const PatnershipComponent = () => {
  return (
    <div className="w-full relative flex items-center justify-center z-20 px-4 md:px-0">
      <div className="bg-white w-full md:w-[85%] lg:max-w-5xl p-6 md:p-8 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 -mt-6 md:-mt-12">
        <p className="text-lg md:text-xl font-bold text-center text-emerald-700 uppercase tracking-widest">
          Partnership
        </p>

        <div className="w-20 md:w-24 h-1 bg-emerald-600 mx-auto mt-3 rounded-full" />

        <motion.div
          className="flex flex-nowrap items-center justify-start md:justify-center gap-6 sm:gap-10 md:gap-16 lg:gap-20 mt-8 overflow-x-auto scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src="/madrasah.png"
            alt="logo madrasah salafiyah syafiiyah"
            className="w-12 sm:w-14 md:w-16 h-auto shrink-0 grayscale hover:grayscale-0 transition-all duration-300"
            width={64}
            height={64}
          />
          <Image
            src="/salafiyah.png"
            alt="logo pondok pesantren salafiyah syafiiyah"
            className="w-14 sm:w-16 md:w-18 h-auto shrink-0 grayscale hover:grayscale-0 transition-all duration-300"
            width={72}
            height={72}
          />
          <Image
            src="/burungIndonesia.png"
            alt="logo burung indonesia"
            className="w-14 sm:w-16 md:w-18 h-auto shrink-0 grayscale hover:grayscale-0 transition-all duration-300"
            width={72}
            height={72}
          />
          <Image
            src="/bekalPemimpin.png"
            alt="logo bekal pemimpin"
            className="w-14 sm:w-16 md:w-18 h-auto shrink-0 grayscale hover:grayscale-0 transition-all duration-300"
            width={72}
            height={72}
          />
          <Image
            src="/dlh.png"
            alt="logo dlh"
            className="w-14 sm:w-16 md:w-18 h-auto shrink-0 grayscale hover:grayscale-0 transition-all duration-300"
            width={72}
            height={72}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default PatnershipComponent;
