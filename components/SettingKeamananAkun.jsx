import { EditPassword } from "@/lib/action";
import { useToaster } from "@/providers/ToastProvider";
import { Save } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SettingKeamananAkun = () => {
  const { data: session } = useSession();

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toast = useToaster();
  const router = useRouter();

  const handleChangeInput = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onsubmit = async (event) => {
    event.preventDefault();

    if (
      !formData.currentPassword ||
      !formData.newPassword ||
      !formData.confirmPassword
    ) {
      return toast.current.show({
        title: "Peringatan",
        message: "Semua kolom wajib diisi!",
        variant: "error",
        position: "top-right",
        duration: 5000,
      });
    }

    if (formData.newPassword.length < 8) {
      return toast.current.show({
        title: "Peringatan",
        message: "Password baru minimal 6 karakter!",
        variant: "error",
        position: "top-right",
        duration: 5000,
      });
    }

    if (formData.newPassword !== formData.confirmPassword) {
      return toast.current.show({
        title: "Peringatan",
        message: "Password baru dan konfirmasi password harus sama!",
        variant: "error",
        position: "top-right",
        duration: 5000,
      });
    }

    try {
      setIsSubmitting(true);

      const result = await EditPassword({
        id: session?.user?.id,
        ...formData,
      });

      if (!result.success) {
        throw new Error(result.message);
      }

      toast.current.show({
        title: "Berhasil!",
        message: result.message,
        variant: "success",
        position: "top-right",
        duration: 5000,
      });

      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      router.refresh();
    } catch (error) {
      toast.current.show({
        title: "Gagal",
        message: error.message,
        variant: "error",
        position: "top-right",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8 space-y-6 animate-in slide-in-from-bottom-2 duration-300">
      <form onSubmit={onsubmit}>
        <div className="max-w-md space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">
              Password Saat Ini
            </label>
            <input
              value={formData.currentPassword}
              onChange={(e) =>
                handleChangeInput("currentPassword", e.target.value)
              }
              name="currentPassword"
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">
              Password Baru
            </label>
            <input
              value={formData.newPassword}
              onChange={(e) => handleChangeInput("newPassword", e.target.value)}
              name="newPassword"
              type="password"
              placeholder="Min. 8 karakter"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">
              Konfirmasi Password
            </label>
            <input
              value={formData.confirmPassword}
              onChange={(e) =>
                handleChangeInput("confirmPassword", e.target.value)
              }
              name="confirmPassword"
              type="password"
              placeholder="Konfirmasi Password"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none"
            />
          </div>

          <button
            disabled={isSubmitting}
            type="submit"
            className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-emerald-900/20 active:scale-95 mt-4 disabled:bg-emerald-600/50 disabled:cursor-not-allowed"
          >
            <Save size={18} /> Simpan
          </button>
        </div>
      </form>

      <div className="space-y-2 text-[11px] text-slate-500 bg-slate-50 p-4 rounded-xl border border-slate-100">
        Sangat disarankan untuk mengganti password secara berkala untuk menjaga
        keamanan data organisasi.
      </div>
    </div>
  );
};

export default SettingKeamananAkun;
