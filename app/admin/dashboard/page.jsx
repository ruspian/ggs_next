import React from "react";
import { Users, FileText, ShieldCheck, UserCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { prisma } from "@/lib/prisma";
import RoleProgress from "@/components/RoleProgres";

async function getDashboardData() {
  // Ambil Statistik Utama secara paralel
  const [
    totalAnggota,
    totalKegiatan,
    totalAdmin,
    roleDistribution,
    recentKegiatan,
  ] = await Promise.all([
    prisma.jabatan.count(),
    prisma.kegiatan.count(),
    prisma.user.count({ where: { role: "Admin" } }),
    //   Distribusi Peran
    prisma.jabatan.groupBy({
      by: ["jabatan"],
      _count: {
        id: true,
      },
    }),
    //  5 Kegiatan Terbaru
    prisma.kegiatan.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return {
    totalAnggota,
    totalKegiatan,
    totalAdmin,
    roleDistribution,
    recentKegiatan,
  };
}

export default async function AdminDashboardPage() {
  const data = await getDashboardData();

  const stats = [
    {
      label: "Total Anggota",
      value: data.totalAnggota.toLocaleString(),
      icon: <Users className="text-blue-600" size={24} />,
      status: "Data Real-time",
      color: "bg-blue-50",
    },
    {
      label: "Konten Kegiatan",
      value: data.totalKegiatan.toLocaleString(),
      icon: <FileText className="text-emerald-600" size={24} />,
      status: "Publikasi Aktif",
      color: "bg-emerald-50",
    },
    {
      label: "Admin Sistem",
      value: data.totalAdmin.toLocaleString(),
      icon: <ShieldCheck className="text-amber-600" size={24} />,
      status: "Pengelola Aktif",
      color: "bg-amber-50",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header Section */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Dashboard Utama
        </h1>
        <p className="text-slate-500 text-sm">
          Pemantauan data real-time Gorontalo Green School.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm"
          >
            <div className="flex justify-between items-start">
              <div className={cn("p-3 rounded-2xl", stat.color)}>
                {stat.icon}
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                {stat.status}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {stat.label}
              </p>
              <h3 className="text-3xl font-black text-slate-900 mt-1">
                {stat.value}
              </h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activities Table */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-white">
            <h2 className="font-bold text-slate-900">Kegiatan Terbaru</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-slate-400 text-[10px] uppercase tracking-widest">
                  <th className="px-6 py-4 font-bold">Judul Kegiatan</th>
                  <th className="px-6 py-4 font-bold">Tanggal</th>
                  <th className="px-6 py-4 font-bold text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {data.recentKegiatan.length > 0 ? (
                  data.recentKegiatan.map((row) => (
                    <tr
                      key={row.id}
                      className="hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm font-bold text-slate-700 max-w-75 truncate">
                        {row.title}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">
                        {new Date(row.date).toLocaleDateString("id-ID", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={cn(
                            "text-[9px] font-black px-2 py-1 rounded-md uppercase tracking-tighter",
                            row.statusPublish === "Published"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-slate-100 text-slate-500"
                          )}
                        >
                          {row.statusPublish}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="3"
                      className="px-6 py-10 text-center text-sm text-slate-400"
                    >
                      Belum ada data kegiatan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Dynamic Distribusi Peran */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <h2 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
            <UserCheck size={18} className="text-emerald-600" />
            Distribusi Peran
          </h2>
          <div className="space-y-5">
            {data.roleDistribution.length > 0 ? (
              data.roleDistribution.map((item) => (
                <RoleProgress
                  key={item.jabatan}
                  label={item.jabatan}
                  count={item._count.id}
                  total={data.totalAnggota}
                />
              ))
            ) : (
              <p className="text-xs text-slate-400 text-center py-10">
                Data peran belum tersedia.
              </p>
            )}
          </div>

          <div className="mt-8 p-4 bg-emerald-50 rounded-2xl border border-dashed border-emerald-100">
            <p className="text-[10px] text-emerald-800 leading-relaxed font-bold text-center">
              TOTAL: {data.totalAnggota} ANGGOTA TERDAFTAR
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
