"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { Sidebar } from "@/components/bio-lens/Sidebar";

import {
  ArrowLeft,
  ShieldAlert,
  Hash,
  Trash2,
  FileText,
  MapPin,
  Calendar,
} from "lucide-react";

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
  prevencao: string;
  orientacao: string;
}

interface UserProfile {
  nome: string;
}

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://api-classificador-img.onrender.com";

export default function AnalysisDetailsPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const [analysis, setAnalysis] =
    useState<Analysis | null>(null);

  const [userName, setUserName] =
    useState("Usuário");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarTudo() {
      try {
        const token =
          localStorage.getItem("token");

        if (!token) {
          router.push("/login");
          return;
        }

        // Perfil
        const profileRes = await fetch(
          `${API_URL}/user/perfil`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (profileRes.ok) {
          const profile: UserProfile =
            await profileRes.json();

          setUserName(profile.nome);
        }

        // Detalhes da análise
        const analysisRes = await fetch(
          `${API_URL}/analysis/${params.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const analysisData =
          await analysisRes.json();

        if (!analysisRes.ok) {
          throw new Error(
            analysisData.error ||
              "Erro ao carregar análise"
          );
        }

        setAnalysis(analysisData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    carregarTudo();
  }, [params.id, router]);

  const handleDelete = async () => {
    if (!analysis) return;

    const confirmed = window.confirm(
      "Tem certeza que deseja excluir esta análise?"
    );

    if (!confirmed) return;

    try {
      const token =
        localStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/analysis/${analysis.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          "Erro ao excluir análise"
        );
      }

      router.push("/history");
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir análise");
    }
  };

  const handleDownloadPDF = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/analysis/download/${analysis?.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          "Erro ao baixar PDF"
        );
      }

      const blob =
        await response.blob();

      const url =
        window.URL.createObjectURL(blob);

      const link =
        document.createElement("a");

      link.href = url;
      link.download = `analise-${analysis?.id}.pdf`;

      document.body.appendChild(link);
      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert("Erro ao baixar PDF");
    }
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
      <div className="flex items-center justify-center min-h-screen">
        Análise não encontrada
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar
        showUser
        userName={userName}
        showLogout
      />

      <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/history"
            className="flex items-center justify-center w-11 h-11 rounded-full bg-white shadow-md"
          >
            <ArrowLeft size={22} />
          </Link>

          <div className="flex gap-3">
            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700"
            >
              <FileText size={18} />
              PDF
            </button>

            <button
              onClick={handleDelete}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600"
            >
              <Trash2 size={18} />
              Excluir
            </button>
          </div>
        </div>

        {/* Banner */}
        <div className="bg-gradient-to-r from-[#00C9A7] via-[#0891B2] to-[#1565F0] rounded-3xl p-6 text-white mb-8">
          <h1 className="text-3xl font-bold">
            Detalhes da Análise
          </h1>

          <p className="mt-2 opacity-90">
            Resultado da análise
            realizada pela IA
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-5">

          {/* Imagem */}
          <div className="bg-white rounded-3xl p-6 shadow-md">
            <h2 className="font-bold text-lg mb-4">
              Imagem Analisada
            </h2>

            <img
              src={analysis.imagem_url}
              alt="Imagem analisada"
              className="w-full rounded-2xl max-h-[500px] object-cover"
            />
          </div>

          {/* Resultado */}
          <div className="bg-white rounded-3xl p-6 shadow-md">
            <h2 className="font-bold text-lg mb-2">
              Resultado
            </h2>

            <p className="text-lg font-semibold">
              {analysis.resultado}
            </p>
          </div>

          {/* Local */}
          <div className="bg-white rounded-3xl p-6 shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <MapPin size={18} />
              <h2 className="font-bold text-lg">
                Local
              </h2>
            </div>

            <p>
              {analysis.local}
            </p>

            <p className="text-slate-500">
              {analysis.bairro}
            </p>
          </div>

          {/* Data */}
          <div className="bg-white rounded-3xl p-6 shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <Calendar size={18} />
              <h2 className="font-bold text-lg">
                Data da Foto
              </h2>
            </div>

            <p>
              {analysis.data_foto}
            </p>
          </div>

          {/* Descrição */}
          <div className="bg-white rounded-3xl p-6 shadow-md">
            <h2 className="font-bold text-lg mb-2">
              Descrição
            </h2>

            <p>{analysis.descricao}</p>
          </div>

          {/* Risco */}
          <div className="bg-white rounded-3xl p-6 shadow-md">
            <h2 className="font-bold text-lg mb-2">
              Nível de Risco
            </h2>

            <p>{analysis.risco}</p>
          </div>

          {/* Prevenção */}
          <div className="bg-white rounded-3xl p-6 shadow-md">
            <h2 className="font-bold text-lg mb-2">
              Prevenção
            </h2>

            <p>{analysis.prevencao}</p>
          </div>

          {/* Orientação */}
          <div className="bg-white rounded-3xl p-6 shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <ShieldAlert size={20} />
              <h2 className="font-bold text-lg">
                Orientações
              </h2>
            </div>

            <p>{analysis.orientacao}</p>
          </div>
        </div>
      </main>
    </div>
  );
}