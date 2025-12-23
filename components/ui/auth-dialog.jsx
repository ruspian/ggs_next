"use client";

import { useState, useId } from "react";
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
import { Eye, EyeOff } from "lucide-react";

export default function AuthDialog() {
  const [mode, setMode] = useState("signup");
  const [showPassword, setShowPassword] = useState(false);
  const id = useId();

  const toggleMode = () => setMode(mode === "signup" ? "login" : "signup");
  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-lg">
          Daftar!
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
                : "Masukkan email dan password Anda untuk masuk."}
            </DialogDescription>
          </DialogHeader>
        </div>

        <form className="space-y-4">
          {mode === "signup" && (
            <div className="space-y-4">
              <div className="*:not-first:mt-2">
                <Label htmlFor={`${id}-name`}>Nama</Label>
                <Input
                  id={`${id}-name`}
                  placeholder="Otong Sur"
                  type="text"
                  required
                  className="rounded-lg"
                />
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div className="*:not-first:mt-2">
              <Label htmlFor={`${id}-email`}>Email</Label>
              <Input
                id={`${id}-email`}
                placeholder="otong@email.com"
                type="email"
                required
                className="rounded-lg"
              />
            </div>
            <div className="relative">
              <Label htmlFor={`${id}-password`}>Password</Label>
              <Input
                id={`${id}-password`}
                placeholder="********"
                type={showPassword ? "text" : "password"}
                required
                className="rounded-lg pr-10"
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

          <Button type="button" className="w-full rounded-lg">
            {mode === "signup" ? "Daftar" : "Masuk"}
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
