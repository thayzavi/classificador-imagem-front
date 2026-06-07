"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Eye, ArrowLeft, Search, History } from "lucide-react";

import { Sidebar } from "@/components/bio-lens/Sidebar";

interface Analise {
  id: string;
  bairro: string;
  local: string;
  resultado: string;
  imagem_url: string;
  confianca: number;
  data_foto: string;
}

interface UserProfile {
  nome: string;
}

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://api-classificador-img.onrender.com";

export default function HistoricoPage() {
  const [analises, setAnalises] = useState<Analise[]>([]);
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [userName, setUserName] = useState("Usuário");

  useEffect(() => {
    async function carregarHistorico() {
      try {
        setLoading(true);
        setErro("");

        const token = localStorage.getItem("token");

        if (!token) {
          setErro("Usuário não autenticado.");
          return;
        }

        // 👤 BUSCA PERFIL (NOME DINÂMICO)
        const profileRes = await fetch(`${API_URL}/user/perfil`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const profile: UserProfile = await profileRes.json();

        if (profileRes.ok) {
          setUserName(profile.nome);
        }

        // 📊 HISTÓRICO
        const response = await fetch(
          `${API_URL}/analysis/history`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error || data.msg || "Erro ao carregar histórico"
          );
        }

        setAnalises(data);
      } catch (error: unknown) {
        console.error(error);

        setErro(
          error instanceof Error
            ? error.message
            : "Erro ao carregar histórico"
        );
      } finally {
        setLoading(false);
      }
    }

    carregarHistorico();
  }, []);

  const analisesFiltradas = analises.filter(
    (analise) =>
      analise.bairro.toLowerCase().includes(busca.toLowerCase()) ||
      analise.local.toLowerCase().includes(busca.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Carregando histórico...
      </div>
    );
  }

  if (erro) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">{erro}</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* 👇 agora dinâmico */}
      <Sidebar showUser userName={userName} showLogout />

      <main className="flex-1 p-4 md:p-6 lg:p-8">
        {/* HEADER ORIGINAL */}
        <div className="flex items-start gap-4 mb-8">
          <Link
            href="/dashboard"
            className="
              flex
              items-center
              justify-center
              min-w-[44px]
              h-11
              rounded-full
              bg-white
              shadow-md
              hover:shadow-lg
              transition-all
            "
          >
            <ArrowLeft size={22} />
          </Link>

          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
              Histórico de Análises
            </h1>

            <p className="text-slate-500 text-sm md:text-base">
              Consulte todas as análises realizadas
            </p>
          </div>
        </div>

        {/* BANNER ORIGINAL */}
        <div
          className="
            relative
            overflow-hidden
            bg-gradient-to-r
            from-[#00C9A7]
            via-[#0891B2]
            to-[#1565F0]
            rounded-3xl
            p-5 md:p-6
            text-white
            shadow-xl
            mb-8
          "
        >
          <div className="flex items-start gap-3 relative z-10">
            <History size={28} className="shrink-0 mt-1" />

            <div>
              <h2 className="text-xl md:text-2xl font-bold">
                Histórico Completo
              </h2>

              <p className="text-white/90 text-sm md:text-base">
                Visualize e acompanhe todas as análises registradas no sistema.
              </p>
            </div>
          </div>

          <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10" />
        </div>

        {/* BUSCA ORIGINAL */}
        <div className="relative mb-8">
          <Search
            size={20}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-slate-400
            "
          />

          <input
            type="text"
            placeholder="Buscar por bairro ou local..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="
              w-full
              bg-white
              rounded-2xl
              border
              border-slate-200
              pl-12
              pr-4
              py-4
              shadow-sm
              focus:outline-none
              focus:ring-2
              focus:ring-[#0891B2]
            "
          />
        </div>

        {/* LISTA ORIGINAL */}
        {analisesFiltradas.length === 0 ? (
          <div
            className="
              bg-white
              rounded-3xl
              p-10 md:p-16
              shadow-md
              text-center
            "
          >
            <p className="text-slate-500 text-lg">
              Nenhuma análise encontrada.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {analisesFiltradas.map((analise) => (
              <Link
                key={analise.id}
                href={`/analysis-details/${analise.id}`}
              >
                <div
                  className="
                    bg-white
                    rounded-3xl
                    p-4 md:p-5
                    shadow-md
                    border
                    border-slate-100
                    hover:border-[#0891B2]
                    transition-all
                    cursor-pointer
                    pr-5
                    mb-2
                  "
                >
                  <div
                    className="
                      flex
                      flex-col
                      lg:flex-row
                      lg:items-center
                      lg:justify-between
                      gap-5
                    "
                  >
                    <div>
                      <div className="bg-white rounded-2xl p-4 flex gap-4">
                        <img
                          src={analise.imagem_url}
                          alt="Imagem analisada"
                          className="w-32 h-32 rounded-xl object-cover"
                        />

                        <div className="flex-1">
                          <h2 className="font-bold text-lg text-slate-800">
                            {analise.local}
                          </h2>

                          <p className="text-slate-500 mt-1">
                            {analise.data_foto}
                          </p>

                          <p className="text-slate-500">
                            Bairro: {analise.bairro}
                          </p>

                          <p className="text-slate-500">
                            Resultado: {analise.resultado}
                          </p>
                        </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 px-5 py-3 rounded-xl text-white font-medium bg-gradient-to-r from-[#00C9A7] via-[#0891B2] to-[#1565F0]">
                        <Eye size={18} />
                        Ver detalhes
                      </div>
                    </div>
                  </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}