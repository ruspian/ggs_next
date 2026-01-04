"use client";

import React from "react";
import {
  Users,
  FileText,
  TrendingUp,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminDashboardPage() {
  // Data dummy untuk statistik
  const stats = [
    {
      label: "Total Anggota",
      value: "1,248",
      icon: <Users className="text-blue-600" size={24} />,
      trend: "+12%",
      isUp: true,
      color: "bg-blue-50",
    },
    {
      label: "Kegiatan Aktif",
      value: "24",
      icon: <FileText className="text-emerald-600" size={24} />,
      trend: "+5%",
      isUp: true,
      color: "bg-emerald-50",
    },
    {
      label: "Kunjungan Web",
      value: "14,200",
      icon: <TrendingUp className="text-amber-600" size={24} />,
      trend: "-2%",
      isUp: false,
      color: "bg-amber-50",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard Utama</h1>
        <p className="text-slate-500">
          Selamat datang kembali, Admin Gorontalo Green School.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div className={cn("p-3 rounded-xl", stat.color)}>
                {stat.icon}
              </div>
              <div
                className={cn(
                  "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
                  stat.isUp
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-red-100 text-red-700"
                )}
              >
                {stat.isUp ? (
                  <ArrowUpRight size={14} />
                ) : (
                  <ArrowDownRight size={14} />
                )}
                {stat.trend}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-900">
                {stat.value}
              </h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activities Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h2 className="font-bold text-slate-900">Kegiatan Terbaru</h2>
            <button className="text-sm text-emerald-600 font-medium hover:underline">
              Lihat Semua
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                  <th className="px-6 py-4 font-semibold">Nama Kegiatan</th>
                  <th className="px-6 py-4 font-semibold">Tanggal</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  {
                    title: "Penanaman Mangrove Pohuwato",
                    date: "12 Des 2025",
                    status: "Selesai",
                  },
                  {
                    title: "Workshop Zero Waste",
                    date: "05 Jan 2026",
                    status: "Mendatang",
                  },
                  {
                    title: "Edukasi Hijau di SMP 1",
                    date: "28 Des 2025",
                    status: "Proses",
                  },
                ].map((row, i) => (
                  <tr
                    key={i}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-slate-700">
                      {row.title}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {row.date}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={cn(
                          "text-[10px] font-bold px-2 py-1 rounded-md uppercase",
                          row.status === "Selesai"
                            ? "bg-blue-100 text-blue-700"
                            : row.status === "Proses"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-emerald-100 text-emerald-700"
                        )}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* agenda */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h2 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Calendar size={18} className="text-emerald-600" />
            Agenda Terdekat
          </h2>
          <div className="space-y-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex gap-4">
                <div className="shrink-0 w-12 h-12 bg-slate-50 rounded-xl flex flex-col items-center justify-center border border-slate-100">
                  <span className="text-xs font-bold text-slate-400">JAN</span>
                  <span className="text-sm font-bold text-slate-900">
                    {10 + item}
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 line-clamp-1">
                    Rapat Koordinasi Relawan
                  </h4>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                    <Clock size={12} /> 09:00 WITA
                  </p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors">
            Tambah Agenda
          </button>
        </div>
      </div>
    </div>
  );
}
