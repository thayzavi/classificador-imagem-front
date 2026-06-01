"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/bio-lens/Sidebar";
import { FormInput } from "@/components/bio-lens/FormInput";
import { PrimaryButton } from "@/components/bio-lens/PrimaryButton";

export default function NovaAnalisePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    nomeBairro: "",
    localFoto: "",
    data: "",
  });

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      alert("Selecione uma imagem.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      const novaAnalise = {
        id: Date.now(),
        nomeBairro: formData.nomeBairro,
        localFoto: formData.localFoto,
        data: formData.data,
        imagem: reader.result,
        status: Math.random() > 0.5 ? "Foco" : "Sem foco",
        criadaEm: new Date().toISOString(),
      };

      const analises = JSON.parse(
        localStorage.getItem("analises") || "[]"
      );

      analises.unshift(novaAnalise);

      localStorage.setItem(
        "analises",
        JSON.stringify(analises)
      );

      router.push("/dashboard");
    };

    reader.readAsDataURL(selectedFile);
  };

  const handleCancel = () => {
    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar showUser userName="Maria" showLogout />

      <main className="flex-1 p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold text-gray-800">
            Nova Análise
          </h1>

          <p className="text-gray-600 text-sm mt-1">
            Envie uma imagem para análise de possíveis focos
            do mosquito da dengue
          </p>
        </div>

        {/* Conteúdo Principal */}
        <div className="flex gap-8">
          {/* Upload */}
          <div className="flex-1">
            <div
              className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center min-h-[280px] transition-colors cursor-pointer ${
                isDragging
                  ? "border-[#00C9A7] bg-[#00C9A7]/5"
                  : "border-gray-300 bg-white hover:border-gray-400"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleUploadClick}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={handleFileSelect}
                className="hidden"
              />

              {selectedFile ? (
                <div className="text-center">
                  <svg
                    className="w-12 h-12 text-green-500 mx-auto mb-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>

                  <p className="font-medium text-gray-700">
                    {selectedFile.name}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    Arquivo selecionado
                  </p>
                </div>
              ) : (
                <>
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                    <svg
                      className="w-8 h-8 text-gray-400"
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

                  <p className="text-center text-sm text-gray-600">
                    Arraste e solte a imagem aqui ou clique
                    <br />
                    para selecionar
                  </p>

                  <p className="text-xs text-gray-400 mt-3">
                    Formatos aceitos: JPG, PNG, JPEG
                  </p>

                  <p className="text-xs text-gray-400">
                    Tamanho Máximo: 10MB
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Formulário */}
          <div className="w-72 space-y-4">
            <FormInput
              label="Nome do Bairro:"
              type="text"
              value={formData.nomeBairro}
              onChange={handleChange("nomeBairro")}
            />

            <FormInput
              label="Local da foto:"
              type="text"
              value={formData.localFoto}
              onChange={handleChange("localFoto")}
            />

            <FormInput
              label="Data:"
              type="date"
              value={formData.data}
              onChange={handleChange("data")}
            />

            <div className="pt-4 space-y-3">
              <PrimaryButton
                onClick={handleSubmit}
                fullWidth
              >
                Enviar imagem
              </PrimaryButton>

              <PrimaryButton
                variant="danger"
                onClick={handleCancel}
                fullWidth
              >
                Cancelar
              </PrimaryButton>
            </div>
          </div>
        </div>

        {/* Dicas */}
        <div className="mt-8 bg-white rounded-lg p-6 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4">
            Dicas para melhores resultados
          </h3>

          <div className="flex gap-8">
            <div className="flex items-center gap-2">
              <span>✅</span>
              <span className="text-sm text-gray-600">
                Fotografe objetos que possam acumular água
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span>✅</span>
              <span className="text-sm text-gray-600">
                Boa iluminação
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}