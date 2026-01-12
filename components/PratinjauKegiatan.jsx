import { sanitizeHtml } from "@/lib/protectDangerouslySetInnerHTML";
import { X } from "lucide-react";
import Image from "next/image";

export const PratinjauKegiatan = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  const cleanContent = sanitizeHtml(data.content);

  return (
    <div className="fixed h-screen inset-0 z-100 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-8">
      <div className="bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[40px] shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="sticky top-6 float-right mr-6 z-10 p-2 bg-slate-100 hover:bg-red-100 hover:text-red-600 rounded-full transition-all"
        >
          <X size={24} />
        </button>

        <div className="p-8 md:p-16 space-y-8">
          {/* Header Preview */}
          <div className="space-y-4 text-center max-w-3xl mx-auto">
            <span className="px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-widest">
              {data.category || "Kategori"}
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
              {data.title || "Judul Belum Diisi"}
            </h1>
            <div className="flex items-center justify-center gap-6 text-slate-500 text-sm font-medium">
              <span>{data.date || "Tanggal belum diatur"}</span>
              <span>•</span>
              <span>{data.location || "Lokasi belum diatur"}</span>
            </div>
          </div>

          {/* Image Preview */}
          {data.image && (
            <div className="relative h-100 w-full rounded-[32px] overflow-hidden shadow-xl">
              <Image
                src={data.image}
                alt="Preview"
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Content Preview */}
          <div
            className="prose prose-slate prose-lg max-w-3xl mx-auto"
            dangerouslySetInnerHTML={{
              __html:
                cleanContent ||
                "<p className='text-slate-400 italic'>Belum ada isi berita...</p>",
            }}
          />
        </div>
      </div>
    </div>
  );
};
