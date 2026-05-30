"use client";

import Link from "next/link";
import { Sidebar } from "@/components/bio-lens/Sidebar";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar showUser userName="Maria" showLogout />
      
      <main className="flex-1 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-semibold text-gray-800">Olá, Maria</h1>
          <Link
            href="/nova-analise"
            className="flex items-center gap-2 bg-[#00C9A7] text-white px-4 py-2 rounded-md hover:bg-[#00ddb8] transition-colors text-sm font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Realizar uma Análise
          </Link>
        </div>

        {/* Banner */}
        <div className="bg-[#00C9A7] rounded-lg p-4 flex items-center justify-between mb-8 cursor-pointer hover:bg-[#00ddb8] transition-colors">
          <span className="text-white font-medium">Conheça um pouco sobre o APP</span>
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>

        {/* Empty State */}
        <div className="flex-1 flex items-center justify-center mt-32">
          <p className="text-gray-400 text-lg">Nenhuma análise registrada</p>
        </div>
      </main>
    </div>
  );
}
