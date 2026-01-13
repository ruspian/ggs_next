import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const AboutComponent = () => {
  return (
    <div className="h-auto">
      <div className="flex flex-col items-center justify-center md:flex-row gap-4 px-10 md:mx-10 my-2 py-2 border rounded-sm shadow-xl">
        <div className="w-72 h-72 pt-6 flex items-center justify-center">
          <Image
            alt={`logo gorontalo green school`}
            src="/logo.png"
            className="object-cover rounded-md animate-float1"
            width={220}
            height={220}
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-emerald-600">
            Tentang <span className="text-gray-800">Kami</span>
          </h1>
          <p className="my-4 text-gray-600 text-justify">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam
            necessitatibus vero quod facilis, vel cumque quisquam distinctio
            explicabo, sunt amet quis quo tempore nihil aliquid quam aliquam
            pariatur, culpa architecto.
          </p>

          <Button
            color="success"
            size="sm"
            radius="sm"
            className="text-xs text-white cursor-pointer py-3"
          >
            <Link href={"/tentang"}>Lihat Selengkapnya</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AboutComponent;
