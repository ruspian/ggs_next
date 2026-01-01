import React, { Fragment } from "react";
import { AnimatedTooltip } from "./ui/animated-tooltip";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const AnggotaComponent = () => {
  const people = [
    {
      id: 1,
      name: "John Doe",
      designation: "Software Engineer",
      image:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
    },
    {
      id: 2,
      name: "Robert Johnson",
      designation: "Product Manager",
      image:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 3,
      name: "Jane Smith",
      designation: "Data Scientist",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 4,
      name: "Emily Davis",
      designation: "UX Designer",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 5,
      name: "Tyler Durden",
      designation: "Soap Developer",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
    },
    {
      id: 6,
      name: "Dora",
      designation: "The Explorer",
      image:
        "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3534&q=80",
    },
  ];

  return (
    <>
      <div className="flex flex-col items-center justify-center mb-10 px-4 ">
        <h2 className="text-3xl font-bold text-emerald-600 mb-4">
          Anggota <span className="text-gray-800 text-center">Kami</span>
        </h2>
        <p className="text-gray-600 text-center max-w-2xl">
          Tim kami terdiri dari individu-individu berdedikasi yang bersemangat
          tentang pendidikan berkelanjutan dan pelestarian lingkungan. Kenali
          lebih dekat dengan anggota-anggota kami yang berkontribusi dalam
          mewujudkan visi dan misi Gorontalo Green School.
        </p>
      </div>

      <div className="flex flex-row items-center justify-center mb-10 w-full">
        <AnimatedTooltip items={people} />
      </div>

      <div className="flex flex-col items-center justify-center mb-10 px-4">
        <Link
          href="/anggota"
          className="text-sm text-emerald-600 font-semibold hover:underline"
        >
          {" "}
          Lihat Semua Anggota
          <ArrowRight className="inline-block ml-2 h-4 w-4" />
        </Link>
      </div>
    </>
  );
};

export default AnggotaComponent;
