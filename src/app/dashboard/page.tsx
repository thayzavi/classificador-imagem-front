"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Camera, History } from "lucide-react";
import { Sidebar } from "@/components/bio-lens/Sidebar";

interface Analise {
  id: number;
  nomeBairro: string;
  localFoto: string;
  data: string;
  imagem: string;
  status: string;
}

export default function DashboardPage() {
  const [analises, setAnalises] = useState<Analise[]>([]);

  useEffect(() => {
    const dados = JSON.parse(
      localStorage.getItem("analises") || "[]"
    );

    setAnalises(dados);
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar showUser userName="Maria" showLogout />

      <main className="flex-1 p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div
          className="
            flex
            flex-col
            sm:flex-row
            sm:items-center
            sm:justify-between
            gap-4
            mb-8
          "
        >
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
              Olá, Maria 👋
            </h1>

            <p className="text-slate-500 mt-1">
              Bem-vinda ao BioLens
            </p>
          </div>

          <Link
            href="/new-analysis"
            className="
              w-full
              sm:w-auto
              flex
              items-center
              justify-center
              gap-2
              px-6
              py-3
              rounded-xl
              text-white
              font-semibold
              shadow-lg
              bg-gradient-to-r
              from-[#00C9A7]
              via-[#0891B2]
              to-[#1565F0]
              hover:scale-105
              hover:shadow-xl
              transition-all
              duration-300
            "
          >
            <Camera size={18} />
            Nova Análise
          </Link>
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
            p-5 md:p-8
            text-white
            shadow-xl
            mb-8
          "
        >
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              BioLens
            </h2>

            <p className="max-w-2xl text-white/90 text-sm md:text-lg">
              Utilize inteligência artificial para identificar
              possíveis focos do mosquito da dengue através da
              análise de imagens.
            </p>
          </div>

          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10" />

          <div className="absolute bottom-0 right-20 w-24 h-24 rounded-full bg-white/10" />
        </div>

        {/* Últimas análises */}
        <div className="bg-white rounded-3xl shadow-lg p-4 md:p-6">
          <div
            className="
              flex
              flex-col
              sm:flex-row
              sm:items-center
              sm:justify-between
              gap-3
              mb-6
            "
          >
            <h2 className="text-xl font-bold text-slate-800">
              Últimas análises
            </h2>

            <Link
              href="/history"
              className="
                flex
                items-center
                gap-2
                text-[#1565F0]
                font-medium
                hover:text-[#0F4DD9]
                transition
              "
            >
              <History size={18} />
              Ver histórico
            </Link>
          </div>

          {analises.length === 0 ? (
            <div className="py-16 md:py-20 text-center">
              <p className="text-slate-400 text-lg">
                Nenhuma análise registrada
              </p>

              <Link
                href="/new-analysis"
                className="
                  inline-flex
                  items-center
                  gap-2
                  mt-6
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
                <Camera size={18} />
                Realizar primeira análise
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {analises.slice(0, 3).map((analise) => (
                <div
                  key={analise.id}
                  className="
                    border
                    border-slate-200
                    rounded-2xl
                    p-4
                    hover:border-[#0891B2]
                    hover:shadow-md
                    transition-all
                  "
                >
                  <div
                    className="
                      flex
                      flex-col
                      md:flex-row
                      md:items-center
                      md:justify-between
                      gap-4
                    "
                  >
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
                        alt="Análise"
                        className="
                          w-full
                          sm:w-24
                          h-40
                          sm:h-24
                          object-cover
                          rounded-xl
                        "
                      />

                      <div>
                        <h3 className="font-semibold text-slate-800">
                          {analise.localFoto}
                        </h3>

                        <p className="text-slate-500">
                          {analise.nomeBairro}
                        </p>

                        <p className="text-sm text-slate-400">
                          {analise.data}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`self-start md:self-auto px-4 py-2 rounded-full text-sm font-medium ${
                        analise.status === "Foco"
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {analise.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}