"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  Save,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  ShieldCheck,
  ImageIcon,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { uploadToCloudinarySigned } from "@/lib/cloudinaryFunc";
import { useToaster } from "@/providers/ToastProvider";
import Image from "next/image";

const TambahAnggotaClient = () => {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    phone: "",
    jenisKelamin: "",
    alamat: "",
    image: "",
    jabatan: "",
    tanggalBergabung: "",
    status: "Aktif",
  });
  const [isUploading, setIsUploading] = useState(false);

  const toast = useToaster();

  const handleInputChange = (name, value) => {
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUploadImage = async (event) => {
    // ambil file yang diupload
    const file = event.target.files[0];

    // jika tidak ada file, keluar
    if (!file) return;

    // validasi ukuran file maksimal 1MB
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
      // upload foto ke cloudinary
      const url = await uploadToCloudinarySigned(file, "ggs", "image");

      // simpan url ke form data
      setFormData((prev) => ({
        ...prev,
        image: url,
      }));

      // jika berhasil
      toast.current.show({
        title: "Sukses!",
        message: "Gambar berhasil diunggah!",
        variant: "success",
        position: "top-right",
        duration: 5000,
      });
    } catch (error) {
      toast.current.show({
        title: "Error!",
        message: error.message || "Gagal mengunggah gambar!",
        variant: "error",
        position: "top-right",
        duration: 5000,
      });
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (!formData.nama || !formData.email) {
      return toast.current.show({
        title: "Peringatan",
        message: "Nama dan Email wajib diisi!",
        variant: "error",
      });
    }

    console.log("Form Data Submitted: ", formData);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* HEADER & NAVIGASI */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/anggota"
            className="p-2 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-emerald-600 hover:border-emerald-100 transition-all shadow-sm"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Tambah Anggota
            </h1>
            <p className="text-slate-500 text-sm font-medium">
              Lengkapi formulir untuk mendaftarkan anggota baru.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <form onSubmit={onSubmit} className="p-8 space-y-10">
          {/* INFORMASI PRIBADI */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 border-b border-slate-50 pb-2">
              <User className="text-emerald-600" size={18} />
              <h2 className="font-bold text-slate-800 uppercase tracking-wider text-xs">
                Informasi Pribadi
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  Nama Lengkap
                </label>
                <div className="relative">
                  <User
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    size={16}
                  />
                  <input
                    value={formData.nama}
                    onChange={(e) => handleInputChange("nama", e.target.value)}
                    type="text"
                    placeholder="Contoh: Arif Rahmansyah"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  Email
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    size={16}
                  />
                  <input
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    type="email"
                    placeholder="alamat@email.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  Nomor HP / WhatsApp
                </label>
                <div className="relative">
                  <Phone
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    size={16}
                  />
                  <input
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    type="text"
                    placeholder="+62 8..."
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  Jenis Kelamin
                </label>
                <select
                  value={formData.jenisKelamin}
                  onChange={(e) =>
                    handleInputChange("jenisKelamin", e.target.value)
                  }
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none cursor-pointer"
                >
                  <option value="">Pilih Jenis Kelamin</option>
                  <option value="LakiLaki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-bold text-slate-700">
                  Alamat Lengkap
                </label>
                <div className="relative">
                  <MapPin
                    className="absolute left-3 top-3 text-slate-400"
                    size={16}
                  />
                  <textarea
                    value={formData.alamat}
                    onChange={(e) =>
                      handleInputChange("alamat", e.target.value)
                    }
                    rows="2"
                    placeholder="Jl. Merdeka No. 1, Kel. ..., Kec. ..."
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none"
                  />
                </div>
              </div>

              <div className="group relative h-72 w-full bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center transition-all hover:bg-emerald-50/50 hover:border-emerald-300 cursor-pointer overflow-hidden">
                {formData.image ? (
                  <Image
                    src={formData.image}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
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
                  onChange={handleUploadImage}
                  name="image"
                  type="file"
                  accept="image/*"
                  className="absolute z-10 inset-0 opacity-0 cursor-pointer"
                  disabled={isUploading}
                />
              </div>
            </div>
          </div>

          {/* DETAIL ORGANISASI */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 border-b border-slate-50 pb-2">
              <Briefcase className="text-emerald-600" size={18} />
              <h2 className="font-bold text-slate-800 uppercase tracking-wider text-xs">
                Keanggotaan & Peran
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  Posisi / Jabatan
                </label>
                <select
                  value={formData.jabatan}
                  onChange={(e) => handleInputChange("jabatan", e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none cursor-pointer"
                >
                  <option value="">Pilih Jabatan</option>
                  <option value="Relawan">Relawan</option>
                  <option value="Anggota">Anggota Tetap</option>
                  <option value="Koordinator">Koordinator Lapangan</option>
                  <option value="Pengurus">Pengurus Inti</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  Tanggal Bergabung
                </label>
                <div className="relative">
                  <Calendar
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    size={16}
                  />
                  <input
                    value={formData.tanggalBergabung}
                    onChange={(e) =>
                      handleInputChange("tanggalBergabung", e.target.value)
                    }
                    type="date"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  Status Keanggotaan
                </label>
                <div className="flex items-center gap-4 py-2">
                  {["Aktif", "Pending"].map((status) => (
                    <label
                      key={status}
                      className="flex items-center gap-2 cursor-pointer group"
                    >
                      <input
                        type="radio"
                        name="status"
                        value={status}
                        checked={formData.status === status}
                        onChange={(e) =>
                          handleInputChange("status", e.target.value)
                        }
                        className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">
                        {status}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* FOOTER ACTIONS */}
          <div className="pt-8 border-t border-slate-50 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-400 italic">
              <ShieldCheck size={14} />
              Data akan tersimpan secara aman di sistem GGS.
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <Link
                href="/admin/anggota"
                className="flex-1 md:flex-none text-center px-8 py-3 bg-slate-50 text-slate-500 font-bold rounded-xl text-sm hover:bg-slate-100 transition-all"
              >
                Batal
              </Link>
              <button
                type="submit"
                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-3 bg-emerald-600 text-white font-bold rounded-xl text-sm shadow-lg shadow-emerald-900/20 hover:bg-emerald-700 active:scale-95 transition-all"
              >
                <Save size={18} />
                Simpan Anggota
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TambahAnggotaClient;
