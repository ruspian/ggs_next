"use client";

import React from "react";
import { WorkflowBuilderCard } from "./ui/workflow-builder-card";
import Pagination from "./Pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SemuaKegiatan = ({ kegiatanData, pagination }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const route = useRouter();

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams);

    // atur parameter halaman sesuai dengan halaman baru
    params.set("page", newPage.toString());

    // perbarui URL
    route.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="">
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

      {/* pagination */}
      <div className="py-4 px-12 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
        <p className="text-xs text-slate-500">Total: {pagination.totalItems}</p>
        <div className="flex gap-2">
          <button
            className="px-3 py-1 border border-slate-200 rounded bg-white text-xs disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            disabled={pagination.currentPage === 1 || isPending}
            onClick={() => handlePageChange(pagination.currentPage - 1)}
          >
            Sebelumnya
          </button>
          <button
            disabled={
              Number(pagination.currentPage) ===
                Number(pagination.totalPages) || isPending
            }
            onClick={() => handlePageChange(pagination.currentPage + 1)}
            className="px-3 py-1 border border-slate-200 rounded bg-white text-xs disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            Selanjutnya
          </button>
        </div>
      </div>
    </div>
  );
};

export default SemuaKegiatan;
