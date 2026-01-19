"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToaster } from "@/providers/ToastProvider";
import { signIn } from "next-auth/react";

export default function AuthDialog({ tampilan, text = "Masuk!" }) {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    password: "",
  });
  const [mode, setMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const toaster = useToaster();
  const toggleMode = () => {
    setMode(mode === "signup" ? "login" : "signup");
    setError("");
  };

  const togglePassword = () => setShowPassword(!showPassword);

  const onChangeForm = (name, value) => {
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      name: formData.nama,
      email: formData.email,
      password: formData.password,
    };

    try {
      if (mode === "signup") {
        const response = await fetch("/api/daftar", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Terjadi Kesalahan!");
          return;
        }

        toaster.current.show({
          title: "Pendaftaran Berhasil!",
          message: data.message || "Silahkan masuk untuk melanjutkan.",
          variant: "success",
          position: "top-right",
          duration: 5000,
        });
        setMode("login");
      } else {
        const res = await signIn("credentials", {
          redirect: false, // Jangan redirect otomatis biar bisa handle error
          email: formData.email,
          password: formData.password,
        });

        if (res?.error) {
          throw new Error("Email atau Password salah!");
        }

        toaster.current.show({
          title: "Login Berhasil!",
          message: "Selamat datang kembali!",
          variant: "success",
          position: "top-right",
          duration: 5000,
        });

        router.refresh(); // Refresh halaman biar session ke-update
        setIsOpen(false); // Tutup dialog
      }
    } catch (err) {
      toaster.current.show({
        title: "Terjadi Kesalahan!",
        message: err.message || "Coba lagi nanti.",
        variant: "error",
        position: "top-right",
        duration: 5000,
      });

      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className={`${tampilan} rounded-lg`}>
          {text}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md rounded-2xl!">
        <div className="flex flex-col items-center gap-2">
          <DialogHeader>
            <DialogTitle className="sm:text-center">
              {mode === "signup" ? "Daftar!" : "Masuk"}
            </DialogTitle>
            <DialogDescription className="sm:text-center">
              {mode === "signup"
                ? "Selamat Datang! Silahkan daftar untuk melanjutkan."
                : "Masukkan email dan password anda."}
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* error */}
        {error && (
          <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg text-center">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={onSubmitForm}>
          {mode === "signup" && (
            <div className="space-y-4">
              <div className="*:not-first:mt-2">
                <Label htmlFor="nama">Nama</Label>
                <Input
                  id="nama"
                  onChange={(e) => onChangeForm("nama", e.target.value)}
                  value={formData.nama}
                  placeholder="Otong Sur"
                  type="text"
                  required
                  className="rounded-lg"
                  disabled={loading}
                />
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div className="*:not-first:mt-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                onChange={(e) => onChangeForm("email", e.target.value)}
                value={formData.email}
                placeholder="otong@email.com"
                type="email"
                required
                className="rounded-lg"
                disabled={loading}
              />
            </div>
            <div className="relative">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                onChange={(e) => onChangeForm("password", e.target.value)}
                value={formData.password}
                placeholder="********"
                type={showPassword ? "text" : "password"}
                required
                className="rounded-lg pr-10"
                disabled={loading}
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute right-3 top-8 text-muted-foreground"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full rounded-lg"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : mode === "signup" ? (
              "Daftar Sekarang"
            ) : (
              "Masuk"
            )}
          </Button>
        </form>

        <div className="mt-2 text-center text-sm text-muted-foreground">
          {mode === "signup" ? (
            <>
              Sudah punya akun?{" "}
              <button className="underline" onClick={toggleMode}>
                Masuk!
              </button>
            </>
          ) : (
            <>
              Belum punya akun?{" "}
              <button className="underline" onClick={toggleMode}>
                Daftar!
              </button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
