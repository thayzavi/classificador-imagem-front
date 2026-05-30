"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/bio-lens/Sidebar";
import { FormInput } from "@/components/bio-lens/FormInput";
import { PrimaryButton } from "@/components/bio-lens/PrimaryButton";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simula login - navega para dashboard
    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar showVersion />
      
      <main className="flex-1 flex items-center justify-center p-8">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Bem-vindo!</h1>
            <p className="text-gray-500 text-sm mt-1">Faça login para continuar</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <FormInput
              label="E-mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=""
              required
            />

            <FormInput
              label="Senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder=""
              required
            />

            <div className="pt-4">
              <PrimaryButton type="submit" fullWidth>
                Entrar
              </PrimaryButton>
            </div>
          </form>

          <p className="text-center mt-6 text-sm text-gray-600">
            Não tem uma conta?{" "}
            <Link href="/cadastro" className="text-[#00C9A7] font-medium hover:underline">
              Cadastre-se
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
