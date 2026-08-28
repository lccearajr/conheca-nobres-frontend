import api from './api';

export const getTransportes = async () => {
  try {
    const response = await api.get('/transportes');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar transportes:', error);
    throw error;
  }
};

export const getTransporteById = async (id) => {
  try {
    const response = await api.get(`/transportes/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar transporte com ID ${id}:`, error);
    throw error;
  }
};