"use client";

import React, { useState } from "react";
import {
  Search,
  UserPlus,
  MoreVertical,
  Mail,
  MapPin,
  Trash2,
  Edit2,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function AnggotaAdminPage() {
  const [searchTerm, setSearchTerm] = useState("");

  // Data Dummy Anggota
  const members = [
    {
      id: 1,
      name: "Arif Rahmansyah",
      email: "arif@example.com",
      address: "Kota Timur, Gorontalo",
      status: "Aktif",
      role: "Relawan",
    },
    {
      id: 2,
      name: "Siti Aminah",
      email: "siti@example.com",
      address: "Suwawa, Bone Bolango",
      status: "Aktif",
      role: "Koordinator",
    },
    {
      id: 3,
      name: "Budi Setiawan",
      email: "budi@example.com",
      address: "Limboto, Gorontalo",
      status: "Non-Aktif",
      role: "Anggota",
    },
    {
      id: 4,
      name: "Dewi Lestari",
      email: "dewi@example.com",
      address: "Marisa, Pohuwato",
      status: "Aktif",
      role: "Relawan",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header & Action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Manajemen Anggota
          </h1>
          <p className="text-slate-500 text-sm">
            Kelola data relawan dan anggota Gorontalo Green School.
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-emerald-900/20">
          <Link
            href="/admin/anggota/tambah"
            className="flex items-center justify-center gap-2"
          >
            <UserPlus size={20} />
            Tambah Anggota
          </Link>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Cari nama atau email..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-all text-sm font-medium">
          <Filter size={18} />
          Filter
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                  Nama Anggota
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                  Kontak & Alamat
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                  Jabatan
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-center">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {members.map((member) => (
                <tr
                  key={member.id}
                  className="hover:bg-slate-50/50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold">
                        {member.name.charAt(0)}
                      </div>
                      <span className="font-semibold text-slate-700">
                        {member.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Mail size={14} /> {member.email}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <MapPin size={14} /> {member.address}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-600">
                    {member.role}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                        member.status === "Aktif"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-100 text-slate-500"
                      )}
                    >
                      {member.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        title="Edit"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        title="Hapus"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Dummy */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
          <p className="text-xs text-slate-500">
            Menampilkan 4 dari 1,248 anggota
          </p>
          <div className="flex gap-2">
            <button
              className="px-3 py-1 border border-slate-200 rounded bg-white text-xs disabled:opacity-50"
              disabled
            >
              Sebelumnya
            </button>
            <button className="px-3 py-1 border border-slate-200 rounded bg-white text-xs">
              Selanjutnya
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
