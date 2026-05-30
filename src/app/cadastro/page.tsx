"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/bio-lens/Sidebar";
import { FormInput } from "@/components/bio-lens/FormInput";
import { PrimaryButton } from "@/components/bio-lens/PrimaryButton";

export default function CadastroPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nomeCompleto: "",
    email: "",
    senha: "",
    endereco: "",
    cep: "",
    numeroResidencia: "",
  });
  const [aceitaTermos, setAceitaTermos] = useState(false);

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aceitaTermos) {
      alert("Você precisa aceitar os termos para continuar.");
      return;
    }
    // Simula cadastro - navega para login
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      
      <main className="flex-1 flex items-center justify-center p-8">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Bem-vindo!</h1>
            <p className="text-gray-500 text-sm mt-1">Faça seu cadastro para continuar</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <FormInput
              label="Nome completo:"
              type="text"
              value={formData.nomeCompleto}
              onChange={handleChange("nomeCompleto")}
              required
            />

            <FormInput
              label="E-mail"
              type="email"
              hint="E-mail:"
              value={formData.email}
              onChange={handleChange("email")}
              required
            />

            <FormInput
              label="Senha"
              type="password"
              value={formData.senha}
              onChange={handleChange("senha")}
              required
            />

            <FormInput
              label="Endereço"
              type="text"
              value={formData.endereco}
              onChange={handleChange("endereco")}
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <FormInput
                label="CEP:"
                type="text"
                value={formData.cep}
                onChange={handleChange("cep")}
                required
              />
              <FormInput
                label="Número residência"
                type="text"
                value={formData.numeroResidencia}
                onChange={handleChange("numeroResidencia")}
                required
              />
            </div>

            <div className="flex items-start gap-2 pt-2">
              <input
                type="checkbox"
                id="termos"
                checked={aceitaTermos}
                onChange={(e) => setAceitaTermos(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-gray-300 text-[#00C9A7] focus:ring-[#00C9A7]"
              />
              <label htmlFor="termos" className="text-xs text-gray-600 leading-tight">
                Ao utilizar este aplicativo, o usuário concorda em enviar apenas imagens próprias ou autorizadas, respeitando a privacidade e a legislação vigente.
              </label>
            </div>

            <div className="pt-2">
              <PrimaryButton type="submit" fullWidth>
                Cadastrar-se
              </PrimaryButton>
            </div>
          </form>

          <p className="text-center mt-4 text-sm text-gray-600">
            Já tem uma conta?{" "}
            <Link href="/login" className="text-[#00C9A7] font-medium hover:underline">
              Login
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
