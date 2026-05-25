export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";
import { sanitizeHtml } from "@/lib/protectDangerouslySetInnerHTML";
import { auth } from "@/lib/auth";
import { UpdateViews } from "@/lib/action";
import CommentForm from "@/components/CommentForm";
import StatistikKegiatan from "@/components/StatistikKegiatan";
import { formatDateToDisplayID } from "@/lib/formatTanggal";
import Link from "next/link";

export async function generateMetadata({ params }) {
  const { id } = await params;

  const kegiatan = await prisma.kegiatan.findUnique({
    where: { id },
    select: {
      title: true,
      content: true,
      image: true,
    },
  });

  if (!kegiatan) {
    return {
      title: "Kegiatan Tidak Ditemukan | Gorontalo Green School",
    };
  }

  const plainTextContent = kegiatan.content.replace(/<[^>]+>/g, "");
  const metaDescription = plainTextContent.substring(0, 150) + "...";

  return {
    title: kegiatan.title,
    description: metaDescription,
    openGraph: {
      title: kegiatan.title,
      description: metaDescription,
      url: `https://ggs-next.vercel.app/kegiatan/${id}`,
      siteName: "Gorontalo Green School",
      images: [
        {
          url: kegiatan.image || "/og-image-ggs.png",
          width: 1200,
          height: 630,
          alt: kegiatan.title,
        },
      ],
      locale: "id_ID",
      type: "article",
    },
  };
}

export default async function DetailKegiatanPage({ params }) {
  const { id } = await params;
  const session = await auth();
  const userId = session?.user?.id;

  const kegiatan = await prisma.kegiatan.findUnique({
    where: { id },
    include: {
      _count: {
        select: {
          likes: true,
          comments: true,
        },
      },
      comments: {
        include: {
          user: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      likes: true,
    },
  });

  if (userId) {
    UpdateViews(id, userId).catch((error) => console.log(error));
  }

  if (!kegiatan) return notFound();

  const cleanContent = sanitizeHtml(kegiatan?.content);

  const isLikedInitial = userId
    ? kegiatan.likes.some((like) => like.userId === userId)
    : false;

  return (
    <main className="min-h-screen bg-white pb-20">
      <article className="p-6 md:p-16 space-y-8">
        <div className="space-y-4 text-center max-w-3xl mx-auto mt-6 md:mt-10 px-4">
          <span className="px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-widest">
            {kegiatan.kategori}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 leading-tight">
            {kegiatan.title}
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-6 text-slate-500 text-xs md:text-sm font-medium">
            <span>{formatDateToDisplayID(kegiatan.date)}</span>
            <span className="hidden md:inline">•</span>
            <span>{kegiatan.lokasi}</span>
          </div>
        </div>

        {kegiatan.image && (
          <section className="flex justify-center w-full px-4 py-6 md:py-8">
            <div className="relative h-62.5 sm:h-87.5 md:h-125 w-full max-w-5xl rounded-2xl md:rounded-[32px] overflow-hidden shadow-2xl ring-1 ring-slate-200">
              <Image
                src={kegiatan.image}
                alt={kegiatan.title}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                priority
              />
            </div>
          </section>
        )}

        <div className="flex items-center gap-4 mb-8 md:mb-10 pb-8 md:pb-10 border-b border-slate-100 max-w-3xl mx-auto px-4">
          <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 bg-emerald-100 rounded-xl md:rounded-2xl flex items-center justify-center font-bold text-emerald-700 shadow-sm border border-emerald-200">
            {kegiatan?.author?.charAt(0).toUpperCase() || "A"}
          </div>
          <div>
            <p className="text-sm md:text-base font-black text-slate-900 uppercase tracking-tight">
              {kegiatan?.author || "Admin GGS"}
            </p>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <p className="text-[10px] md:text-xs text-slate-500 font-medium">
                Divisi Publikasi & Informasi
              </p>
            </div>
          </div>
        </div>

        <div className="px-4">
          <div
            className="prose prose-slate sm:prose-base md:prose-lg max-w-3xl mx-auto prose-img:rounded-xl prose-a:text-emerald-600"
            dangerouslySetInnerHTML={{
              __html:
                cleanContent ||
                "<p class='text-slate-400 italic text-center'>Belum ada isi berita...</p>",
            }}
          />
        </div>
      </article>

      <section className="sticky bottom-0 md:top-0 z-30 bg-white/90 backdrop-blur-md border-t md:border-t-0 md:border-b border-slate-200 shadow-[0_-4px_6px_-1px_rgb(0,0,0,0.05)] md:shadow-none p-4 md:p-0">
        <StatistikKegiatan
          kegiatan={kegiatan}
          isLikedInitial={isLikedInitial}
        />
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {session ? (
          <CommentForm
            initialComments={kegiatan.comments}
            session={session}
            kegiatanId={kegiatan.id}
          />
        ) : (
          <div className="bg-slate-50 p-6 rounded-2xl border border-dashed border-slate-200 text-center mb-12">
            <p className="text-sm text-slate-500 font-medium">
              Silakan{" "}
              <Link
                href="/login"
                className="text-emerald-600 font-bold hover:underline"
              >
                Login
              </Link>{" "}
              untuk ikut berdiskusi.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
