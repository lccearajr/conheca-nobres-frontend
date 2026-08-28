import React from 'react';
import { useDispatch } from 'react-redux'; // Importe useDispatch
import { useNavigate } from 'react-router-dom'; // Importe useNavigate
import { selecionarHospedagem } from '../../store/slices/roteiroSlice'; // Importe a ação

const HospedagemCard = ({ hospedagem }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formatarValor = (valor) => {
    if (valor === null || valor === undefined) {
      return 'Não informado';
    }

    return Number(valor).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const tiposAcomodacao = {
    pousada: 'Pousada',
    hotel: 'Hotel',
    chales: 'Chalés',
    chalé: 'Chalé',
    camping: 'Camping',
    complexo: 'Complexo turístico'
  };

  const tipo = hospedagem.tipo_acomodacao
    ? tiposAcomodacao[hospedagem.tipo_acomodacao.toLowerCase()] ||
      hospedagem.tipo_acomodacao
    : 'Tipo não informado';

  const handleAdicionarHospedagem = () => {
    dispatch(selecionarHospedagem(hospedagem)); // Despacha a hospedagem completa
    alert(`"${hospedagem.nome}" adicionada ao seu roteiro!`);
    navigate('/meu-roteiro'); // Redireciona para a página do roteiro
  };

  const handleVerDetalhes = () => {
    navigate(`/hospedagens/${hospedagem.id}`); // Redireciona para a página de detalhes
  };

  return (
    <article
      style={{
        border: '1px solid #ddd',
        borderRadius: '10px',
        overflow: 'hidden',
        backgroundColor: '#fff',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.12)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {/* Área reservada para a futura imagem */}
      <div
        style={{
          height: '180px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#e8eee8',
          color: '#526052',
          textAlign: 'center',
          padding: '20px'
        }}
      >
        <span>Imagem da hospedagem em breve</span>
      </div>

      <div style={{ padding: '16px', flexGrow: 1 }}>
        <h2
          style={{
            margin: '0 0 8px',
            fontSize: '20px',
            color: '#222'
          }}
        >
          {hospedagem.nome}
        </h2>

        <p
          style={{
            margin: '0 0 12px',
            color: '#666',
            textTransform: 'capitalize'
          }}
        >
          {tipo}
        </p>

        {hospedagem.descricao && (
          <p style={{ color: '#444', lineHeight: '1.5' }}>
            {hospedagem.descricao}
          </p>
        )}

        <div style={{ marginTop: '14px', color: '#444' }}>
          {hospedagem.distancia_vila_km !== null &&
            hospedagem.distancia_vila_km !== undefined && (
              <p style={{ margin: '6px 0' }}>
                <strong>Distância da vila:</strong>{' '}
                {hospedagem.distancia_vila_km} km
              </p>
            )}

          {hospedagem.capacidade_maxima && (
            <p style={{ margin: '6px 0' }}>
              <strong>Capacidade:</strong>{' '}
              {hospedagem.capacidade_maxima} pessoas
            </p>
          )}

          <p style={{ margin: '6px 0' }}>
            <strong>Restaurante:</strong>{' '}
            {hospedagem.possui_restaurante ? 'Sim' : 'Não'}
          </p>

          <p style={{ margin: '6px 0' }}>
            <strong>Aceita animais:</strong>{' '}
            {hospedagem.aceita_pet ? 'Sim' : 'Não'}
          </p>
        </div>

        <div
          style={{
            marginTop: '16px',
            paddingTop: '12px',
            borderTop: '1px solid #eee'
          }}
        >
          <strong>Diária:</strong>
          <br />
          {formatarValor(hospedagem.valor_diaria_min)} até{' '}
          {formatarValor(hospedagem.valor_diaria_max)}
        </div>
      </div>

      <div style={{ padding: '16px', borderTop: '1px solid #eee', display: 'flex', gap: '10px' }}>
        <button
          onClick={handleVerDetalhes}
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            padding: '8px 12px',
            borderRadius: '5px',
            cursor: 'pointer',
            flex: 1,
          }}
        >
          Ver Detalhes
        </button>
        <button
          onClick={handleAdicionarHospedagem}
          style={{
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            padding: '8px 12px',
            borderRadius: '5px',
            cursor: 'pointer',
            flex: 1,
          }}
        >
          Adicionar ao meu roteiro
        </button>
      </div>
    </article>
  );
};

export default HospedagemCard;