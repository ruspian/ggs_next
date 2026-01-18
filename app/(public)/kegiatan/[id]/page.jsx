import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { Calendar, MapPin, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { sanitizeHtml } from "@/lib/protectDangerouslySetInnerHTML";
import { auth } from "@/lib/auth";
import { UpdateViews } from "@/lib/action";
import CommentForm from "@/components/CommentForm";
import StatistikKegiatan from "@/components/StatistikKegiatan";
import { formatDateToDisplayID } from "@/lib/formatTanggal";

export default async function DetailKegiatanPage({ params }) {
  const { id } = await params;
  const session = await auth();
  const userId = session.user.id;

  // Mengambil data kegiatan lengkap dengan count likes & comments
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

  //   tambahkan view setiap user melihat kegiatan
  if (userId) {
    UpdateViews(id, userId).catch((error) => console.log(error));
  }

  const cleanContent = sanitizeHtml(kegiatan?.content);
  const isLikedInitial = kegiatan?.likes.length > 0;

  if (!kegiatan) return notFound();

  return (
    <main className="min-h-screen bg-white pb-20">
      <article className="p-8 md:p-16 space-y-8">
        {/* Header  */}
        <div className="space-y-4 text-center max-w-3xl mx-auto mt-10">
          <span className="px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-widest">
            {kegiatan.kategori}
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
            {kegiatan.title}
          </h1>
          <div className="flex items-center justify-center gap-6 text-slate-500 text-sm font-medium">
            <span>{formatDateToDisplayID(kegiatan.date)}</span>
            <span>•</span>
            <span>{kegiatan.lokasi}</span>
          </div>
        </div>

        {/* Image  */}
        {kegiatan.image && (
          <section className="flex justify-center w-full px-4 py-8">
            <div className="relative h-75 md:h-125 w-full max-w-250 rounded-[32px] overflow-hidden shadow-2xl ring-1 ring-slate-200">
              <Image
                src={kegiatan.image}
                alt={kegiatan.title}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                priority // Menambahkan priority karena ini gambar utama
              />
            </div>
          </section>
        )}

        <div className="flex items-center gap-4 mb-10 pb-10 border-b border-slate-100 max-w-3xl mx-auto">
          <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center font-bold text-emerald-700 shadow-sm border border-emerald-200">
            {/* Gunakan optional chaining untuk menghindari error charAt of undefined */}
            {kegiatan?.author?.charAt(0).toUpperCase() || "A"}
          </div>
          <div>
            <p className="text-sm font-black text-slate-900 uppercase tracking-tight">
              {kegiatan?.author || "Admin GGS"}
            </p>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <p className="text-xs text-slate-500 font-medium">
                Divisi Publikasi & Informasi
              </p>
            </div>
          </div>
        </div>

        {/* Content  */}
        <div
          className="prose prose-slate prose-lg max-w-3xl mx-auto"
          dangerouslySetInnerHTML={{
            __html:
              cleanContent ||
              "<p className='text-slate-400 italic'>Belum ada isi berita...</p>",
          }}
        />
      </article>

      {/* statistik dan bagikan */}
      <section className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100">
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
