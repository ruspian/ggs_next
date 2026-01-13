"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, createContext, useContext, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Menu,
  X,
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import { signOut } from "next-auth/react";

//  DAFTAR MENU
const ADMIN_MENU = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: <LayoutDashboard size={24} />,
  },
  { label: "Anggota", href: "/admin/anggota", icon: <Users size={24} /> },
  { label: "Kegiatan", href: "/admin/kegiatan", icon: <FileText size={24} /> },
  {
    label: "Pengaturan",
    href: "/admin/settings",
    icon: <Settings size={24} />,
  },
];

const SidebarContext = createContext(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context)
    throw new Error("useSidebar harus digunakan dalam SidebarProvider");
  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}) => {
  const [openState, setOpenState] = useState(true);
  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({ children, open, setOpen, animate }) => (
  <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
    {children}
  </SidebarProvider>
);

export const SidebarBody = (props) => (
  <>
    <DesktopSidebar {...props} />
    <MobileSidebar {...props} />
  </>
);

export const DesktopSidebar = ({ className, children, ...props }) => {
  const { open, animate } = useSidebar();
  return (
    <motion.div
      className={cn(
        "h-screen px-4 py-4 hidden md:flex md:flex-col bg-slate-900 text-white shrink-0 border-r border-slate-800 relative z-20",
        className
      )}
      animate={{ width: animate ? (open ? "280px" : "80px") : "280px" }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const MobileSidebar = ({ className, children, ...props }) => {
  const { open, setOpen } = useSidebar();

  return (
    <>
      <div
        className={cn(
          "h-16 px-6 flex md:hidden items-center justify-between bg-slate-900 border-b border-slate-800 w-full sticky top-0 z-30",
          className
        )}
      >
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="logo" width={32} height={32} />
          <span className="font-bold text-white tracking-wide">Desa</span>
        </div>
        <Menu
          className="text-slate-300 cursor-pointer"
          onClick={() => setOpen(!open)}
        />
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 md:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed inset-y-0 left-0 w-[85%] max-w-xs bg-slate-900 z-50 flex flex-col border-r border-slate-800 md:hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="text-emerald-500" size={24} />
                  <span className="font-bold text-white text-lg">
                    Menu Admin
                  </span>
                </div>
                <X
                  className="text-slate-400 cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </div>
              <div className="flex-1 overflow-y-auto p-4">{children}</div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export const SidebarLink = ({ className }) => {
  const { open, animate, setOpen } = useSidebar();
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(null);

  const closeMobile = useCallback(() => {
    if (window.innerWidth < 768) setOpen(false);
  }, [setOpen]);

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide">
        {/* BRANDING */}
        <div className="flex items-center gap-3 py-4 px-2 mb-6">
          <motion.div
            className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-emerald-900/20"
            animate={{ rotate: open ? 0 : 360 }}
          >
            <Image src="/logo.png" alt="logo" width={28} height={28} />
          </motion.div>
          {open && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h1 className="text-white text-lg font-bold">Desa</h1>
              <p className="text-slate-500 text-xs">Admin Panel</p>
            </motion.div>
          )}
        </div>

        {/* MENU LIST */}
        <div className="flex flex-col gap-1">
          {ADMIN_MENU.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                href={link.href}
                key={link.href}
                onClick={closeMobile}
                className={cn(
                  "flex items-center gap-4 py-3 px-3 rounded-xl transition-all mb-1",
                  isActive
                    ? "bg-emerald-600 text-white shadow-lg"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                )}
              >
                <span
                  className={cn(isActive ? "text-white" : "text-slate-400")}
                >
                  {link.icon}
                </span>
                {open && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm font-medium whitespace-nowrap"
                  >
                    {link.label}
                  </motion.span>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* LOGOUT */}
      <div className="pt-4 border-t border-slate-800">
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-500/10 transition-all group"
        >
          <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-red-500 transition-colors">
            <LogOut
              size={20}
              className="text-slate-400 group-hover:text-white"
            />
          </div>
          {open && (
            <div className="text-left">
              <p className="text-sm font-medium text-slate-200 group-hover:text-red-400">
                Keluar
              </p>
              <p className="text-[10px] text-slate-500 italic">Keluar</p>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};
