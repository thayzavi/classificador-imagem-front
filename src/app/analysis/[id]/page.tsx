"use client";

import Image from "next/image";
import Link from "next/link";
import { Sidebar } from "@/components/bio-lens/Sidebar";
import {
  AlertTriangle,
  ArrowLeft,
  Download,
  Plus,
  ClipboardList,
  ShieldAlert,
  Eye,
} from "lucide-react";

export default function AnalysisResultPage() {
  const analysisId = 1;

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
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
          Resultado da Análise
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
              src="/images/foco-dengue.jpg"
              alt="Resultado da análise"
              width={800}
              height={600}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Resultado */}
          <div className="space-y-5">
            {/* Status */}
            <div
              className="
                inline-flex
                items-center
                gap-2
                px-4
                py-2
                rounded-full
                bg-red-50
                text-red-600
                border
                border-red-100
                font-semibold
              "
            >
              <AlertTriangle size={18} />
              Foco Detectado
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
                Recipiente com água parada em condições ideais para proliferação do mosquito da dengue.
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
                Esvazie o recipiente e limpe a área. Mantenha o local seco e sem acúmulo de água. Realize inspeções periódicas para evitar novos focos.
              </p>
            </div>

            {/* Botões */}
            <div className="pt-2 flex flex-col gap-4">

              {/* NOVO: Ver detalhes */}
              <Link
                href={`/analysis-details/${analysisId}`}
                className="
                  w-full
                  flex
                  items-center
                  justify-center
                  gap-2
                  py-3
                  rounded-full
                  font-semibold
                  text-white
                  bg-[#0077B6]
                  hover:bg-[#023E8A]
                  transition-all
                  duration-300
                  shadow-lg
                  hover:shadow-xl
                "
              >
                <Eye size={18} />
                Ver detalhes da análise
              </Link>

              {/* Download */}
              <button
                className="
                  w-full
                  flex
                  items-center
                  justify-center
                  gap-2
                  py-3
                  rounded-full
                  font-semibold
                  text-white
                  bg-[#00C9A7]
                  hover:bg-[#00B89A]
                  transition-all
                  duration-300
                  shadow-lg
                  hover:shadow-xl
                "
              >
                <Download size={18} />
                Baixar análise
              </button>

              {/* Nova análise */}
              <Link
                href="/nova-analise"
                className="
                  w-full
                  flex
                  items-center
                  justify-center
                  gap-2
                  py-3
                  rounded-full
                  font-semibold
                  text-white
                  bg-[#EAB308]
                  hover:bg-[#D4A106]
                  transition-all
                  duration-300
                  shadow-lg
                  hover:shadow-xl
                "
              >
                <Plus size={18} />
                Nova Análise
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}