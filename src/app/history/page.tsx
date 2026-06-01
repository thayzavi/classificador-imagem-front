"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Eye,
  ArrowLeft,
  Search,
  History,
} from "lucide-react";
import { Sidebar } from "@/components/bio-lens/Sidebar";

interface Analise {
  id: number;
  nomeBairro: string;
  localFoto: string;
  data: string;
  imagem: string;
  status: string;
}

export default function HistoricoPage() {
  const [analises, setAnalises] = useState<Analise[]>([]);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    const dados = JSON.parse(
      localStorage.getItem("analises") || "[]"
    );

    setAnalises(dados);
  }, []);

  const analisesFiltradas = analises.filter(
    (analise) =>
      analise.nomeBairro
        .toLowerCase()
        .includes(busca.toLowerCase()) ||
      analise.localFoto
        .toLowerCase()
        .includes(busca.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar showUser userName="Maria" showLogout />

      <main className="flex-1 p-4 md:p-6 lg:p-8">
        {/* Header */}
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

        {/* Banner */}
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
            <History
              size={28}
              className="shrink-0 mt-1"
            />

            <div>
              <h2 className="text-xl md:text-2xl font-bold">
                Histórico Completo
              </h2>

              <p className="text-white/90 text-sm md:text-base">
                Visualize e acompanhe todas as análises
                registradas no sistema.
              </p>
            </div>
          </div>

          <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10" />
        </div>

        {/* Busca */}
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

        {/* Lista */}
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
                    hover:shadow-xl
                    transition-all
                    cursor-pointer
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
                    {/* Conteúdo */}
                    <div
                      className="
                        flex
                        flex-col
                        sm:flex-row
                        gap-4
                      "
                    >
                      <img
                        src={analise.imagem}
                        alt="Imagem da análise"
                        className="
                          w-full
                          sm:w-40
                          h-48
                          sm:h-28
                          object-cover
                          rounded-2xl
                        "
                      />

                      <div>
                        <h2 className="font-bold text-lg text-slate-800">
                          {analise.localFoto}
                        </h2>

                        <p className="text-slate-500 mt-1">
                          {analise.data}
                        </p>

                        <p className="text-slate-500">
                          Bairro: {analise.nomeBairro}
                        </p>
                      </div>
                    </div>

                    {/* Ações */}
                    <div
                      className="
                        flex
                        flex-col
                        sm:flex-row
                        items-start
                        sm:items-center
                        gap-3
                      "
                    >
                      <span
                        className={`px-5 py-2 rounded-full text-sm font-semibold ${
                          analise.status === "Foco"
                            ? "bg-red-100 text-red-600"
                            : "bg-green-100 text-green-600"
                        }`}
                      >
                        {analise.status}
                      </span>

                      <div
                        className="
                          flex
                          items-center
                          gap-2
                          px-5
                          py-3
                          rounded-xl
                          text-white
                          font-medium
                          bg-gradient-to-r
                          from-[#00C9A7]
                          via-[#0891B2]
                          to-[#1565F0]
                        "
                      >
                        <Eye size={18} />
                        Ver detalhes
                      </div>
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