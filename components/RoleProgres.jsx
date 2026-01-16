import { cn } from "@/lib/utils";

export default function RoleProgress({ label, count, total }) {
  const percentage = total > 0 ? (count / total) * 100 : 0;

  // Mapping warna berdasarkan label
  const colors = {
    Pendiri: "bg-blue-500",
    Anggota: "bg-emerald-500",
    Relawan: "bg-amber-500",
    Kontributor: "bg-rose-500",
  };

  const activeColor = colors[label] || "bg-slate-400";

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[11px] font-bold text-slate-600 uppercase">
        <span>{label}</span>
        <span className="text-slate-400">{count}</span>
      </div>
      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-1000",
            activeColor
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
