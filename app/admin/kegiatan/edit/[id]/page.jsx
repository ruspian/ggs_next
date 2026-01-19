export const dynamic = "force-dynamic";

import EditKegiatanClient from "@/components/EditKegiatanClient";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditKegiatanPage({ params }) {
  const { id } = await params;

  if (!id) {
    return notFound();
  }

  const kegiatanEdit = await prisma.kegiatan.findUnique({
    where: { id },
  });

  return <EditKegiatanClient kegiatan={kegiatanEdit} />;
}
