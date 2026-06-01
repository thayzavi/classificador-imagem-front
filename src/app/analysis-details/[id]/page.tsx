"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { Sidebar } from "@/components/bio-lens/Sidebar";
import {
  ArrowLeft,
  ClipboardList,
  ShieldAlert,
  MapPin,
  Calendar,
  Hash,
  Trash2,
} from "lucide-react";

interface Analysis {
  id: number;
  nomeBairro: string;
  localFoto: string;
  data: string;
  imagem: string;
  status: string;
}

export default function AnalysisDetailsPage() {
  const router = useRouter();
  const params = useParams();

  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const analysisId = String(params.id);

    const analises = JSON.parse(
      localStorage.getItem("analises") || "[]"
    );

    const encontrada = analises.find(
      (item: Analysis) => String(item.id) === analysisId
    );

    if (encontrada) {
      setAnalysis(encontrada);
    }

    setLoading(false);
  }, [params.id]);

  const handleDelete = () => {
    if (!analysis) return;

    const confirmed = window.confirm(
      "Tem certeza que deseja excluir esta análise?"
    );

    if (!confirmed) return;

    const analises = JSON.parse(
      localStorage.getItem("analises") || "[]"
    );

    const atualizadas = analises.filter(
      (item: Analysis) => item.id !== analysis.id
    );

    localStorage.setItem(
      "analises",
      JSON.stringify(atualizadas)
    );

    alert("Análise excluída com sucesso!");
    router.push("/history");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Carregando análise...
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <h1 className="text-2xl font-bold">
          Análise não encontrada
        </h1>

        <Link
          href="/history"
          className="px-4 py-2 bg-[#00C9A7] text-white rounded-lg"
        >
          Voltar ao histórico
        </Link>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar showUser userName="Maria" showLogout />

      <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/history"
            className="text-slate-700 hover:text-[#0077B6]"
          >
            <ArrowLeft size={28} />
          </Link>

          <button
            onClick={handleDelete}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition"
          >
            <Trash2 size={18} />
            Excluir
          </button>
        </div>

        {/* Título */}
        <h1 className="text-3xl font-bold text-center mb-10">
          Detalhes da Análise
        </h1>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* IMAGEM */}
          <div className="self-start">
            <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-4">
              {analysis.imagem ? (
                <img
                  src={analysis.imagem}
                  alt="Imagem da análise"
                  className="
                    w-full
                    h-auto
                    max-h-[500px]
                    object-contain
                    rounded-2xl
                    block
                    mx-auto
                  "
                />
              ) : (
                <div className="h-[300px] flex items-center justify-center">
                  <p className="text-gray-500">
                    Nenhuma imagem encontrada
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* INFORMAÇÕES */}
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 border border-blue-100 font-semibold">
              <Hash size={18} />
              ID: {analysis.id}
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex items-center gap-2 mb-3">
                <MapPin size={20} className="text-[#0077B6]" />
                <h2 className="font-bold text-lg">Bairro</h2>
              </div>

              <p>{analysis.nomeBairro}</p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex items-center gap-2 mb-3">
                <MapPin size={20} className="text-[#00C9A7]" />
                <h2 className="font-bold text-lg">Local da Foto</h2>
              </div>

              <p>{analysis.localFoto}</p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex items-center gap-2 mb-3">
                <Calendar size={20} className="text-yellow-500" />
                <h2 className="font-bold text-lg">Data</h2>
              </div>

              <p>{analysis.data}</p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex items-center gap-2 mb-3">
                <ClipboardList
                  size={20}
                  className="text-[#0077B6]"
                />
                <h2 className="font-bold text-lg">Resultado</h2>
              </div>

              <p
                className={`font-semibold ${
                  analysis.status === "Foco"
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                {analysis.status}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex items-center gap-2 mb-3">
                <ShieldAlert
                  size={20}
                  className="text-[#00C9A7]"
                />
                <h2 className="font-bold text-lg">
                  Recomendações
                </h2>
              </div>

              <p className="text-slate-600 leading-relaxed">
                {analysis.status === "Foco"
                  ? "Foi identificado um possível foco do mosquito. Recomenda-se eliminar recipientes com água parada e comunicar os órgãos responsáveis."
                  : "Nenhum foco foi identificado. Continue realizando inspeções periódicas para prevenção da dengue."}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}