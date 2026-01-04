"use client";

import React, { useState } from "react";
import {
  Lock,
  Globe,
  Bell,
  Save,
  Camera,
  Mail,
  UserCog,
  Trash2,
  ShieldAlert,
  Plus,
  Phone,
  MapPin,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("umum");

  const tabs = [
    { id: "umum", label: "Profil Organisasi", icon: <Globe size={18} /> },
    { id: "users", label: "Pengelola Dashboard", icon: <UserCog size={18} /> },
    { id: "akun", label: "Keamanan Akun", icon: <Lock size={18} /> },
  ];

  // Data dummy user yang punya akses admin
  const admins = [
    {
      id: 1,
      name: "Admin Utama GGS",
      email: "admin@ggs.org",
      role: "Super Admin",
    },
    {
      id: 2,
      name: "Arif Rahmansyah",
      email: "arif.editor@ggs.org",
      role: "Editor",
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Pengaturan
        </h1>
        <p className="text-slate-500 text-sm">
          Kelola identitas organisasi dan hak akses pengelola sistem.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* SIDEBAR NAVIGASI PENGATURAN */}
        <div className="w-full lg:w-64 shrink-0">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden p-2 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all",
                  activeTab === tab.id
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-900/20"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* KONTEN UTAMA */}
        <div className="flex-1 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
          <div className="flex-1">
            {/* --- TAB 1: PROFIL ORGANISASI --- */}
            {activeTab === "umum" && (
              <div className="p-8 space-y-8 animate-in slide-in-from-bottom-2 duration-300">
                <div className="flex items-center gap-6 pb-8 border-b border-slate-50">
                  <div className="relative">
                    <div className="w-24 h-24 bg-slate-100 rounded-3xl flex items-center justify-center border-2 border-dashed border-slate-200">
                      <Globe size={40} className="text-slate-300" />
                    </div>
                    <button className="absolute -bottom-2 -right-2 p-2 bg-emerald-600 text-white rounded-xl shadow-lg hover:scale-110 transition-transform">
                      <Camera size={16} />
                    </button>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg">
                      Logo Organisasi
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Format PNG, JPG atau WEBP (Maks. 2MB)
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">
                      Nama Resmi
                    </label>
                    <input
                      type="text"
                      defaultValue="Gorontalo Green School"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">
                      Email Publik
                    </label>
                    <div className="relative">
                      <Mail
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        size={16}
                      />
                      <input
                        type="email"
                        defaultValue="info@ggs.org"
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">
                      WhatsApp / Telepon
                    </label>
                    <div className="relative">
                      <Phone
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        size={16}
                      />
                      <input
                        type="text"
                        defaultValue="+62 812-3456-7890"
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none"
                      />
                    </div>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-bold text-slate-700">
                      Alamat Kantor
                    </label>
                    <div className="relative">
                      <MapPin
                        className="absolute left-3 top-3 text-slate-400"
                        size={16}
                      />
                      <textarea
                        rows="3"
                        defaultValue="Jl. Jend. Sudirman No. 123, Kota Gorontalo"
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* --- TAB 2: PENGELOLA DASHBOARD --- */}
            {activeTab === "users" && (
              <div className="p-8 space-y-6 animate-in slide-in-from-bottom-2 duration-300">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-lg text-slate-800">
                      Akses Pengelola
                    </h3>
                    <p className="text-xs text-slate-500">
                      Daftar akun yang dapat mengelola dashboard ini.
                    </p>
                  </div>
                  <button className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-800 transition-all">
                    <Plus size={14} /> Tambah Admin
                  </button>
                </div>

                <div className="space-y-3">
                  {admins.map((adm) => (
                    <div
                      key={adm.id}
                      className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-emerald-200 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-slate-200 text-slate-400 shadow-sm font-bold">
                          {adm.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-800">
                            {adm.name}
                          </h4>
                          <p className="text-[11px] text-slate-500 font-medium">
                            {adm.email}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <select className="bg-white border border-slate-200 text-[11px] font-bold px-3 py-1.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer">
                          <option selected={adm.role === "Super Admin"}>
                            Super Admin
                          </option>
                          <option selected={adm.role === "Editor"}>
                            Editor
                          </option>
                          <option selected={adm.role === "Viewer"}>
                            Viewer
                          </option>
                        </select>
                        <button className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl flex gap-3">
                  <ShieldAlert className="text-amber-600 shrink-0" size={20} />
                  <p className="text-[11px] text-amber-800 leading-relaxed italic">
                    <strong>Informasi Peran:</strong> Peran <b>Super Admin</b>{" "}
                    memiliki akses penuh ke sistem. Gunakan peran <b>Editor</b>{" "}
                    untuk tim yang hanya bertugas mengelola berita kegiatan.
                  </p>
                </div>
              </div>
            )}

            {/* --- TAB 3: KEAMANAN AKUN --- */}
            {activeTab === "akun" && (
              <div className="p-8 space-y-6 animate-in slide-in-from-bottom-2 duration-300">
                <div className="max-w-md space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">
                      Password Saat Ini
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">
                      Password Baru
                    </label>
                    <input
                      type="password"
                      placeholder="Min. 8 karakter"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none"
                    />
                  </div>
                  <div className="space-y-2 text-[11px] text-slate-500 bg-slate-50 p-4 rounded-xl border border-slate-100">
                    Sangat disarankan untuk mengganti password secara berkala
                    untuk menjaga keamanan data organisasi.
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* FOOTER ACTION (STICKY) */}
          <div className="p-6 bg-slate-50/80 border-t border-slate-100 flex justify-end items-center gap-4">
            <span className="text-[10px] text-slate-400 font-medium hidden md:inline">
              Terakhir diperbarui: Hari ini, 08:30 WITA
            </span>
            <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-emerald-900/20 active:scale-95">
              <Save size={18} /> Simpan Perubahan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
