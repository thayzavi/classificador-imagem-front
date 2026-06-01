"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Eye, ArrowLeft } from "lucide-react";
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
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar showUser userName="Maria" showLogout />

      <main className="flex-1 p-8">
        {/* Cabeçalho */}
        <div className="flex items-center gap-4 mb-6">
          <Link
            href="/dashboard"
            className="
              flex
              items-center
              justify-center
              w-10
              h-10
              rounded-full
              bg-white
              shadow-md
              hover:bg-gray-100
              transition
            "
          >
            <ArrowLeft size={22} />
          </Link>

          <h1 className="text-2xl font-bold text-gray-800">
            Histórico de Análises
          </h1>
        </div>

        {/* Busca */}
        <input
          type="text"
          placeholder="Buscar análise..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="
            w-full
            bg-white
            border
            rounded-lg
            p-3
            mb-8
            focus:outline-none
            focus:ring-2
            focus:ring-[#00C9A7]
          "
        />

        {/* Lista */}
        {analisesFiltradas.length === 0 ? (
          <div className="flex items-center justify-center h-60">
            <p className="text-gray-500 text-lg">
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
                    border
                    rounded-xl
                    p-4
                    flex
                    items-center
                    justify-between
                    hover:border-[#00C9A7]
                    hover:shadow-lg
                    transition-all
                    cursor-pointer
                  "
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={analise.imagem}
                      alt="Imagem da análise"
                      className="w-36 h-24 object-cover rounded-lg"
                    />

                    <div>
                      <h2 className="font-semibold text-lg text-gray-800">
                        {analise.localFoto}
                      </h2>

                      <p className="text-gray-500">
                        {analise.data}
                      </p>

                      <p className="text-gray-500 text-sm">
                        Bairro: {analise.nomeBairro}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span
                      className={`px-5 py-2 rounded-full text-sm font-medium ${
                        analise.status === "Foco"
                          ? "bg-red-500 text-white"
                          : "bg-green-500 text-white"
                      }`}
                    >
                      {analise.status}
                    </span>

                    <div
                      className="
                        flex
                        items-center
                        gap-2
                        px-4
                        py-2
                        rounded-lg
                        bg-blue-500
                        text-white
                        font-medium
                      "
                    >
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