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
} from "lucide-react";

interface Analysis {
  id: string;
  bairro: string;
  local: string;
  data_foto: string;
  resultado: string;
  classe: string;
  confianca: number;
}

interface UserProfile {
  nome: string;
}

const API_URL =
  "https://api-classificador-img.onrender.com";

export default function AnalysisDetailsPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [userName, setUserName] = useState("Usuário");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarTudo() {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          router.push("/login");
          return;
        }

        // 👤 PERFIL DO USUÁRIO
        const profileRes = await fetch(`${API_URL}/user/perfil`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const profile: UserProfile = await profileRes.json();

        if (profileRes.ok) {
          setUserName(profile.nome);
        }

        // 📊 DETALHE DA ANÁLISE
        const response = await fetch(
          `${API_URL}/analysis/${params.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data: Analysis = await response.json();

        if (!response.ok) {
          throw new Error("Erro ao carregar análise");
        }

        setAnalysis(data);
      } catch (error: unknown) {
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

    const token = localStorage.getItem("token");

    await fetch(
      `${API_URL}/analysis/${analysis.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

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
      <div className="flex items-center justify-center min-h-screen">
        Análise não encontrada
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* 👇 AGORA DINÂMICO */}
      <Sidebar showUser userName={userName} showLogout />

      <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/history"
            className="flex items-center justify-center w-11 h-11 rounded-full bg-white shadow-md"
          >
            <ArrowLeft size={22} />
          </Link>

          <div className="flex gap-3">
            <button className="px-4 py-2 rounded-xl bg-green-500 text-white">
              PDF
            </button>

            <button
              onClick={handleDelete}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500 text-white"
            >
              <Trash2 size={18} />
              Excluir
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#00C9A7] via-[#0891B2] to-[#1565F0] rounded-3xl p-6 text-white mb-8">
          <h1 className="text-3xl font-bold">
            Detalhes da Análise
          </h1>
        </div>

        <div className="max-w-5xl mx-auto space-y-4">
          <div className="px-4 py-2 rounded-full bg-blue-50 text-blue-600 font-semibold">
            <Hash size={18} className="inline mr-2" />
            {analysis.id}
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-md">
            <h2 className="font-bold text-lg mb-2">Resultado</h2>
            <p>{analysis.resultado}</p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-md">
            <h2 className="font-bold text-lg mb-2">Bairro</h2>
            <p>{analysis.bairro}</p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-md">
            <h2 className="font-bold text-lg mb-2">Local</h2>
            <p>{analysis.local}</p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-md">
            <div className="flex items-center gap-3 mb-3">
              <ShieldAlert size={20} />
              <h2 className="font-bold text-lg">
                Recomendações
              </h2>
            </div>

            <p>
              {analysis.resultado === "Foco Detectado"
                ? "Eliminar água parada."
                : "Continue monitorando o local."}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}