import React from "react";

const Pagination = ({ pagination, handlePageChange, isPending }) => {
  return (
    <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
      <p className="text-xs text-slate-500">
        Total {pagination.totalItems} anggota
      </p>
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
            Number(pagination.currentPage) === Number(pagination.totalPages) ||
            isPending
          }
          onClick={() => handlePageChange(pagination.currentPage + 1)}
          className="px-3 py-1 border border-slate-200 rounded bg-white text-xs disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          Selanjutnya
        </button>
      </div>
    </div>
  );
};

export default Pagination;
