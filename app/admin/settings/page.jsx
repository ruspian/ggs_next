export const dynamic = "force-dynamic";

import SettingClient from "@/components/SettingClient";
import { prisma } from "@/lib/prisma";

export default async function SettingsPage() {
  // data profil organisasi
  const profilOrganisasi = await prisma.about.findFirst();

  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });

  return <SettingClient profil={profilOrganisasi} admins={users} />;
}
