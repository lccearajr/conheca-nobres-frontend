import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'; // Adicionado useNavigate
import { useDispatch } from 'react-redux'; // Adicionado useDispatch
import { getExperienciaById } from '../../../services/experiencias'; // Nome da função corrigido
import { adicionarItemAoRoteiro } from '../../../store/slices/roteiroSlice'; // Importa a ação do Redux
import Seo from '../../../components/SEO/Seo';
import { absoluteUrl } from '../../../config/site';

function ExperienciaDetalhe() {
  const { id } = useParams(); // Hook para pegar o ID da URL <sources>[2,6]</sources>
  const navigate = useNavigate(); // Hook para navegação
  const dispatch = useDispatch(); // Hook para despachar ações Redux

  const [experiencia, setExperiencia] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    setCarregando(true);
    setErro(null);
    // Chama a função de serviço com o nome correto
    getExperienciaById(id)
      .then((dados) => setExperiencia(dados))
      .catch((err) => {
        console.error("Erro ao carregar experiência:", err);
        setErro('Não foi possível carregar esta experiência.');
      })
      .finally(() => setCarregando(false));
  }, [id]);

  const handleAdicionarAoRoteiro = () => {
    if (experiencia) {
      dispatch(adicionarItemAoRoteiro({
        id: experiencia.id,
        tipo: 'experiencia', // Pode ser dinâmico se tiver outros tipos
        nome: experiencia.nome,
        detalhes: experiencia.descricao_completa || experiencia.descricao_curta,
        // Adicione outros campos relevantes que você queira no roteiro
      }));
      alert(`"${experiencia.nome}" adicionado ao seu roteiro!`);
      navigate('/meu-roteiro'); // Redireciona para a página do roteiro
    }
  };

  const path = `/experiencias/${id}`;
  if (carregando) return <p style={{ padding: '20px' }}><Seo title="Experiência" path={path} />Carregando...</p>;
  if (erro || !experiencia) {
    return (
      <p style={{ padding: '20px', color: erro ? 'red' : undefined }}>
        <Seo title="Experiência não encontrada" path={path} noindex />
        {erro || 'Experiência não encontrada.'}
      </p>
    );
  }

  const descricaoSeo = experiencia.descricao_curta || experiencia.descricao_completa;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: experiencia.nome,
    description: descricaoSeo || undefined,
    url: absoluteUrl(path),
    address: {
      '@type': 'PostalAddress',
      addressLocality: experiencia.cidade || 'Nobres',
      addressRegion: 'MT',
      addressCountry: 'BR',
    },
    isAccessibleForFree: false,
  };

  // Função auxiliar para exibir campos, tratando valores nulos
  const campo = (valor) => valor ?? 'Informação em atualização';

  return (
    <div style={{ padding: '20px' }}>
      <Seo
        title={`${experiencia.nome} em Nobres (MT)`}
        description={descricaoSeo || undefined}
        path={path}
        type="article"
        jsonLd={jsonLd}
      />
      <Link to="/experiencias" style={{ textDecoration: 'none', color: 'blue' }}>← Voltar para experiências</Link>

      <div style={{ background: '#ddd', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '16px 0' }}>
        <span>Vídeo principal (em breve)</span>
      </div>

      <h1>{experiencia.nome}</h1>
      <p>{campo(experiencia.titulo_comercial)}</p>

      <div style={{ display: 'flex', gap: '8px', margin: '16px 0' }}>
        {/* Placeholder para galeria de fotos */}
        <div style={{ background: '#ddd', width: '100px', height: '80px' }} />
        <div style={{ background: '#ddd', width: '100px', height: '80px' }} />
        <div style={{ background: '#ddd', width: '100px', height: '80px' }} />
      </div>

      <h2>Sobre a experiência</h2>
      <p>{campo(experiencia.descricao_completa || experiencia.descricao_curta)}</p>

      <h2>O que você vai viver</h2>
      <p>{campo(experiencia.o_que_vai_viver)}</p>

      <h2>Informações rápidas</h2>
      <ul>
        <li>Localização: {campo(experiencia.localizacao || experiencia.cidade)}</li>
        <li>Distância: {experiencia.distancia_km ? `${experiencia.distancia_km} km` : campo(null)}</li>
        <li>Duração: {experiencia.duracao_minutos ? `${experiencia.duracao_minutos} minutos` : campo(experiencia.duracao_descricao)}</li>
        <li>Idade mínima: {experiencia.idade_minima ? `${experiencia.idade_minima} anos` : campo(null)}</li>
        <li>Dificuldade: {campo(experiencia.dificuldade)}</li>
      </ul>

      <h2>O que levar</h2>
      <p>{campo(experiencia.o_que_levar)}</p>

      <h2>Valor de referência</h2>
      <p>
        {experiencia.valor_referencia_adulto
          ? `A partir de R$ ${experiencia.valor_referencia_adulto} por adulto`
          : 'Consulte disponibilidade'}
      </p>
      <p style={{ fontSize: '0.85em', color: '#666' }}>
        Transporte, bebidas e despesas extras não incluídos. Valores sujeitos à disponibilidade e confirmação do fornecedor.
      </p>

      <button
        onClick={handleAdicionarAoRoteiro}
        style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
      >
        Adicionar ao meu roteiro
      </button>
    </div>
  );
}

export default ExperienciaDetalhe;