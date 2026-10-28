import axios from 'axios';

// Crie uma instância do Axios
// Em produção, defina VITE_API_URL (ex.: https://api.conhecanobres.com.br).
export const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3000').replace(/\/$/, '');

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Opcional: Adicionar um interceptor para tokens de autenticação, se necessário
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token'); // Ou de onde você armazena o token
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default api;