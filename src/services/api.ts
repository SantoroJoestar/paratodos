import axios from "axios";

export const api = axios.create({
  baseURL: "https://back-end-paratodos-app-v2.vercel.app/api",
  timeout: 5000, // Timeout de 5 segundos
  headers: {
    'Content-Type': 'application/json',
  },
});

export const handleApiError = (error: unknown): never => {
  let errorMessage = (error as Error)?.message || "Erro desconhecido";

  throw new Error(errorMessage);
};