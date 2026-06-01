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
      <div className="flex items-center justify-center min-h-screen text-slate-500 text-lg">
        Carregando análise...
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <h1 className="text-2xl font-bold text-slate-800">
          Análise não encontrada
        </h1>

        <Link
          href="/history"
          className="
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
          Voltar ao histórico
        </Link>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar showUser userName="Maria" showLogout />

      <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/history"
            className="
              flex
              items-center
              justify-center
              w-11
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

          <button
            onClick={handleDelete}
            className="
              flex
              items-center
              gap-2
              px-4
              py-2
              rounded-xl
              bg-red-500
              text-white
              font-medium
              shadow-md
              hover:bg-red-600
              hover:shadow-lg
              transition-all
            "
          >
            <Trash2 size={18} />

            <span className="hidden sm:block">
              Excluir
            </span>
          </button>
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
            p-6 md:p-8
            text-white
            shadow-xl
            mb-8
          "
        >
          <div className="relative z-10">
            <h1 className="text-2xl md:text-4xl font-bold">
              Detalhes da Análise
            </h1>

            <p className="text-white/90 mt-2">
              Visualize todas as informações da
              análise realizada.
            </p>
          </div>

          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10" />

          <div className="absolute bottom-0 right-20 w-24 h-24 rounded-full bg-white/10" />
        </div>

        {/* Conteúdo */}
        <div
          className="
            max-w-7xl
            mx-auto
            grid
            grid-cols-1
            xl:grid-cols-2
            gap-8
          "
        >
          {/* Imagem */}
          <div>
            <div
              className="
                bg-white
                rounded-3xl
                shadow-xl
                border
                border-slate-100
                p-4
              "
            >
              {analysis.imagem ? (
                <img
                  src={analysis.imagem}
                  alt="Imagem da análise"
                  className="
                    w-full
                    h-auto
                    max-h-[650px]
                    object-contain
                    rounded-2xl
                    block
                    mx-auto
                  "
                />
              ) : (
                <div className="h-[300px] flex items-center justify-center">
                  <p className="text-slate-500">
                    Nenhuma imagem encontrada
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Informações */}
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <div
                className="
                  flex
                  items-center
                  gap-2
                  px-4
                  py-2
                  rounded-full
                  bg-blue-50
                  text-blue-600
                  border
                  border-blue-100
                  font-semibold
                "
              >
                <Hash size={18} />
                ID: {analysis.id}
              </div>

              <div
                className={`px-4 py-2 rounded-full font-semibold ${
                  analysis.status === "Foco"
                    ? "bg-red-100 text-red-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {analysis.status}
              </div>
            </div>

            {/* Bairro */}
            <div className="bg-white rounded-3xl p-6 shadow-md hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-3">
                <MapPin
                  size={20}
                  className="text-[#1565F0]"
                />

                <h2 className="font-bold text-lg">
                  Bairro
                </h2>
              </div>

              <p className="text-slate-600">
                {analysis.nomeBairro}
              </p>
            </div>

            {/* Local */}
            <div className="bg-white rounded-3xl p-6 shadow-md hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-3">
                <MapPin
                  size={20}
                  className="text-[#00C9A7]"
                />

                <h2 className="font-bold text-lg">
                  Local da Foto
                </h2>
              </div>

              <p className="text-slate-600">
                {analysis.localFoto}
              </p>
            </div>

            {/* Data */}
            <div className="bg-white rounded-3xl p-6 shadow-md hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-3">
                <Calendar
                  size={20}
                  className="text-[#0891B2]"
                />

                <h2 className="font-bold text-lg">
                  Data
                </h2>
              </div>

              <p className="text-slate-600">
                {analysis.data}
              </p>
            </div>

            {/* Resultado */}
            <div className="bg-white rounded-3xl p-6 shadow-md hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-3">
                <ClipboardList
                  size={20}
                  className="text-[#1565F0]"
                />

                <h2 className="font-bold text-lg">
                  Resultado
                </h2>
              </div>

              <p
                className={`font-bold text-lg ${
                  analysis.status === "Foco"
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                {analysis.status}
              </p>
            </div>

            {/* Recomendações */}
            <div className="bg-white rounded-3xl p-6 shadow-md hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-3">
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
                  ? "Foi identificado um possível foco do mosquito da dengue. Recomenda-se eliminar recipientes com água parada, realizar inspeções frequentes e comunicar os órgãos responsáveis."
                  : "Nenhum foco foi identificado. Continue realizando inspeções periódicas e mantendo os ambientes livres de recipientes que possam acumular água."}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}