import SettingClient from "@/components/SettingClient";
import { prisma } from "@/lib/prisma";

export default async function SettingsPage() {
  // data profil organisasi
  const profilOrganisasi = await prisma.about.findFirst();

  console.log("profil organisasi:", profilOrganisasi);

  // Data dummy user yang punya akses admin
  const admins = [
    {
      id: 1,
      name: "Admin Utama GGS",
      email: "admin@ggs.org",
      role: "Super Admin",
    },
    {
      id: 2,
      name: "Arif Rahmansyah",
      email: "arif.editor@ggs.org",
      role: "Editor",
    },
  ];

  return <SettingClient admins={admins} profil={profilOrganisasi} />;
}
