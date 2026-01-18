import { prisma } from "@/lib/prisma";
import Image from "next/image";
import {
  Eye,
  Heart,
  MessageCircle,
  Calendar,
  MapPin,
  ArrowLeft,
  Share2,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { sanitizeHtml } from "@/lib/protectDangerouslySetInnerHTML";
import { auth } from "@/lib/auth";
import { UpdateViews } from "@/lib/action";
import CommentForm from "@/components/CommentForm";

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
          likedBy: true,
          comments: true,
        },
      },
      comments: {
        include: {
          user: true,
        },
      },
    },
  });

  //   tambahkan view setiap user melihat kegiatan
  if (userId) {
    UpdateViews(id, userId).catch((error) => console.log(error));
  }

  const cleanContent = sanitizeHtml(kegiatan?.content);

  if (!kegiatan) return notFound();

  return (
    <main className="min-h-screen bg-white pb-20">
      {/* gambar */}
      <section className="relative h-[60vh] md:h-[75vh] w-full overflow-hidden">
        <Image
          src={kegiatan.image || "/placeholder-kegiatan.jpg"}
          alt={kegiatan.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/20 to-transparent" />

        {/* Konten di atas Gambar */}
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-20 text-white">
          <div className="max-w-4xl space-y-4">
            <Link
              href="/kegiatan"
              className="inline-flex items-center gap-2 text-emerald-400 font-bold text-sm hover:underline mb-4"
            >
              <ArrowLeft size={18} /> Kembali ke Kegiatan
            </Link>
            <h1 className="text-3xl md:text-6xl font-black leading-tight tracking-tighter">
              {kegiatan.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 pt-4 text-sm md:text-base font-medium text-slate-200">
              <span className="flex items-center gap-2">
                <Calendar size={18} className="text-emerald-500" />{" "}
                {new Date(kegiatan.date).toLocaleDateString("id-ID", {
                  dateStyle: "long",
                })}
              </span>
              <span className="flex items-center gap-2">
                <MapPin size={18} className="text-emerald-500" />{" "}
                {kegiatan.lokasi}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* statistik dan bagikan */}
      <section className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-6 text-slate-600">
            <div className="flex items-center gap-1.5 font-bold">
              <Eye size={20} className="text-blue-500" />
              <span>{kegiatan.views || 0}</span>
            </div>
            <button className="flex items-center gap-1.5 font-bold hover:text-rose-500 transition-colors">
              <Heart size={20} className="text-rose-500" />
              <span>{kegiatan._count.likedBy}</span>
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
      </section>

      {/* konten artikel */}
      <article className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex items-center gap-4 mb-10 pb-10 border-b border-slate-100">
          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center font-bold text-emerald-700">
            {kegiatan.author.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-black text-slate-900 uppercase">
              {kegiatan.author}
            </p>
            <p className="text-xs text-slate-500 font-medium">
              Divisi Publikasi & Informasi
            </p>
          </div>
        </div>

        <div className="mt-12 flex gap-2">
          <span className="px-4 py-1.5 bg-slate-50 text-slate-500 rounded-full text-xs font-bold uppercase tracking-widest border border-slate-100">
            {kegiatan.kategori}
          </span>
        </div>

        <div className="prose prose-lg prose-emerald max-w-none text-slate-700 leading-relaxed font-medium">
          <div
            className=""
            dangerouslySetInnerHTML={{ __html: cleanContent }}
          />
        </div>
      </article>

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
