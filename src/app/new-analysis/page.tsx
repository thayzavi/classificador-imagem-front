"use client";

import {
  useState,
  useRef,
  useEffect,
} from "react";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Sidebar } from "@/components/bio-lens/Sidebar";
import { FormInput } from "@/components/bio-lens/FormInput";
import { PrimaryButton } from "@/components/bio-lens/PrimaryButton";

export default function NovaAnalisePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  const [locationLoading, setLocationLoading] =
    useState(true);

  const [location, setLocation] = useState<{
    latitude: number | null;
    longitude: number | null;
  }>({
    latitude: null,
    longitude: null,
  });

  const [formData, setFormData] = useState({
    nomeBairro: "",
    localFoto: "",
    data: "",
  });

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert(
        "Seu navegador não suporta geolocalização."
      );
      setLocationLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setLocation({
          latitude,
          longitude,
        });

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );

          const data = await response.json();

          setFormData((prev) => ({
            ...prev,

            nomeBairro:
              data.address?.suburb ||
              data.address?.neighbourhood ||
              "",

            localFoto: "",
          }));
        } catch (error) {
          console.error(
            "Erro ao buscar endereço:",
            error
          );
        }

        setLocationLoading(false);
      },
      (error) => {
        console.error(
          "Erro ao obter localização:",
          error
        );

        setLocationLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const handleChange =
    (field: string) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
          ...prev,
          [field]: e.target.value,
        }));
      };

  const handleDragOver = (
    e: React.DragEvent
  ) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (
    e: React.DragEvent
  ) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (
    e: React.DragEvent
  ) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;

    if (files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleFileSelect = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (
    e?: React.FormEvent
  ) => {
    e?.preventDefault();

    try {
      if (!selectedFile) {
        alert("Selecione uma imagem.");
        return;
      }

      if (
        !formData.nomeBairro ||
        !formData.localFoto ||
        !formData.data
      ) {
        alert("Preencha todos os campos.");
        return;
      }

      setLoading(true);

      const token =
        localStorage.getItem("token");

      if (!token) {
        alert(
          "Sessão expirada. Faça login novamente."
        );

        router.push("/login");
        return;
      }

      const form = new FormData();

      form.append("foto", selectedFile);

      form.append(
        "bairro",
        formData.nomeBairro
      );

      form.append(
        "local",
        formData.localFoto
      );

      form.append(
        "data_foto",
        formData.data
      );

      if (
        location.latitude !== null &&
        location.longitude !== null
      ) {
        form.append(
          "latitude",
          location.latitude.toString()
        );

        form.append(
          "longitude",
          location.longitude.toString()
        );
      }

      const response = await fetch(
        "https://api-classificador-img.onrender.com/analysis",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: form,
        }
      );

      const data = await response.json();

      console.log("Resposta da API:", data);

      if (!response.ok) {
        throw new Error(
          data.error ||
          data.msg ||
          "Erro ao realizar análise"
        );
      }

    const analysisData = {
      id: data.analysis_id,
      ...data.resultado,
    };

    sessionStorage.setItem(
      "analysisResult",
      JSON.stringify(analysisData)
    );
      
      router.push("/analysis-result");
    } catch (error) {
      console.error(error);

      if (
        error instanceof Error &&
        error.message.includes(
          "expired"
        )
      ) {
        localStorage.removeItem(
          "token"
        );

        router.push("/login");
        return;
      }

      alert(
        error instanceof Error
          ? error.message
          : "Erro inesperado"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar
        showUser
        userName="Maria"
        showLogout
      />

      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="flex items-start gap-4 mb-8">
          <Link
            href="/dashboard"
            className="
              flex
              items-center
              justify-center
              min-w-[44px]
              h-11
              rounded-full
              bg-white
              shadow-md
              hover:shadow-lg
              transition-all
            "
          >
            <ArrowLeft size={22} />
          </Link>

          <div>
            <h1 className="text-2xl md:text-4xl font-bold">
              Nova Análise
            </h1>

            <p className="mt-2 text-slate-600 text-sm md:text-base">
              Envie uma imagem para
              identificar possíveis focos do
              mosquito da dengue.
            </p>
          </div>
        </div>

        <div className="flex flex-col xl:flex-row gap-8">
          <div className="flex-1">
            <div
              className={`
                bg-white
                rounded-3xl
                shadow-lg
                border-2
                border-dashed
                p-6
                md:p-8
                min-h-[250px]
                md:min-h-[420px]
                flex
                flex-col
                items-center
                justify-center
                transition-all
                cursor-pointer
                ${isDragging
                  ? "border-[#00C9A7] bg-[#00C9A7]/5"
                  : "border-slate-300 hover:border-[#0891B2]"
                }
              `}
              onDragOver={
                handleDragOver
              }
              onDragLeave={
                handleDragLeave
              }
              onDrop={handleDrop}
              onClick={
                handleUploadClick
              }
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={
                  handleFileSelect
                }
                className="hidden"
              />

              {selectedFile ? (
                <div className="w-full">
                  <img
                    src={URL.createObjectURL(selectedFile)}
                    alt="Preview"
                    className="w-full max-h-[350px] object-contain rounded-2xl mb-4"
                  />

                  <p className="font-semibold text-slate-700 text-center">
                    {selectedFile.name}
                  </p>

                  <p className="text-sm text-slate-500 text-center mt-1">
                    Arquivo selecionado com sucesso
                  </p>
                </div>
              ) : (
                <>
                  <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mb-5">
                    <svg
                      className="w-10 h-10 text-slate-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                  </div>

                  <p className="text-center text-slate-700 font-medium">
                    Arraste sua imagem aqui
                  </p>

                  <p className="text-center text-slate-500 mt-2">
                    ou clique para selecionar
                  </p>

                  <p className="text-xs text-slate-400 mt-5">
                    JPG • JPEG • PNG
                  </p>

                  <p className="text-xs text-slate-400">
                    Máximo de 10MB
                  </p>
                </>
              )}
            </div>
          </div>


          <div className="w-full xl:w-80 bg-white rounded-3xl shadow-lg p-6 space-y-4">

            <FormInput
              label="Nome do Bairro"
              type="text"
              value={formData.nomeBairro}
              onChange={handleChange("nomeBairro")}
            />

            <p className="text-xs text-slate-500">
              Bairro sugerido pela localização atual. Você pode editar se necessário.
            </p>

            <FormInput
              label="Local da Foto"
              type="text"
              value={formData.localFoto}
              onChange={handleChange("localFoto")}
            />

            <FormInput
              label="Data"
              type="date"
              value={formData.data}
              onChange={handleChange("data")}
            />

            {locationLoading && (
              <div className="bg-slate-100 rounded-xl p-3 text-sm text-center">
                Obtendo endereço da foto...
              </div>
            )}

            <div className="pt-6 space-y-3">
              <PrimaryButton
                onClick={
                  handleSubmit
                }
                fullWidth
                disabled={loading}
              >
                {loading
                  ? "Analisando imagem..."
                  : "Enviar Imagem"}
              </PrimaryButton>

              <PrimaryButton
                variant="danger"
                onClick={
                  handleCancel
                }
                fullWidth
              >
                Cancelar
              </PrimaryButton>
            </div>
          </div>
        </div>

        {/* Dicas */}
        <div className="mt-8 bg-white rounded-3xl p-6 md:p-8 shadow-lg">
          <h3 className="font-bold text-slate-800 text-lg mb-5">
            Dicas para melhores resultados
          </h3>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="flex items-center gap-3">
              <span className="text-green-500 text-xl">✅</span>
              <span className="text-slate-600">
                Fotografe recipientes ou locais que possam acumular água.
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-green-500 text-xl">✅</span>
              <span className="text-slate-600">
                Utilize ambientes com boa iluminação.
              </span>
            </div>
          </div>
        </div>
        {loading && (
          <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 border-8 border-green-200 border-t-green-500 rounded-full animate-spin mx-auto" />

              <h2 className="mt-6 text-2xl font-bold">
                Nova Análise
              </h2>

              <p className="mt-2 text-slate-500">
                Analisando imagem...
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}