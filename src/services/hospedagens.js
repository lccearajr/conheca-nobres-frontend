import api from './api';

export const getHospedagens = async () => {
  try {
    const response = await api.get('/hospedagens');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar hospedagens:', error);
    throw error;
  }
};

export const getHospedagemById = async (id) => {
  try {
    const response = await api.get(`/hospedagens/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar hospedagem com ID ${id}:`, error);
    throw error;
  }
};