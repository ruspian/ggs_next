"use client";

import React, { useState } from "react";
import { Lock, Globe, Save, UserCog } from "lucide-react";
import { cn } from "@/lib/utils";
import SettingProfilOrganisasi from "@/components/SettingProfilOrganisasi";
import SettingKelolaUser from "@/components/SettingKelolaUser";
import SettingKeamananAkun from "@/components/SettingKeamananAkun";

const SettingClient = ({ admins, profil }) => {
  const [activeTab, setActiveTab] = useState("umum");

  const tabs = [
    { id: "umum", label: "Profil Organisasi", icon: <Globe size={18} /> },
    {
      id: "users",
      label: "Pengelola User",
      icon: <UserCog size={18} />,
    },
    { id: "akun", label: "Keamanan Akun", icon: <Lock size={18} /> },
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
            {/*  PROFIL ORGANISASI */}
            {activeTab === "umum" && (
              <SettingProfilOrganisasi profil={profil} />
            )}

            {/* PENGELOLA DASHBOARD  */}
            {activeTab === "users" && <SettingKelolaUser admins={admins} />}

            {/*  KEAMANAN AKUN  */}
            {activeTab === "akun" && <SettingKeamananAkun />}
          </div>

          {/* FOOTER ACTION  */}
          <div className="p-6 bg-slate-50/80 border-t border-slate-100 flex justify-end items-center gap-4">
            <span className="text-[10px] text-slate-400 font-medium hidden md:inline">
              Terakhir diperbarui: Hari ini, 08:30 WITA
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingClient;
