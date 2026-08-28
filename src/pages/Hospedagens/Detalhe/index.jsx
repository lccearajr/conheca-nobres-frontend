import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getHospedagemById } from '../../../services/hospedagens'; // Importa a função de serviço

function HospedagemDetalhe() {
  const { id } = useParams();
  const [hospedagem, setHospedagem] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    setCarregando(true);
    setErro(null);
    getHospedagemById(id)
      .then((dados) => setHospedagem(dados))
      .catch((err) => {
        console.error("Erro ao carregar hospedagem:", err);
        setErro('Não foi possível carregar esta hospedagem.');
      })
      .finally(() => setCarregando(false));
  }, [id]);

  if (carregando) return <p style={{ padding: '20px' }}>Carregando detalhes da hospedagem...</p>;
  if (erro) return <p style={{ padding: '20px', color: 'red' }}>{erro}</p>;
  if (!hospedagem) return <p style={{ padding: '20px' }}>Hospedagem não encontrada.</p>;

  const campo = (valor) => valor ?? 'Informação em atualização';

  return (
    <div style={{ padding: '20px' }}>
      <Link to="/hospedagens" style={{ textDecoration: 'none', color: 'blue' }}>← Voltar para hospedagens</Link>

      <div style={{ background: '#ddd', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '16px 0' }}>
        <span>Imagem principal (em breve)</span>
      </div>

      <h1>{hospedagem.nome}</h1>
      <p>{campo(hospedagem.tipo)} em {campo(hospedagem.cidade || hospedagem.localizacao)}</p>

      <h2>Sobre a Hospedagem</h2>
      <p>{campo(hospedagem.descricao || 'Nenhuma descrição disponível.')}</p>

      <h2>Informações e Comodidades</h2>
      <ul>
        <li>Endereço: {campo(hospedagem.endereco)}</li>
        <li>Quartos: {campo(hospedagem.quartos)}</li>
        <li>Capacidade: {campo(hospedagem.capacidade)}</li>
        <li>Café da manhã: {hospedagem.cafe_da_manha ? 'Sim' : 'Não'}</li>
        <li>Piscina: {hospedagem.piscina ? 'Sim' : 'Não'}</li>
        <li>Wi-Fi: {hospedagem.wifi ? 'Sim' : 'Não'}</li>
        <li>Ar-condicionado: {hospedagem.ar_condicionado ? 'Sim' : 'Não'}</li>
        <li>Estacionamento: {hospedagem.estacionamento ? 'Sim' : 'Não'}</li>
        <li>Aceita animais: {hospedagem.aceita_animais ? 'Sim' : 'Não'}</li>
        <li>Faixa de Preço: {campo(hospedagem.faixa_de_preco)}</li>
      </ul>

      {/* Você pode adicionar mais seções aqui, como galeria de fotos, mapa, etc. */}

      <button
        // onClick={handleAdicionarAoRoteiro} // Futura funcionalidade
        style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
      >
        Adicionar ao meu roteiro (em breve)
      </button>
    </div>
  );
}

export default HospedagemDetalhe;