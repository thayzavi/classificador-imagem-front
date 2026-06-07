"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Camera, History } from "lucide-react";
import { Sidebar } from "@/components/bio-lens/Sidebar";

interface Analise {
  id: string;
  bairro: string;
  local: string;
  resultado: string;
  confianca: number;
  data_foto: string;
}

interface UserProfile {
  nome: string;
}

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://api-classificador-img.onrender.com";

export default function DashboardPage() {
  const [analises, setAnalises] = useState<Analise[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [userName, setUserName] = useState("Usuário");

  useEffect(() => {
    async function carregarTudo() {
      try {
        setLoading(true);
        setErro("");

        const token =
          typeof window !== "undefined"
            ? localStorage.getItem("token")
            : null;

        if (!token) {
          setErro("Usuário não autenticado.");
          setLoading(false);
          return;
        }

        // ================= PERFIL =================
        try {
          const profileResponse = await fetch(
            `${API_URL}/user/perfil`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const profileData: UserProfile =
            await profileResponse.json();

          if (profileResponse.ok && profileData?.nome) {
            setUserName(profileData.nome);
          }
        } catch (err) {
          console.warn("Erro ao buscar perfil:", err);
        }

        // ================= HISTÓRICO =================
        const response = await fetch(
          `${API_URL}/analysis/history`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error ||
              data.msg ||
              "Erro ao carregar análises"
          );
        }

        setAnalises(data);
      } catch (error: unknown) {
        console.error(error);

        setErro(
          error instanceof Error
            ? error.message
            : "Erro inesperado"
        );
      } finally {
        setLoading(false);
      }
    }

    carregarTudo();
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* NOME DINÂMICO AQUI */}
      <Sidebar showUser userName={userName} showLogout />

      <main className="flex-1 p-4 md:p-6 lg:p-8">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
              Olá, {userName} 👋
            </h1>
            <p className="text-slate-500 mt-1">
              Bem-vindo ao BioLens
            </p>
          </div>

          <Link
            href="/new-analysis"
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-[#00C9A7] via-[#0891B2] to-[#1565F0]"
          >
            <Camera size={18} />
            Nova Análise
          </Link>
        </div>

        {/* CONTEÚDO */}
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">
              Últimas análises
            </h2>

            <Link
              href="/history"
              className="flex items-center gap-2 text-[#1565F0]"
            >
              <History size={18} />
              Ver histórico
            </Link>
          </div>

          {loading && (
            <p className="text-center py-10 text-slate-500">
              Carregando...
            </p>
          )}

          {erro && (
            <p className="text-center py-10 text-red-600">
              {erro}
            </p>
          )}

          {!loading &&
            !erro &&
            analises.length === 0 && (
              <p className="text-center py-10 text-slate-400">
                Nenhuma análise encontrada.
              </p>
            )}

          <div className="space-y-4">
            {analises.slice(0, 3).map((analise) => (
              <Link
                key={analise.id}
                href={`/analysis-details/${analise.id}`}
                className="block border rounded-2xl p-4 hover:shadow-md transition"
              >
                <h3 className="font-semibold">
                  {analise.local}
                </h3>

                <p className="text-slate-500">
                  {analise.bairro}
                </p>

                <span
                  className={`inline-block mt-2 px-3 py-1 rounded-full text-sm ${
                    analise.resultado
                      .toLowerCase()
                      .includes("foco")
                      ? "bg-red-100 text-red-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {analise.resultado}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}