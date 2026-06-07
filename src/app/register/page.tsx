"use client";

import {
  useState,
  ChangeEvent,
  FormEvent,
} from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Sidebar } from "@/components/bio-lens/Sidebar";
import { FormInput } from "@/components/bio-lens/FormInput";
import { PrimaryButton } from "@/components/bio-lens/PrimaryButton";
import { register } from "@/services/register.service";

interface FormData {
  nomeCompleto: string;
  email: string;
  senha: string;

  cep: string;
  rua: string;
  bairro: string;
  cidade: string;
  estado: string;

  numeroResidencia: string;
}

export default function CadastroPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [loadingCep, setLoadingCep] = useState(false);

  const [aceitaTermos, setAceitaTermos] =
    useState(false);

  const [formData, setFormData] =
    useState<FormData>({
      nomeCompleto: "",
      email: "",
      senha: "",

      cep: "",
      rua: "",
      bairro: "",
      cidade: "",
      estado: "",

      numeroResidencia: "",
    });

  const handleChange =
    (field: keyof FormData) =>
      (e: ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
          ...prev,
          [field]: e.target.value,
        }));
      };

  const buscarCep = async (cep: string) => {
    const cepLimpo = cep.replace(/\D/g, "");

    if (cepLimpo.length !== 8) return;

    try {
      setLoadingCep(true);

      const response = await fetch(
        `https://viacep.com.br/ws/${cepLimpo}/json/`
      );

      const data = await response.json();

      if (data.erro) {
        alert("CEP não encontrado.");
        return;
      }

      setFormData((prev) => ({
        ...prev,
        rua: data.logradouro || "",
        bairro: data.bairro || "",
        cidade: data.localidade || "",
        estado: data.uf || "",
      }));
    } catch (error) {
      console.error(error);
      alert("Erro ao consultar CEP.");
    } finally {
      setLoadingCep(false);
    }
  };

  const handleCepChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    let cep = e.target.value;

    cep = cep.replace(/\D/g, "");

    if (cep.length > 8) {
      cep = cep.slice(0, 8);
    }

    const cepFormatado =
      cep.length > 5
        ? `${cep.slice(0, 5)}-${cep.slice(5)}`
        : cep;

    setFormData((prev) => ({
      ...prev,
      cep: cepFormatado,
    }));

    if (cep.length === 8) {
      buscarCep(cep);
    }
  };

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!aceitaTermos) {
      alert(
        "Você precisa aceitar os termos."
      );
      return;
    }

    try {
      setLoading(true);

      const enderecoCompleto = `${formData.rua}, ${formData.numeroResidencia}, ${formData.bairro}, ${formData.cidade} - ${formData.estado}`;

      const response = await register({
        nome: formData.nomeCompleto,
        email: formData.email,
        senha: formData.senha,
        endereco: enderecoCompleto,
        cep: formData.cep,
        numero_residencia:
          formData.numeroResidencia,
      });

      console.log(
        "CADASTRO OK:",
        response
      );

      alert(
        "Cadastro realizado com sucesso!"
      );

      router.push("/login");
    } catch (error: unknown) {
      console.error(
        "ERRO CADASTRO:",
        error
      );

      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert(
          "Erro ao cadastrar usuário."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 flex items-center justify-center p-8">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              Bem-vindo!
            </h1>

            <p className="text-gray-500 text-sm mt-1">
              Faça seu cadastro para continuar
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <FormInput
              label="Nome completo"
              type="text"
              value={formData.nomeCompleto}
              onChange={handleChange(
                "nomeCompleto"
              )}
              required
            />

            <FormInput
              label="E-mail"
              type="email"
              value={formData.email}
              onChange={handleChange(
                "email"
              )}
              required
            />

            <FormInput
              label="Senha"
              type="password"
              value={formData.senha}
              onChange={handleChange(
                "senha"
              )}
              required
            />

            <FormInput
              label="CEP"
              type="text"
              value={formData.cep}
              onChange={handleCepChange}
              required
            />

            {loadingCep && (
              <div className="text-sm text-slate-500">
                Consultando CEP...
              </div>
            )}

             <FormInput
              label="Rua"
              type="text"
              value={formData.rua}
              onChange={handleChange("rua")}
            />

          <div className="grid grid-cols-2 gap-4">
           
           <FormInput
              label="Cidade"
              type="text"
              value={formData.cidade}
              onChange={handleChange("cidade")}
            />

            <FormInput
              label="Bairro"
              type="text"
              value={formData.bairro}
              onChange={handleChange("bairro")}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label="UF"
              type="text"
              value={formData.estado}
              onChange={handleChange("estado")}
            />

            <FormInput
              label="Número"
              type="text"
              value={
                formData.numeroResidencia
              }
              onChange={handleChange(
                "numeroResidencia"
              )}
              required
            />
          </div>

            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="termos"
                checked={aceitaTermos}
                onChange={(e) =>
                  setAceitaTermos(
                    e.target.checked
                  )
                }
                className="mt-1"
              />

              <label
                htmlFor="termos"
                className="text-xs text-gray-600"
              >
                Aceito os termos de uso da
                plataforma.
              </label>
            </div>

            <PrimaryButton
              type="submit"
              fullWidth
              disabled={loading}
            >
              {loading
                ? "Cadastrando..."
                : "Cadastrar-se"}
            </PrimaryButton>
          </form>

          <p className="text-center mt-4 text-sm text-gray-600">
            Já possui conta?{" "}
            <Link
              href="/login"
              className="text-[#00C9A7] font-medium hover:underline"
            >
              Entrar
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}