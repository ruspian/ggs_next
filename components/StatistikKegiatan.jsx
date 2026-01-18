"use client";

import { PostLikeKegiatan } from "@/lib/action";
import { cn } from "@/lib/utils";
import { Eye, Heart, MessageCircle, Share2 } from "lucide-react";
import React, { useOptimistic, useTransition } from "react";

const StatistikKegiatan = ({ kegiatan, isLikedInitial }) => {
  const [isPending, startTransition] = useTransition();

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

  const handleLike = () => {
    startTransition(async () => {
      addOptimisticLike(); // update UI langsung
      await PostLikeKegiatan(kegiatan.id); // tambahkan like
    });
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

      <button className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-xl font-bold text-sm hover:bg-slate-200 transition-all">
        <Share2 size={18} /> Bagikan
      </button>
    </div>
  );
};

export default StatistikKegiatan;
