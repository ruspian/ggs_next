"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  Save,
  Image as ImageIcon,
  Calendar,
  MapPin,
  Tag,
  Eye,
  FileText,
} from "lucide-react";
import Link from "next/link";
import TiptapEditor from "@/components/TiptapEditor";

export default function TambahKegiatanPage() {
  const [content, setContent] = useState("");

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12 animate-in fade-in duration-500">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/kegiatan"
            className="p-2 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-emerald-600 transition-all shadow-sm"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Post Berita Kegiatan
            </h1>
            <p className="text-slate-500 text-sm">
              Publikasikan dokumentasi kegiatan Gorontalo Green School.
            </p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 text-slate-600 font-bold text-sm hover:bg-slate-100 rounded-xl transition-all">
            <Eye size={18} /> Pratinjau
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-sm shadow-lg shadow-emerald-900/20 hover:bg-emerald-700 active:scale-95 transition-all">
            <Save size={18} /> Publish Berita
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* KOLOM KIRI: EDITOR */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-8">
            {/* Input Judul */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                Judul Berita
              </label>
              <input
                type="text"
                placeholder="Masukkan judul yang menarik..."
                className="w-full text-3xl font-extrabold text-slate-900 placeholder:text-slate-200 border-none focus:ring-0 p-0 outline-none"
              />
            </div>

            {/* Upload Thumbnail */}
            <div className="group relative h-72 w-full bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center transition-all hover:bg-emerald-50/50 hover:border-emerald-300 cursor-pointer overflow-hidden">
              <div className="p-4 bg-white rounded-2xl shadow-sm text-emerald-600 mb-3 group-hover:scale-110 transition-transform">
                <ImageIcon size={32} />
              </div>
              <p className="text-sm font-bold text-slate-600">
                Klik untuk upload gambar utama
              </p>
              <p className="text-[11px] text-slate-400 mt-1 uppercase tracking-wider">
                Rasio 16:9 disarankan
              </p>
            </div>

            {/* TipTap Editor */}
            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                Isi Berita
              </label>
              <TiptapEditor onChange={setContent} />
            </div>
          </div>
        </div>

        {/* KOLOM KANAN: METADATA */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6 sticky top-6">
            <div className="flex items-center gap-2 border-b border-slate-50 pb-4">
              <FileText size={18} className="text-emerald-600" />
              <h3 className="font-bold text-slate-800">Detail Publikasi</h3>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">
                  Tanggal Kegiatan
                </label>
                <div className="relative">
                  <Calendar
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    size={16}
                  />
                  <input
                    type="date"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">
                  Lokasi Aksi
                </label>
                <div className="relative">
                  <MapPin
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    size={16}
                  />
                  <input
                    type="text"
                    placeholder="Contoh: Desa Torosiaje"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">
                  Kategori
                </label>
                <div className="relative">
                  <Tag
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    size={16}
                  />
                  <select className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none cursor-pointer appearance-none">
                    <option value="Konservasi">Konservasi</option>
                    <option value="Edukasi">Edukasi</option>
                    <option value="Aksi Sosial">Aksi Sosial</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-4 space-y-3">
              <button className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors md:hidden">
                Publish Sekarang
              </button>
              <p className="text-[10px] text-slate-400 text-center italic">
                Draft akan tersimpan otomatis secara lokal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
