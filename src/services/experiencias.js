import api from './api';

// Função para buscar todas as experiências
export const getExperiencias = async () => {
  try {
    const response = await api.get('/experiencias');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar experiências:', error);
    throw error;
  }
};

// Função para buscar uma experiência específica por ID
export const getExperienciaById = async (id) => {
  try {
    const response = await api.get(`/experiencias/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar experiência com ID ${id}:`, error);
    throw error;
  }
};

// Função para buscar experiências por categoria
export const getExperienciasByCategoria = async (categoriaId) => {
  try {
    // Se categoriaId for null ou 'todas', busca todas as experiências
    if (!categoriaId || categoriaId === 'todas') {
      return await getExperiencias();
    }
    const response = await api.get(`/experiencias/categoria/${categoriaId}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar experiências da categoria ${categoriaId}:`, error);
    throw error;
  }
};