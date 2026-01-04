"use client";

import React from "react";
import {
  ArrowLeft,
  Save,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function TambahAnggotaPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* HEADER & NAVIGASI */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/anggota"
            className="p-2 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-emerald-600 hover:border-emerald-100 transition-all shadow-sm"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Tambah Anggota
            </h1>
            <p className="text-slate-500 text-sm font-medium">
              Lengkapi formulir untuk mendaftarkan anggota baru.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <form className="p-8 space-y-10">
          {/* SECTION 1: INFORMASI PRIBADI */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 border-b border-slate-50 pb-2">
              <User className="text-emerald-600" size={18} />
              <h2 className="font-bold text-slate-800 uppercase tracking-wider text-xs">
                Informasi Pribadi
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  Nama Lengkap
                </label>
                <div className="relative">
                  <User
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    size={16}
                  />
                  <input
                    type="text"
                    placeholder="Contoh: Arif Rahmansyah"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  Email
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    size={16}
                  />
                  <input
                    type="email"
                    placeholder="alamat@email.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  Nomor HP / WhatsApp
                </label>
                <div className="relative">
                  <Phone
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    size={16}
                  />
                  <input
                    type="text"
                    placeholder="+62 8..."
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  Jenis Kelamin
                </label>
                <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none cursor-pointer">
                  <option value="">Pilih Jenis Kelamin</option>
                  <option value="L">Laki-laki</option>
                  <option value="P">Perempuan</option>
                </select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-bold text-slate-700">
                  Alamat Lengkap
                </label>
                <div className="relative">
                  <MapPin
                    className="absolute left-3 top-3 text-slate-400"
                    size={16}
                  />
                  <textarea
                    rows="2"
                    placeholder="Jl. Merdeka No. 1, Kel. ..., Kec. ..."
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: DETAIL ORGANISASI */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 border-b border-slate-50 pb-2">
              <Briefcase className="text-emerald-600" size={18} />
              <h2 className="font-bold text-slate-800 uppercase tracking-wider text-xs">
                Keanggotaan & Peran
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  Posisi / Jabatan
                </label>
                <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none cursor-pointer">
                  <option value="Relawan">Relawan</option>
                  <option value="Anggota">Anggota Tetap</option>
                  <option value="Koordinator">Koordinator Lapangan</option>
                  <option value="Pengurus">Pengurus Inti</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  Tanggal Bergabung
                </label>
                <div className="relative">
                  <Calendar
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    size={16}
                  />
                  <input
                    type="date"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  Status Keanggotaan
                </label>
                <div className="flex items-center gap-4 py-2">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="radio"
                      name="status"
                      defaultChecked
                      className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">
                      Aktif
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="radio"
                      name="status"
                      className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">
                      Pending
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* FOOTER ACTIONS */}
          <div className="pt-8 border-t border-slate-50 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-400 italic">
              <ShieldCheck size={14} />
              Data akan tersimpan secara aman di sistem GGS.
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <Link
                href="/admin/anggota"
                className="flex-1 md:flex-none text-center px-8 py-3 bg-slate-50 text-slate-500 font-bold rounded-xl text-sm hover:bg-slate-100 transition-all"
              >
                Batal
              </Link>
              <button
                type="submit"
                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-3 bg-emerald-600 text-white font-bold rounded-xl text-sm shadow-lg shadow-emerald-900/20 hover:bg-emerald-700 active:scale-95 transition-all"
              >
                <Save size={18} />
                Simpan Anggota
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
