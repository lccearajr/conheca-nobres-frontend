// src/pages/Experiencias/Detalhe/ExperienciaDetalhe.jsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { adicionarItemAoRoteiro } from '../../../store/slices/roteiroSlice';
import { useNavigate } from 'react-router-dom'; // Para redirecionar após adicionar

const ExperienciaDetalhe = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Dados fictícios de uma experiência para demonstração
  const experiencia = {
    id: 'exp-123', // ID único para a experiência
    nome: 'Cachoeira da Serra Azul',
    tipo: 'experiencia',
    localizacao: 'Bom Jardim, Nobres - MT',
    duracaoEstimada: '4 horas',
    valor: 150.00,
    descricao: 'Uma das mais belas cachoeiras da região, com águas cristalinas e piscinas naturais.',
  };

  const handleAdicionarAoRoteiro = () => {
    dispatch(adicionarItemAoRoteiro({
      id: experiencia.id,
      tipo: experiencia.tipo,
      nome: experiencia.nome,
      detalhes: experiencia.descricao, // Ou outros detalhes relevantes
    }));
    alert(`"${experiencia.nome}" adicionado ao seu roteiro!`);
    navigate('/meu-roteiro'); // Redireciona para a página do roteiro
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>{experiencia.nome}</h1>
      <p><strong>Tipo:</strong> {experiencia.tipo}</p>
      <p><strong>Localização:</strong> {experiencia.localizacao}</p>
      <p><strong>Duração Estimada:</strong> {experiencia.duracaoEstimada}</p>
      <p><strong>Valor:</strong> R$ {experiencia.valor.toFixed(2)}</p>
      <p>{experiencia.descricao}</p>

      <button onClick={handleAdicionarAoRoteiro} style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px' }}>
        Adicionar ao Meu Roteiro
      </button>

      <button onClick={() => navigate('/meu-roteiro')} style={{ marginLeft: '10px', padding: '10px 20px', fontSize: '16px' }}>
        Ver Meu Roteiro
      </button>
    </div>
  );
};

export default ExperienciaDetalhe;