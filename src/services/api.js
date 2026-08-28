import axios from 'axios';

// Crie uma instância do Axios
const api = axios.create({
  baseURL: 'http://localhost:3000', // URL base do seu backend
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