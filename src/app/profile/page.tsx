"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  User,
  Mail,
  MapPin,
  Home,
  Save,
  Trash2,
  ArrowLeft,
} from "lucide-react";

import { Sidebar } from "@/components/bio-lens/Sidebar";

interface UserProfile {
  id: string;
  nome: string;
  email: string;
  endereco: string;
  cep: string;
  numero_residencia: string;
}

export default function ProfilePage() {
  const router = useRouter();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function carregarPerfil() {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          router.push("/login");
          return;
        }

        const response = await fetch(
          "https://api-classificador-img.onrender.com/user/perfil",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Erro ao carregar perfil");
        }

        setProfile(data);
      } catch (error: unknown) {
        console.error(error);

        if (error instanceof Error) {
          alert(error.message);
        } else {
          alert("Erro inesperado");
        }
      } finally {
        setLoading(false);
      }
    }

    carregarPerfil();
  }, [router]);

  const handleSave = async () => {
    if (!profile) return;

    try {
      setSaving(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        "https://api-classificador-img.onrender.com/user/perfil",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            nome: profile.nome,
            endereco: profile.endereco,
            cep: profile.cep,
            numero_residencia: profile.numero_residencia,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao atualizar perfil");
      }

      alert("Perfil atualizado com sucesso!");
    } catch (error: unknown) {
      console.error(error);

      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Erro inesperado");
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir sua conta?"
    );

    if (!confirmar) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "https://api-classificador-img.onrender.com/user/perfil",
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao excluir conta");
      }

      localStorage.removeItem("token");

      alert("Conta removida com sucesso!");
      router.push("/login");
    } catch (error: unknown) {
      console.error(error);

      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Erro inesperado");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Carregando perfil...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Perfil não encontrado.
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar showUser userName={profile.nome} showLogout />

      <main className="flex-1 p-6 md:p-8">

        {/* BOTÃO VOLTAR */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 mb-6 text-slate-600 hover:text-slate-900 transition"
        >
          <ArrowLeft size={20} />
        </Link>

        {/* HEADER */}
        <div className="bg-gradient-to-r from-[#00C9A7] via-[#0891B2] to-[#1565F0] rounded-3xl p-8 text-white mb-8">
          <h1 className="text-3xl font-bold">Meu Perfil</h1>
          <p className="mt-2 text-white/90">
            Gerencie suas informações pessoais.
          </p>
        </div>

        {/* FORM */}
        <div className="bg-white rounded-3xl shadow-lg p-8 max-w-3xl mx-auto space-y-6">

          <div className="flex items-center gap-2 font-semibold">
            <User size={18} /> Nome
          </div>
          <input
            value={profile.nome}
            onChange={(e) =>
              setProfile({ ...profile, nome: e.target.value })
            }
            className="w-full border rounded-xl p-3"
          />

          <div className="flex items-center gap-2 font-semibold">
            <Mail size={18} /> E-mail
          </div>
          <input
            value={profile.email}
            disabled
            className="w-full border rounded-xl p-3 bg-slate-100"
          />

          <div className="flex items-center gap-2 font-semibold">
            <MapPin size={18} /> Endereço
          </div>
          <input
            value={profile.endereco}
            onChange={(e) =>
              setProfile({ ...profile, endereco: e.target.value })
            }
            className="w-full border rounded-xl p-3"
          />

          <div className="grid md:grid-cols-2 gap-4">
            <input
              value={profile.cep}
              onChange={(e) =>
                setProfile({ ...profile, cep: e.target.value })
              }
              className="border rounded-xl p-3"
              placeholder="CEP"
            />

            <input
              value={profile.numero_residencia}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  numero_residencia: e.target.value,
                })
              }
              className="border rounded-xl p-3"
              placeholder="Número"
            />
          </div>

          {/* ACTIONS */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-white bg-green-600 hover:bg-green-700"
            >
              <Save size={18} />
              {saving ? "Salvando..." : "Salvar"}
            </button>

            <button
              onClick={handleDelete}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-white bg-red-600 hover:bg-red-700"
            >
              <Trash2 size={18} />
              Excluir conta
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}