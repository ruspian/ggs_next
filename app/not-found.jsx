export const dynamic = "force-dynamic";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
      <h1 className="text-9xl font-black text-emerald-600">404</h1>
      <h2 className="text-2xl font-bold text-slate-900 mt-4">
        Halaman Tidak Ditemukan
      </h2>
      <p className="text-slate-500 mt-2 text-center max-w-md">
        Maaf, halaman yang kamu cari mungkin sudah dihapus atau link-nya salah
        ketik.
      </p>
      <Link
        href="/"
        className="mt-8 bg-emerald-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}
