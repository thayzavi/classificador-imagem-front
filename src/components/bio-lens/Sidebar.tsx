"use client";

import { Logo } from "./Logo";
import Link from "next/link";

interface SidebarProps {
  showUser?: boolean;
  userName?: string;
  showVersion?: boolean;
  showLogout?: boolean;
}

export function Sidebar({ 
  showUser = false, 
  userName = "", 
  showVersion = false,
  showLogout = false 
}: SidebarProps) {
  return (
    <aside className="w-[200px] min-h-screen bg-[#00C9A7] flex flex-col items-center py-8 relative">
      <Logo />
      
      {showUser && userName && (
        <div className="mt-6 flex items-center gap-2 text-white">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">Olá, {userName}</span>
            <Link href="/perfil" className="text-xs text-white/70 hover:text-white/90 transition-colors">
              Ver perfil
            </Link>
          </div>
        </div>
      )}

      {showLogout && (
        <Link 
          href="/login" 
          className="absolute bottom-6 left-4 flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors text-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Sair do aplicativo
        </Link>
      )}

      {showVersion && (
        <span className="absolute bottom-6 left-4 text-white/50 text-sm">V 1.0</span>
      )}
    </aside>
  );
}
