"use client";

import React from "react";
import { WorkflowBuilderCard } from "./ui/workflow-builder-card";

const SemuaKegiatan = ({ kegiatanData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-10 pt-20 items-center justify-center bg-background p-4">
      {kegiatanData.length > 0 ? (
        kegiatanData.map((kegiatan) => (
          <React.Fragment key={kegiatan.id}>
            <WorkflowBuilderCard kegiatan={kegiatan} />
          </React.Fragment>
        ))
      ) : (
        <div className="col-span-4 text-center text-gray-500">
          Tidak ada kegiatan
        </div>
      )}
    </div>
  );
};

export default SemuaKegiatan;
