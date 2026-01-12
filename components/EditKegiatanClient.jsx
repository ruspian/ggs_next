"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  Save,
  Image as ImageIcon,
  Calendar,
  MapPin,
  Tag,
  Eye,
  FileText,
  Trash2,
  Loader2,
  Globe,
} from "lucide-react";
import Link from "next/link";
import TiptapEditor from "@/components/TiptapEditor";
import {
  deleteFromCloudinary,
  uploadToCloudinarySigned,
} from "@/lib/cloudinaryFunc";
import { useToaster } from "@/providers/ToastProvider";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PratinjauKegiatan } from "@/components/PratinjauKegiatan";
import { formatTanggalEditInput } from "@/lib/formatTanggal";

export default function EditKegiatanClient({ kegiatan }) {
  const [formData, setFormData] = useState({
    title: kegiatan.title,
    content: kegiatan.content,
    date: formatTanggalEditInput(kegiatan.date),
    location: kegiatan.lokasi,
    category: kegiatan.kategori,
    image: kegiatan.image,
    status: kegiatan.statusPublish,
  });
  const [isUploading, setIsUploading] = useState(false);
  const [isImageDeleting, setIsImageDeleting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toast = useToaster();
  const router = useRouter();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleContentChange = (html) => {
    setFormData((prev) => ({
      ...prev,
      content: html,
    }));
  };

  const handleUplaoadImage = async (event) => {
    const file = event.target.files[0];

    if (!file) return;

    if (file.size > 1 * 1024 * 1024) {
      toast.current.show({
        title: "File Terlalu Besar",
        message: "Ukuran gambar maksimal adalah 1MB",
        variant: "error",
        position: "top-right",
        duration: 5000,
      });
      return;
    }

    try {
      setIsUploading(true);

      const url = await uploadToCloudinarySigned(file, "ggs", "image");

      setFormData((prev) => ({
        ...prev,
        image: url,
      }));

      toast.current.show({
        title: "Berhasil!",
        message: "Gambar berhasil diupload!",
        variant: "success",
        position: "top-right",
        duration: 5000,
      });
    } catch (error) {
      toast.current.show({
        title: "Gagal!",
        message: error.message || "Gagal mengupload gambar!",
        variant: "error",
        position: "top-right",
        duration: 5000,
      });
    } finally {
      setIsUploading(false);
    }
  };

  // fungsi untuk menghandle hapus gambar dari cloudinary
  const handleDeleteImage = async () => {
    if (!formData.image) return;

    setIsImageDeleting(true);

    try {
      const success = await deleteFromCloudinary(formData.image, "image");

      if (success) {
        setFormData((prev) => ({
          ...prev,
          image: "",
        }));

        toast.current.show({
          title: "Berhasil!",
          message: "Gambar berhasil dihapus!",
          variant: "success",
          position: "top-right",
          duration: 5000,
        });
      } else {
        throw new Error("Gagal menghapus gambar!");
      }
    } catch (error) {
      toast.current.show({
        title: "Error!",
        message: error.message || "Gagal menghapus gambar!",
        variant: "error",
        position: "top-right",
        duration: 5000,
      });
    } finally {
      setIsImageDeleting(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.title) {
      return toast.current.show({
        title: "Peringatan",
        message: "Judul wajib diisi!",
        variant: "error",
        position: "top-right",
        duration: 5000,
      });
    }

    try {
      const response = await fetch(`/api/kegiatan/${kegiatan.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Gagal menyimpan data kegiatan!");
      }

      toast.current.show({
        title: "Berhasil!",
        message: "Data kegiatan berhasil disimpan!",
        variant: "success",
        position: "top-right",
        duration: 5000,
      });

      router.push("/admin/kegiatan");
    } catch (error) {
      toast.current.show({
        title: "Gagal!",
        message: error.message || "Gagal menyimpan data kegiatan!",
        variant: "error",
        position: "top-right",
        duration: 5000,
      });
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12 animate-in fade-in duration-500">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/kegiatan"
            className="p-2 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-emerald-600 transition-all shadow-sm"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Post Berita Kegiatan
            </h1>
            <p className="text-slate-500 text-sm">
              Publikasikan dokumentasi kegiatan Gorontalo Green School.
            </p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 text-slate-600 font-bold text-sm hover:bg-slate-100 rounded-xl transition-all"
          >
            <Eye size={18} /> Pratinjau
          </button>
          <button
            type="submit"
            form="form-kegiatan"
            className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-sm shadow-lg shadow-emerald-900/20 hover:bg-emerald-700 active:scale-95 transition-all"
          >
            <Save size={18} /> Publish Berita
          </button>
        </div>
      </div>

      {isOpen && (
        <PratinjauKegiatan
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          data={formData}
        />
      )}
      <form
        id="form-kegiatan"
        onSubmit={handleSubmit}
        className="p-8 space-y-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/*  EDITOR */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-8">
              {/* Input Judul */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                  Judul Berita
                </label>
                <input
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  type="text"
                  placeholder="Masukkan judul yang menarik..."
                  className="w-full text-3xl font-extrabold text-slate-900 placeholder:text-slate-200 border-none focus:ring-0 p-0 outline-none"
                />
              </div>

              {/* Upload gambar */}
              <div className="group relative h-72 w-full bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center transition-all hover:bg-emerald-50/50 hover:border-emerald-300 cursor-pointer overflow-hidden">
                {formData.image ? (
                  <>
                    <Image
                      src={formData.image}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />

                    {isImageDeleting ? (
                      <div className="absolute z-30 top-3 right-3 p-2 bg-white rounded-full text-red-600 shadow-md cursor-not-allowed">
                        <Loader2 className="animate-spin" size={20} />
                      </div>
                    ) : (
                      <Trash2
                        className="absolute z-30 top-3 right-3 p-2 bg-white rounded-full text-red-600 hover:bg-red-100 shadow-md cursor-pointer"
                        size={35}
                        onClick={handleDeleteImage}
                      />
                    )}
                  </>
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="p-4 bg-white rounded-2xl shadow-sm text-emerald-600 mb-3 group-hover:scale-110 transition-transform">
                      {isUploading ? (
                        <Loader2 className="animate-spin" size={32} />
                      ) : (
                        <ImageIcon size={32} />
                      )}
                    </div>
                    <p className="text-sm font-bold text-slate-600">
                      {isUploading
                        ? "Sedang mengunggah..."
                        : "Klik untuk upload foto"}
                    </p>
                  </div>
                )}
                <input
                  onChange={handleUplaoadImage}
                  type="file"
                  disabled={isUploading}
                  accept="image/*"
                  className="absolute z-10 inset-0 opacity-0 cursor-pointer"
                />
              </div>

              {/* TipTap Editor */}
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                  Isi Berita
                </label>
                <TiptapEditor
                  key={kegiatan.id}
                  onChange={handleContentChange}
                  content={formData.content}
                />
              </div>
            </div>
          </div>

          {/*  METADATA */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6 sticky top-6">
              <div className="flex items-center gap-2 border-b border-slate-50 pb-4">
                <FileText size={18} className="text-emerald-600" />
                <h3 className="font-bold text-slate-800">Detail Publikasi</h3>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">
                    Tanggal Kegiatan
                  </label>
                  <div className="relative">
                    <Calendar
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      size={16}
                    />
                    <input
                      value={formData.date}
                      onChange={(e) =>
                        handleInputChange("date", e.target.value)
                      }
                      type="date"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">
                    Lokasi Aksi
                  </label>
                  <div className="relative">
                    <MapPin
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      size={16}
                    />
                    <input
                      value={formData.location}
                      onChange={(e) =>
                        handleInputChange("location", e.target.value)
                      }
                      type="text"
                      placeholder="Contoh: Desa Torosiaje"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">
                    Kategori
                  </label>
                  <div className="relative">
                    <Tag
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      size={16}
                    />
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        handleInputChange("category", e.target.value)
                      }
                      name="category"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none cursor-pointer appearance-none"
                    >
                      <option value="">Pilih Kategori</option>
                      <option value="Konservasi">Konservasi</option>
                      <option value="Edukasi">Edukasi</option>
                      <option value="Aksi">Aksi Sosial</option>
                      <option value="Komunitas">Komunitas</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">
                    Status Publikasi
                  </label>
                  <div className="relative">
                    <Globe
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      size={16}
                    />
                    <select
                      value={formData.status}
                      onChange={(e) =>
                        handleInputChange("status", e.target.value)
                      }
                      name="status"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none cursor-pointer appearance-none"
                    >
                      <option value="">Pilih</option>
                      <option value="Published">Published</option>
                      <option value="Draft">Draft</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="pt-4 space-y-3">
                <Button
                  type="submit"
                  className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors md:hidden"
                >
                  Publish Sekarang
                </Button>
                <p className="text-[10px] text-slate-400 text-center italic">
                  Draft akan tersimpan otomatis secara lokal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
