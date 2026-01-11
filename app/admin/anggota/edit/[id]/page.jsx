import EditAnggotaClient from "@/components/EditAnggotaClient";
import React from "react";

const EditAnggotaPage = async ({ params }) => {
  const { id } = await params;

  const anggotaEdit = await prisma.jabatan.findUnique({
    where: { id },
  });

  return <EditAnggotaClient anggota={anggotaEdit} />;
};

export default EditAnggotaPage;
