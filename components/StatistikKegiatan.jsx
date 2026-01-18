"use client";

import { PostLikeKegiatan } from "@/lib/action";
import { cn } from "@/lib/utils";
import { useToaster } from "@/providers/ToastProvider";
import { Check, Eye, Heart, MessageCircle, Share2 } from "lucide-react";
import React, { useOptimistic, useState, useTransition } from "react";

const StatistikKegiatan = ({ kegiatan, isLikedInitial }) => {
  const [isPending, startTransition] = useTransition();
  const [isCopied, setIsCopied] = useState(false);

  const toast = useToaster();

  const [optimisticLike, addOptimisticLike] = useOptimistic(
    {
      count: kegiatan._count.likes,
      isLiked: isLikedInitial,
    },
    (state) => ({
      count: state.isLiked ? state.count - 1 : state.count + 1,
      isLiked: !state.isLiked,
    }),
  );

  // fungsi ketika tombil like di klik
  const handleLike = () => {
    startTransition(async () => {
      addOptimisticLike(); // update UI langsung
      await PostLikeKegiatan(kegiatan.id); // tambahkan like
    });
  };

  // fungsi share
  const handleShare = async () => {
    const shareData = {
      title: kegiatan?.title,
      text:
        kegiatan?.content ||
        "Lihat aksi seru dari Gorontalo Green School ini! ",
      url: window.location.href,
    };

    try {
      // Cek apakah browser mendukung Web Share API
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // copy data ke klipbor
        await navigator.clipboard.writeText(window.location.href);

        setIsCopied(true);
        toast.current.show({
          title: "Berhasil!",
          message: "Link Berhasil disalin ke clipboard!",
          variant: "success",
          position: "top-right",
          duration: 5000,
        });
      }

      setTimeout(() => setIsCopied(false), 5000);
    } catch (error) {
      toast.current.show({
        title: "Gagal!",
        message: "Link Gagal disalin ke clipboard!",
        variant: "error",
        position: "top-right",
        duration: 5000,
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-6 text-slate-600">
        <div className="flex items-center gap-1.5 font-bold">
          <Eye size={20} className="text-blue-500" />
          <span>{kegiatan.views || 0}</span>
        </div>
        <button
          onClick={handleLike}
          disabled={isPending}
          className="flex items-center gap-1.5 font-bold group transition-all"
        >
          <Heart
            size={22}
            className={cn(
              "transition-all duration-300",
              optimisticLike.isLiked
                ? "fill-rose-500 text-rose-500 scale-110"
                : "text-slate-400 group-hover:text-rose-400",
            )}
          />
          <span
            className={cn(
              "text-sm",
              optimisticLike.isLiked ? "text-rose-600" : "text-slate-500",
            )}
          >
            {optimisticLike.count}
          </span>
        </button>
        <div className="flex items-center gap-1.5 font-bold">
          <MessageCircle size={20} className="text-emerald-500" />
          <span>{kegiatan._count.comments}</span>
        </div>
      </div>

      <button
        onClick={handleShare}
        className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-xl font-bold text-sm hover:bg-slate-200 transition-all"
      >
        {isCopied ? (
          <>
            <Check size={18} className="text-emerald-600" />
            Tersalin
          </>
        ) : (
          <>
            <Share2 size={18} />
            Bagikan
          </>
        )}
      </button>
    </div>
  );
};

export default StatistikKegiatan;
