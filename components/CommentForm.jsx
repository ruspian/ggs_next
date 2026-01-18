"use client";

import { useOptimistic, useRef, useTransition } from "react";
import { PostKomentar } from "@/lib/action";
import Image from "next/image";
import { toast } from "sonner";
import { formatDateToDisplayID } from "@/lib/formatTanggal";

export default function CommentForm({ session, kegiatanId, initialComments }) {
  const formRef = useRef(null);
  const [isPending, startTransition] = useTransition();

  // Inisialisasi useOptimistic => untuk optimistic rendering agar tampil instan
  const [optimisticComments, addOptimisticComment] = useOptimistic(
    initialComments,
    (state, newComment) => [newComment, ...state], // Tambah komen baru ke urutan teratas
  );

  //   fungsi hapus spasi nama
  const removeSpaces = (str) => {
    return str.replace(/\s/g, "");
  };

  const handleAction = async (formData) => {
    const content = formData.get("content");
    if (!content) return;

    // Buat data sementara untuk tampilan instan sebelum dikirim
    const fakeComment = {
      id: Math.random().toString(), // ID sementara
      content: content,
      createdAt: new Date().toISOString(),
      user: {
        name: session.user.name,
        image: session.user.image,
      },
    };

    // Jalankan transisi optimistik
    startTransition(async () => {
      addOptimisticComment(fakeComment);
      formRef.current?.reset();

      const res = await PostKomentar(formData);
      if (!res.success) {
        toast.error(res.message);
      }
    });
  };

  return (
    <div className="space-y-12">
      {/* INPUT FORM */}
      <div className="flex gap-4">
        <div className="shrink-0">
          <Image
            src={
              session.user.image ||
              `https://api.dicebear.com/7.x/initials/svg?seed=${session.user.name}`
            }
            alt="User Avatar"
            width={48}
            height={48}
            unoptimized
            className="rounded-full w-12 h-12 object-cover border-2 border-emerald-50"
          />
        </div>
        <form ref={formRef} action={handleAction} className="flex-1 space-y-3">
          <input type="hidden" name="kegiatanId" value={kegiatanId} />
          <textarea
            name="content"
            disabled={isPending}
            placeholder="Tulis pendapat atau pertanyaanmu..."
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none min-h-25 transition-all disabled:opacity-50"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isPending}
              className="bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-emerald-700 transition-all active:scale-95 disabled:bg-slate-400"
            >
              {isPending ? "Mengirim..." : "Kirim Komentar"}
            </button>
          </div>
        </form>
      </div>

      {/* tampilkan komen instan dahulu sebelum dikirim*/}
      <div className="space-y-8">
        {optimisticComments.map((comment) => (
          <div
            key={comment.id}
            className="flex gap-4 group animate-in fade-in slide-in-from-top-2 duration-300"
          >
            <div className="shrink-0">
              <Image
                src={
                  comment.user.image ||
                  `https://api.dicebear.com/7.x/initials/svg?seed=${comment.user.name}`
                }
                alt={comment.user.name}
                width={40}
                height={40}
                className="rounded-full object-cover"
                unoptimized
              />
            </div>
            <div className="flex-1">
              <div className="bg-slate-50 p-4 rounded-2xl rounded-tl-none group-hover:bg-slate-100 transition-colors">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-black text-slate-900">
                    {comment.user.name}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                    {formatDateToDisplayID(comment.date)}
                  </span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {comment.comment}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
