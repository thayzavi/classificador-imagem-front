"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  const handleLogout = () => {
    router.push("/sign-in");
  };

  return (
    <>
      {/* DESKTOP */}
      <aside
        className="
          hidden
          md:flex
          w-[220px]
          min-h-screen
          bg-gradient-to-b
          from-[#00C9A7]
          via-[#0891B2]
          to-[#1565F0]
          flex-col
          px-4
          py-6
          shadow-2xl
        "
      >
        {/* Logo */}
        <div className="flex justify-center">
          <Logo />
        </div>

        {/* Usuário */}
        {showUser && (
          <div
            className="
              mt-8
              rounded-2xl
              bg-white/10
              backdrop-blur-sm
              border
              border-white/10
              p-3
            "
          >
            <div className="flex items-center gap-3">
              <div
                className="
                  w-11
                  h-11
                  rounded-full
                  bg-white/15
                  flex
                  items-center
                  justify-center
                "
              >
                <User size={20} className="text-white" />
              </div>

              <div>
                <p className="text-white font-semibold text-sm">
                  Olá, {userName}
                </p>

                <Link
                  href="/perfil"
                  className="
                    text-xs
                    text-white/75
                    hover:text-white
                  "
                >
                  Ver perfil
                </Link>
              </div>
            </div>
          </div>
        )}

        <div className="flex-1" />

        <div className="space-y-4">
          {showLogout && (
            <button
              onClick={handleLogout}
              className="
                w-full
                flex
                items-center
                gap-2
                rounded-xl
                px-3
                py-2
                bg-red-500/10
                border
                border-red-400/20
                text-red-100
                hover:bg-red-500/20
                transition
              "
            >
              <LogOut size={18} />

              <span className="text-sm font-medium">
                Sair
              </span>
            </button>
          )}

          {showVersion && (
            <div className="text-center">
              <span className="text-xs text-white/70">
                Versão 1.0
              </span>
            </div>
          )}
        </div>
      </aside>

      {/* MOBILE */}
      <div
        className="
          md:hidden
          fixed
          bottom-0
          left-0
          right-0
          z-50
          bg-gradient-to-r
          from-[#00C9A7]
          via-[#0891B2]
          to-[#1565F0]
          shadow-2xl
          border-t
          border-white/10
        "
      >
        <div className="flex items-center justify-around py-3">
          {showUser && (
            <Link
              href="/perfil"
              className="
                flex
                flex-col
                items-center
                gap-1
                text-white
              "
            >
              <User size={22} />
              <span className="text-xs">
                Perfil
              </span>
            </Link>
          )}

          {showLogout && (
            <button
              onClick={handleLogout}
              className="
                flex
                flex-col
                items-center
                gap-1
                text-white
              "
            >
              <LogOut size={22} />
              <span className="text-xs">
                Sair
              </span>
            </button>
          )}
        </div>
      </div>
    </>
  );
}