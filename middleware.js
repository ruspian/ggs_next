import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  // Ambil data session/token langsung dari req.auth
  const session = req.auth;
  const { nextUrl } = req;

  const isLoggedIn = !!session;
  const isAdminPage = nextUrl.pathname.startsWith("/admin");

  // Jika akses halaman admin tapi belum login
  if (isAdminPage && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  //   jika sudah login tapi mengakses halaman login
  if (isLoggedIn && nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  // Jika sudah login tapi bukan Admin
  if (isAdminPage && session?.user?.role !== "Admin") {
    // Arahkan ke beranda jika mereka bukan admin
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  return NextResponse.next();
});

// Tentukan rute mana saja yang harus melewati filter ini
export const config = {
  matcher: ["/admin/:path*"],
};
