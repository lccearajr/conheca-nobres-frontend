// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import roteiroReducer from './slices/roteiroSlice'; // Importa o reducer do seu slice

const store = configureStore({
  reducer: {
    roteiro: roteiroReducer, // Adiciona o roteiroReducer à sua store
    // Se você tiver outros slices no futuro, eles seriam adicionados aqui
    // exemplo: user: userReducer,
  },
});

export default store;