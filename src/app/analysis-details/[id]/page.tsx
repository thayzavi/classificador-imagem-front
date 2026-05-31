"use client";

import Image from "next/image";
import Link from "next/link";
import { Sidebar } from "@/components/bio-lens/Sidebar";
import {
  ArrowLeft,
  ClipboardList,
  ShieldAlert,
  MapPin,
  Calendar,
  Hash,
} from "lucide-react";

export default function AnalysisDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const analysisId = Number(params.id);

  const analysis = {
    id: analysisId,
    imageUrl: "/images/foco-dengue.jpg",
    neighborhood: "Jardim Atlântico",
    location: "Rua das Palmeiras, 120",
    date: "15/06/2026",
    description:
      "Recipiente com água parada em condições ideais para proliferação do mosquito da dengue.",
    recommendations:
      "Esvazie o recipiente, limpe a área e elimine qualquer acúmulo de água para evitar novos focos.",
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar (mesma do seu outro arquivo) */}
      <Sidebar showUser userName="Maria" showLogout />

      <main className="flex-1 p-4 md:p-6 lg:p-10 overflow-y-auto">
        {/* Voltar */}
        <Link
          href="/dashboard"
          className="
            inline-flex
            items-center
            gap-2
            text-slate-700
            hover:text-[#0077B6]
            transition-colors
          "
        >
          <ArrowLeft size={24} />
        </Link>

        {/* Título */}
        <h1
          className="
            text-2xl
            md:text-3xl
            lg:text-4xl
            font-bold
            text-center
            text-slate-900
            mt-4
            mb-8
            lg:mb-12
          "
        >
          Detalhes da Análise
        </h1>

        {/* Conteúdo */}
        <div
          className="
            max-w-7xl
            mx-auto
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-8
            lg:gap-12
            items-start
          "
        >
          {/* Imagem */}
          <div
            className="
              bg-white
              rounded-3xl
              shadow-lg
              border
              border-slate-100
              overflow-hidden
            "
          >
            <Image
              src={analysis.imageUrl}
              alt="Análise"
              width={800}
              height={600}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Info */}
          <div className="space-y-5">
            {/* ID */}
            <div
              className="
                inline-flex
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

            {/* Bairro */}
            <div
              className="
                bg-white
                rounded-2xl
                shadow-md
                border
                border-slate-100
                p-6
              "
            >
              <div className="flex items-center gap-2 mb-4">
                <MapPin size={20} className="text-[#0077B6]" />
                <h2 className="font-bold text-lg">Bairro</h2>
              </div>
              <p className="text-slate-600">
                {analysis.neighborhood}
              </p>
            </div>

            {/* Local */}
            <div
              className="
                bg-white
                rounded-2xl
                shadow-md
                border
                border-slate-100
                p-6
              "
            >
              <div className="flex items-center gap-2 mb-4">
                <MapPin size={20} className="text-[#00C9A7]" />
                <h2 className="font-bold text-lg">Local</h2>
              </div>
              <p className="text-slate-600">
                {analysis.location}
              </p>
            </div>

            {/* Data */}
            <div
              className="
                bg-white
                rounded-2xl
                shadow-md
                border
                border-slate-100
                p-6
              "
            >
              <div className="flex items-center gap-2 mb-4">
                <Calendar size={20} className="text-[#EAB308]" />
                <h2 className="font-bold text-lg">Data</h2>
              </div>
              <p className="text-slate-600">
                {analysis.date}
              </p>
            </div>

            {/* Descrição */}
            <div
              className="
                bg-white
                rounded-2xl
                shadow-md
                border
                border-slate-100
                p-6
              "
            >
              <div className="flex items-center gap-2 mb-4">
                <ClipboardList
                  size={20}
                  className="text-[#0077B6]"
                />
                <h2 className="font-bold text-lg">
                  Descrição
                </h2>
              </div>
              <p className="text-slate-600 leading-relaxed">
                {analysis.description}
              </p>
            </div>

            {/* Recomendações */}
            <div
              className="
                bg-white
                rounded-2xl
                shadow-md
                border
                border-slate-100
                p-6
              "
            >
              <div className="flex items-center gap-2 mb-4">
                <ShieldAlert
                  size={20}
                  className="text-[#00C9A7]"
                />
                <h2 className="font-bold text-lg">
                  Recomendações
                </h2>
              </div>
              <p className="text-slate-600 leading-relaxed">
                {analysis.recommendations}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}