import { prisma } from "@/lib/prisma";

export default async function sitemap() {
  const baseUrl = "https://ggs-next.vercel.app";

  const kegiatan = await prisma.kegiatan.findMany({
    where: {
      statusPublish: "Published",
    },
    select: {
      id: true,
      updatedAt: true,
    },
  });

  const kegiatanUrls = kegiatan.map((item) => ({
    url: `${baseUrl}/kegiatan/${item.id}`,
    lastModified: item.updatedAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const staticUrls = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/tentang`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/kegiatan`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  return [...staticUrls, ...kegiatanUrls];
}
