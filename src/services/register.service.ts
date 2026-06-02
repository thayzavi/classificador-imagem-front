import { api } from "./api";

export async function register(data: {
  nome: string;
  email: string;
  endereco: string;
  cep: string;
  numero_residencia: string;
  senha: string;
}) {
  const response = await api.post("/register", data);

  return response.data;
}