"use client";

import React, { useEffect, useState } from "react";
import {
  Plus,
  Search,
  Eye,
  Edit3,
  Trash2,
  Globe,
  Lock,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import { formatSingkatNomer } from "@/lib/formatNumber";
import { useDebounce } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const KegiatanAdminClient = ({
  posts,
  pagination,
  totalViews,
  totalPublished,
  totalDraft,
}) => {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    const currentSearch = searchParams.get("search") || "";

    if (debouncedSearch !== currentSearch) {
      if (debouncedSearch) {
        params.set("search", debouncedSearch);
      } else {
        params.delete("search");
      }

      params.set("page", "1");
      router.push(`${pathname}?${params.toString()}`);
    }
  }, [debouncedSearch, pathname, router, searchParams]);

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", newPage.toString());

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Berita Kegiatan</h1>
          <p className="text-slate-500 text-sm">
            Publikasikan dokumentasi kegiatan yang telah dilaksanakan.
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-emerald-900/20">
          <Link
            href="/admin/kegiatan/tambah"
            className="flex items-center justify-center gap-2"
          >
            <Plus size={20} />
            Tulis Berita Baru
          </Link>
        </button>
      </div>

      {/* Stats Berita Singkat */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">
            Total Post
          </p>
          <h3 className="text-xl font-bold text-slate-900 mt-1">
            {formatSingkatNomer(pagination.totalItems)}
          </h3>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">
            Total Views
          </p>
          <h3 className="text-xl font-bold text-emerald-600 mt-1">
            {formatSingkatNomer(totalViews)}
          </h3>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">
            Published
          </p>
          <h3 className="text-xl font-bold text-blue-600 mt-1">
            {formatSingkatNomer(totalPublished)}
          </h3>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">
            Draft
          </p>
          <h3 className="text-xl font-bold text-amber-600 mt-1">
            {formatSingkatNomer(totalDraft)}
          </h3>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-80">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Cari judul berita..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          {posts.length > 0 ? (
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 text-slate-500 text-[11px] uppercase font-bold tracking-widest border-b border-slate-100">
                  <th className="px-6 py-4">Konten Berita</th>
                  <th className="px-6 py-4 text-center">Status</th>
                  <th className="px-6 py-4 text-center">Statistik</th>
                  <th className="px-6 py-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {posts.map((post) => (
                  <tr
                    key={post.id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-6 py-5">
                      <div className="flex flex-col gap-1 max-w-md">
                        <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
                          {post.category}
                        </span>
                        <h4 className="font-bold text-slate-800 leading-tight hover:text-emerald-600 cursor-pointer transition-colors">
                          {post.title}
                        </h4>
                        <p className="text-xs text-slate-400 flex items-center gap-2 mt-1">
                          Oleh{" "}
                          <span className="text-slate-600 font-medium">
                            {post.author}
                          </span>{" "}
                          • {post.date}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <div className="flex flex-col items-center gap-1">
                        {post.status === "Published" ? (
                          <div className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                            <Globe size={12} />
                            <span className="text-[10px] font-bold uppercase">
                              Public
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-slate-400 bg-slate-100 px-2 py-1 rounded-md">
                            <Lock size={12} />
                            <span className="text-[10px] font-bold uppercase">
                              Draft
                            </span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex justify-center gap-4 text-slate-400">
                        <div className="flex flex-col items-center">
                          <span className="text-xs font-bold text-slate-700">
                            {post.views}
                          </span>
                          <Eye size={14} />
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="text-xs font-bold text-slate-700">
                            12
                          </span>
                          <MessageSquare size={14} />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg transition-colors"
                          title="Lihat"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          className="p-2 text-slate-400 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit3 size={18} />
                        </button>
                        <button
                          className="p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
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
          ) : (
            <div className="flex items-center justify-center py-8">
              <p className="text-sm text-slate-400">Tidak ada data</p>
            </div>
          )}
        </div>
        <div className="p-6 border-t border-slate-50 flex items-center justify-between">
          <p className="text-xs text-slate-500 font-medium">
            Menampilkan halaman{" "}
            <span className="text-slate-900">{pagination.currentPage}</span>{" "}
            dari <span className="text-slate-900">{pagination.totalPages}</span>
          </p>
          <div className="flex items-center gap-2">
            <button
              disabled={pagination.currentPage === 1}
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              className="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 disabled:opacity-50 transition-all"
            >
              Sebelumnya
            </button>
            <button
              disabled={pagination.currentPage === pagination.totalPages}
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              className="px-4 py-2 text-xs font-bold text-white bg-slate-900 rounded-lg hover:bg-slate-800 disabled:opacity-50 transition-all"
            >
              Selanjutnya
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KegiatanAdminClient;
