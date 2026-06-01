"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar showUser userName="Maria" showLogout />

      <main className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-semibold text-gray-800">
            Olá, Maria
          </h1>

          <Link
            href="/new-analysis"
            className="bg-[#00C9A7] text-white px-4 py-2 rounded-md"
          >
            Realizar uma Análise
          </Link>
        </div>

        <div className="bg-[#00C9A7] rounded-lg p-4 mb-8">
          <span className="text-white font-medium">
            Conheça um pouco sobre o APP
          </span>
        </div>

        {analises.length === 0 ? (
          <div className="flex justify-center mt-20">
            <p className="text-gray-400 text-lg">
              Nenhuma análise registrada
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {analises.slice(0, 3).map((analise) => (
              <div
                key={analise.id}
                className="bg-white rounded-lg p-4 shadow border flex items-center justify-between"
              >
                <div className="flex gap-4">
                  <img
                    src={analise.imagem}
                    alt=""
                    className="w-24 h-20 object-cover rounded"
                  />

                  <div>
                    <h3 className="font-semibold">
                      {analise.localFoto}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {analise.nomeBairro}
                    </p>

                    <p className="text-sm text-gray-500">
                      {analise.data}
                    </p>
                  </div>
                </div>

                <span
                  className={`px-4 py-1 rounded-full text-sm ${
                    analise.status === "Foco"
                      ? "bg-red-200 text-red-700"
                      : "bg-green-200 text-green-700"
                  }`}
                >
                  {analise.status}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6">
          <Link
            href="/history"
            className="text-[#00C9A7] font-medium"
          >
            Ver histórico completo →
          </Link>
        </div>
      </main>
    </div>
  );
}