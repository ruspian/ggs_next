export default function robots() {
  const baseUrl = "https://ggs-next.vercel.app";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      //  blokir robot Google agar tidak mencoba mengindeks halaman dashboard admin
      disallow: ["/admin/", "/login"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
