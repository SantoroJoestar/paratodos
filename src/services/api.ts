import axios from "axios";

export const api = axios.create({
  baseURL: "http://10.0.2.2:3001/api",
  timeout: 5000, // Timeout de 5 segundos
  headers: {
    'Content-Type': 'application/json',
  },
});
