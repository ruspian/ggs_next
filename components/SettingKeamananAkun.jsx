import React from "react";

const SettingKeamananAkun = () => {
  return (
    <div className="p-8 space-y-6 animate-in slide-in-from-bottom-2 duration-300">
      <div className="max-w-md space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">
            Password Saat Ini
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">
            Password Baru
          </label>
          <input
            type="password"
            placeholder="Min. 8 karakter"
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none"
          />
        </div>
        <div className="space-y-2 text-[11px] text-slate-500 bg-slate-50 p-4 rounded-xl border border-slate-100">
          Sangat disarankan untuk mengganti password secara berkala untuk
          menjaga keamanan data organisasi.
        </div>
      </div>
    </div>
  );
};

export default SettingKeamananAkun;
