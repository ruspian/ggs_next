import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/providers/AuthProvider";
import { ToasterProvider } from "@/providers/ToastProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Gorontalo Green School | Pusat Aksi Lingkungan",
    template: "%s | Gorontalo Green School",
  },
  description:
    "Pusat aksi dan dokumentasi lingkungan GGS. Mari berkontribusi dan jadilah bagian dari perubahan untuk alam kita.",
  keywords: [
    "Gorontalo Green School",
    "GGS",
    "Lingkungan",
    "Gorontalo",
    "Penghijauan",
    "Sekolah Hijau",
    "Konservasi",
    "Edukasi Alam",
  ],
  authors: [{ name: "Gorontalo Green School" }],

  openGraph: {
    title: "Gorontalo Green School",
    description:
      "Mari berkontribusi dan jadilah bagian dari perubahan untuk alam kita di Gorontalo.",
    url: "https://ggs-next.vercel.app",
    siteName: "Gorontalo Green School",
    images: [
      {
        url: "/og-image-ggs.png",
        width: 1200,
        height: 630,
        alt: "Banner Gorontalo Green School",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="mx-auto max-w-screen flex justify-center">
          <AuthProvider>
            <ToasterProvider>{children}</ToasterProvider>
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
