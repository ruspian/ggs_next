import { UpsertProfilOrganisasi } from "@/lib/action";
import {
  deleteFromCloudinary,
  uploadToCloudinarySigned,
} from "@/lib/cloudinaryFunc";
import { formatTanggalEditInput } from "@/lib/formatTanggal";
import { useToaster } from "@/providers/ToastProvider";
import {
  Calendar,
  Eye,
  Globe,
  Loader2,
  Mail,
  MapPin,
  NotebookPen,
  Phone,
  Plus,
  Save,
  Target,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const SettingProfilOrganisasi = ({ profil }) => {
  const [formData, setFormData] = useState({
    id: profil?.id || null,
    name: profil?.name || "",
    logo: profil?.logo || "",
    visi: profil?.visi || "",
    misi: profil?.misi || [""],
    about: profil?.about || "",
    tanggal: profil?.tanggal ? formatTanggalEditInput(profil?.tanggal) : "",
    alamat: profil?.alamat || "",
    email: profil?.email || "",
    telephone: profil?.telephone || "",
  });

  const [isUploading, setIsUploading] = useState(false);
  const [isImageDeleting, setIsImageDeleting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toast = useToaster();
  const router = useRouter();

  useEffect(() => {
    if (profil) {
      setFormData({
        id: profil.id || null,
        name: profil.name || "",
        logo: profil.logo || "",
        visi: profil.visi || "",
        misi: profil.misi || [""],
        about: profil.about || "",
        tanggal: profil.tanggal ? formatTanggalEditInput(profil.tanggal) : "",
        alamat: profil.alamat || "",
        email: profil.email || "",
        telephone: profil.telephone || "",
      });
    }
  }, [profil]); // Akan update formData setiap kali props 'profil' berubah

  // tamhah kolom misi
  const addMisi = () =>
    setFormData({ ...formData, misi: [...formData.misi, ""] });

  // hapus kolom misi
  const removeMisi = (index) => {
    const newMisi = [...formData.misi];
    newMisi.splice(index, 1);
    setFormData((prev) => ({
      ...prev,
      misi: newMisi,
    }));
  };

  // ubah kolom misi
  const handleMisiChange = (index, value) => {
    const newMisi = [...formData.misi];
    newMisi[index] = value;
    setFormData((prev) => ({
      ...prev,
      misi: newMisi,
    }));
  };

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //   upload gambar ke cloudinary
  const handleUploadImage = async (event) => {
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
        logo: url,
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
        message: "Gambar gagal diupload!",
        variant: "error",
        position: "top-right",
        duration: 5000,
      });
    } finally {
      setIsUploading(false);
    }
  };

  //   hapus gambar dari cloudinary
  const handleDeleteImage = async () => {
    if (!formData.logo) return;

    try {
      setIsImageDeleting(true);

      const success = await deleteFromCloudinary(formData.logo, "image");

      if (!success) {
        throw new Error("Gagal menghapus gambar!");
      }

      setFormData((prev) => ({
        ...prev,
        logo: "",
      }));

      toast.current.show({
        title: "Berhasil!",
        message: "Gambar berhasil dihapus!",
        variant: "success",
        position: "top-right",
        duration: 5000,
      });
    } catch (error) {
      toast.current.show({
        title: "Gagal!",
        message: "Gambar gagal dihapus!",
        variant: "error",
        position: "top-right",
        duration: 5000,
      });
    } finally {
      setIsImageDeleting(false);
    }
  };

  //   handle submit
  const onSubmit = async (event) => {
    event.preventDefault();

    if (!formData.name || !formData.about || !formData.visi || !formData.misi) {
      return toast.current.show({
        title: "Peringatan",
        message: "Semua kolom wajib diisi!",
        variant: "error",
        position: "top-right",
        duration: 5000,
      });
    }

    //     jika kolom misi ada yang kosong
    if (formData.misi.some((misi) => !misi)) {
      return toast.current.show({
        title: "Peringatan",
        message: "Semua kolom misi wajib diisi!",
        variant: "error",
        position: "top-right",
        duration: 5000,
      });
    }

    try {
      setIsSubmitting(true);

      const result = await UpsertProfilOrganisasi(formData);

      if (!result.success) {
        throw new Error(result.message);
      }

      toast.current.show({
        title: "Sukses!",
        message: "Data profil organisasi berhasil disimpan!",
        variant: "success",
        position: "top-right",
        duration: 5000,
      });

      router.refresh();
    } catch (error) {
      toast.current.show({
        title: "Gagal!",
        message: error.message || "Gagal menyimpan data profil organisasi!",
        variant: "error",
        position: "top-right",
        duration: 5000,
      });
    }
  };
  return (
    <div className="p-8 space-y-8 animate-in slide-in-from-bottom-2 duration-300">
      <form onSubmit={onSubmit}>
        <div className="flex items-center gap-6 pb-8 border-b border-slate-50">
          <div className="relative">
            <div className="w-24 h-24 bg-slate-100 rounded-3xl flex items-center justify-center border-2 border-dashed border-slate-200">
              {formData.logo ? (
                <>
                  <Image
                    src={formData.logo}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />

                  {isImageDeleting ? (
                    <div className="absolute z-30 bottom-0 right-0 bg-white p-2 rounded-full text-red-600 shadow-md cursor-not-allowed">
                      <Loader2 className="animate-spin" size={20} />
                    </div>
                  ) : (
                    <Trash2
                      className="absolute z-30 bottom-0 right-0 bg-white p-2 rounded-md text-red-600 hover:bg-red-100 shadow-md cursor-pointer"
                      size={35}
                      onClick={handleDeleteImage}
                    />
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="p-4 rounded-2xl text-emerald-600 group-hover:scale-110 transition-transform">
                    {isUploading ? (
                      <Loader2 className="animate-spin" size={32} />
                    ) : (
                      <Globe size={50} />
                    )}
                  </div>
                </div>
              )}
            </div>

            <input
              onChange={handleUploadImage}
              name="image"
              type="file"
              accept="image/*"
              className="absolute z-10 inset-0 opacity-0 cursor-pointer"
            />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-lg">
              Logo Organisasi
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Format PNG, JPG atau WEBP (Maks. 2MB)
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">
              Nama Resmi
            </label>
            <input
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              name="name"
              type="text"
              placeholder="Otong Surotong"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">
              Email Publik
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={16}
              />
              <input
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                name="email"
                type="email"
                placeholder="otongsur@gmail.com"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">
              WhatsApp / Telepon
            </label>
            <div className="relative">
              <Phone
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={16}
              />
              <input
                value={formData.telephone}
                onChange={(e) => handleInputChange("telephone", e.target.value)}
                name="telephone"
                type="text"
                placeholder="081234567890"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">
              Tanggal Didirikan
            </label>
            <div className="relative">
              <Calendar
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={16}
              />
              <input
                value={formData.tanggal}
                onChange={(e) => handleInputChange("tanggal", e.target.value)}
                name="tanggal"
                type="date"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none"
              />
            </div>
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-bold text-slate-700">
              Alamat Kantor
            </label>
            <div className="relative">
              <MapPin
                className="absolute left-3 top-3 text-slate-400"
                size={16}
              />
              <textarea
                value={formData.alamat}
                onChange={(e) => handleInputChange("alamat", e.target.value)}
                name="alamat"
                rows="3"
                placeholder="Masukkan alamat lengkap!"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none"
              />
            </div>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-bold text-slate-700">
              Tentang Organisasi
            </label>
            <div className="relative">
              <NotebookPen
                className="absolute left-3 top-3 text-slate-400"
                size={16}
              />
              <textarea
                value={formData.about}
                onChange={(e) => handleInputChange("about", e.target.value)}
                name="about"
                rows="3"
                placeholder="Tuliskan sesuatu!"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none"
              />
            </div>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-bold text-slate-700">Visi</label>
            <div className="relative">
              <Eye className="absolute left-3 top-3 text-slate-400" size={16} />
              <textarea
                value={formData.visi}
                onChange={(e) => handleInputChange("visi", e.target.value)}
                name="visi"
                rows="3"
                placeholder="Visi organisasi!"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none"
              />
            </div>
          </div>

          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-700">
                Misi Organisasi
              </label>
              <button
                onClick={addMisi}
                type="button"
                className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-emerald-600 hover:text-emerald-700"
              >
                <Plus size={14} /> Tambah Poin
              </button>
            </div>

            <div className="space-y-3">
              {formData.misi.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-2 animate-in fade-in slide-in-from-left-2 duration-200"
                >
                  <div className="relative flex-1">
                    <Target
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      size={16}
                    />
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => handleMisiChange(index, e.target.value)}
                      placeholder={`Poin misi ke-${index + 1}`}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                    />
                  </div>
                  {formData.misi.length > 1 && (
                    <button
                      onClick={() => removeMisi(index)}
                      className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-emerald-900/20 active:scale-95 mt-4"
          >
            <Save size={18} /> Simpan
          </button>
        </div>
      </form>
    </div>
  );
};

export default SettingProfilOrganisasi;
