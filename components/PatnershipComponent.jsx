"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const PatnershipComponent = () => {
  return (
    <div className=" h-32 md:h-20 w-full relative flex items-center justify-center">
      <div className="bg-white md:w-[80%] md:p-2 p-4 w-auto md:absolute md:-translate-y-4 rounded-md shadow-md">
        {/* judul */}
        <p className="text-lg font-bold text-center text-emerald-700">
          Patnership
        </p>
        <hr className="text-emerald-700 w-full mt-3" />

        {/* content */}
        <motion.div
          className="flex items-center sm:my-10 md:my-4 justify-center md:gap-30 gap-4 mt-4 flex-wrap"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src="/madrasah.png"
            alt="logo madrasah salafiyah syafiiyah"
            className="mx-2 grayscale hover:grayscale-0"
            width={50}
            height={50}
          />
          <Image
            src="/salafiyah.png"
            alt="logo pondok pesantren salafiyah syafiiyah"
            className="mx-2 grayscale hover:grayscale-0"
            width={60}
            height={60}
          />
          <Image
            src="/burungIndonesia.png"
            alt="logo burung indonesia"
            className="mx-2 grayscale hover:grayscale-0"
            width={60}
            height={60}
          />
          <Image
            src="/bekalPemimpin.png"
            alt="logo bekal pemimpin"
            className="mx-2 grayscale hover:grayscale-0"
            width={60}
            height={60}
          />
          <Image
            src="/dlh.png"
            alt="logo dlh"
            className="mx-2 grayscale hover:grayscale-0"
            width={60}
            height={60}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default PatnershipComponent;
