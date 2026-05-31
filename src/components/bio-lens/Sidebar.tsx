"use client";

import Link from "next/link";
import { Logo } from "./Logo";
import { User, LogOut } from "lucide-react";

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
  showLogout = false,
}: SidebarProps) {
  return (
    <aside
      className="
        w-[72px]
        md:w-[200px]
        min-h-screen
        bg-gradient-to-b
        from-[#00C9A7]
        via-[#0891B2]
        to-[#1565F0]
        flex
        flex-col
        px-2
        md:px-4
        py-6
        relative
        shadow-2xl
        transition-all
        duration-300
      "
    >
      {/* Logo */}
      <div className="flex flex-col items-center">
        <Logo />
      </div>

      {/* Usuário */}
      {showUser && userName && (
        <div
          className="
            mt-8
            rounded-2xl
            bg-white/10
            backdrop-blur-sm
            border
            border-white/10
            p-2
            md:p-3
          "
        >
          <div className="flex items-center justify-center md:justify-start gap-3">
            <div
              className="
                w-10
                h-10
                md:w-11
                md:h-11
                rounded-full
                bg-white/15
                flex
                items-center
                justify-center
                shrink-0
              "
            >
              <User
                size={20}
                className="text-white"
              />
            </div>

            <div className="hidden md:block">
              <p className="text-white font-semibold text-sm">
                Olá, {userName}
              </p>

              <Link
                href="/perfil"
                className="
                  text-xs
                  text-white/75
                  hover:text-white
                  transition-colors
                "
              >
                Ver perfil
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Espaço livre */}
      <div className="flex-1" />

      {/* Rodapé */}
      <div className="space-y-4">
        {showLogout && (
          <Link
            href="/login"
            className="
              flex
              items-center
              justify-center
              md:justify-start
              gap-2
              rounded-xl
              px-2
              md:px-3
              py-2
              bg-red-500/10
              border
              border-red-400/20
              text-red-100
              hover:bg-red-500/20
              transition-all
              duration-200
            "
          >
            <LogOut size={18} />

            <span className="hidden md:inline text-sm font-medium">
              Sair
            </span>
          </Link>
        )}

        {showVersion && (
          <div className="text-center">
            <span className="hidden md:inline text-xs text-white/70">
              Versão 1.0
            </span>

            <span className="md:hidden text-[10px] text-white/60">
              v1
            </span>
          </div>
        )}
      </div>
    </aside>
  );
}