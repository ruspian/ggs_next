import { Plus, ShieldAlert, Trash2 } from "lucide-react";
import React from "react";

const SettingKelolaUser = ({ admins }) => {
  return (
    <div className="p-8 space-y-6 animate-in slide-in-from-bottom-2 duration-300">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-bold text-lg text-slate-800">Akses Pengelola</h3>
          <p className="text-xs text-slate-500">
            Daftar akun yang dapat mengelola dashboard ini.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-800 transition-all">
          <Plus size={14} /> Tambah Admin
        </button>
      </div>

      <div className="space-y-3">
        {admins.map((adm) => (
          <div
            key={adm.id}
            className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-emerald-200 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-slate-200 text-slate-400 shadow-sm font-bold">
                {adm.name.charAt(0)}
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800">{adm.name}</h4>
                <p className="text-[11px] text-slate-500 font-medium">
                  {adm.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <select className="bg-white border border-slate-200 text-[11px] font-bold px-3 py-1.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer">
                <option selected={adm.role === "Super Admin"}>
                  Super Admin
                </option>
                <option selected={adm.role === "Editor"}>Editor</option>
                <option selected={adm.role === "Viewer"}>Viewer</option>
              </select>
              <button className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl flex gap-3">
        <ShieldAlert className="text-amber-600 shrink-0" size={20} />
        <p className="text-[11px] text-amber-800 leading-relaxed italic">
          <strong>Informasi Peran:</strong> Peran <b>Super Admin</b> memiliki
          akses penuh ke sistem. Gunakan peran <b>Editor</b> untuk tim yang
          hanya bertugas mengelola berita kegiatan.
        </p>
      </div>
    </div>
  );
};

export default SettingKelolaUser;
