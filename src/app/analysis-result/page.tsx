"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Sidebar } from "@/components/bio-lens/Sidebar";
import { PrimaryButton } from "@/components/bio-lens/PrimaryButton";

interface Analysis {
  id: string;

  bairro: string;
  local: string;
  data_foto: string;

  resultado: string;
  classe: string;

  imagem_url: string;

  descricao: string;
  risco: string;

  prevencao: string[];

  orientacao: string;
}

export default function ResultPage() {
  const router = useRouter();

  const [analysis, setAnalysis] =
    useState<Analysis | null>(null);

  useEffect(() => {
    const stored =
      sessionStorage.getItem(
        "analysisResult"
      );

    if (stored) {
      setAnalysis(JSON.parse(stored));
    }
  }, []);

  if (!analysis) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Carregando...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar
        showUser
        userName="Maria"
        showLogout
      />

      <main className="flex-1 p-6 md:p-8">
        <h1 className="text-3xl font-bold mb-8">
          Resultado da Análise
        </h1>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <img
              src={analysis.imagem_url}
              alt="Imagem analisada"
              className="
                w-full
                rounded-3xl
                shadow-lg
                object-cover
              "
            />
          </div>

          <div className="space-y-5">
            <div className="bg-white rounded-3xl shadow-md p-6">
              <h2 className="text-red-500 font-bold text-xl mb-3">
                {analysis.resultado}
              </h2>

              <p className="text-slate-600">
                {analysis.descricao}
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-md p-6">
              <h2 className="font-bold mb-3">
                Nível de Risco
              </h2>

              <p>{analysis.risco}</p>
            </div>

            <div className="bg-white rounded-3xl shadow-md p-6">
              <h2 className="font-bold mb-3">
                Recomendações
              </h2>

              <ul className="list-disc pl-5 space-y-2">
                    {analysis.prevencao.map(
                        (item, index) => (
                        <li key={index}>
                            {item}
                        </li>
                        )
                    )}
                </ul>

              <p className="mt-4">
                {analysis.orientacao}
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-md p-6">
              <h2 className="font-bold mb-3">
                Informações da Análise
              </h2>

              <div className="space-y-2">
                <p>
                  <strong>Bairro:</strong>{" "}
                  {analysis.bairro}
                </p>

                <p>
                  <strong>Local:</strong>{" "}
                  {analysis.local}
                </p>

                <p>
                  <strong>Resultado:</strong>{" "}
                  {analysis.classe}
                </p>

                <p>
                  <strong>Data:</strong>{" "}
                  {analysis.data_foto}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <PrimaryButton
                
                onClick={() =>
                  router.push(
                    "/dashboard"
                  )
                }
                fullWidth
              >
                Voltar para o início
              </PrimaryButton>

              <PrimaryButton
                onClick={() =>
                  router.push(
                    "/new-analysis"
                  )
                }
                fullWidth
              >
                Nova Análise
              </PrimaryButton>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}