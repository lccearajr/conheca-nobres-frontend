import { useEffect, useState } from 'react';
import { getExperienciasByCategoria } from '../../services/experiencias'; // Importa a função correta
import ExperienciaCard from '../../components/UI/ExperienciaCard';
import { CATEGORIAS } from '../../utils/categorias'; // Assumindo que CATEGORIAS é um array de objetos { id, nome }
import Seo from '../../components/SEO/Seo';

function Experiencias() {
  const [experiencias, setExperiencias] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null); // null para "Todas"

  useEffect(() => {
    setCarregando(true);
    setErro(null);

    const fetchExperiencias = async () => {
      try {
        const dados = await getExperienciasByCategoria(categoriaSelecionada); // Usa a função padronizada
        setExperiencias(dados);
      } catch (err) {
        setErro('Não foi possível carregar as experiências.');
        console.error(err);
      } finally {
        setCarregando(false);
      }
    };

    fetchExperiencias();
  }, [categoriaSelecionada]); // Dependência para recarregar quando a categoria muda

  return (
    <div style={{ padding: '20px' }}>
      <Seo
        title="Passeios e experiências em Nobres e Bom Jardim"
        description="Flutuações, cachoeiras, balneários, boia cross e contemplação em Nobres e Bom Jardim (MT). Compare duração, distância, idade mínima e valores de referência."
        path="/experiencias"
      />
      <h1>Experiências em Nobres e Bom Jardim</h1>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
        <button
          onClick={() => setCategoriaSelecionada(null)} // Botão para "Todas" as categorias
          style={{
            fontWeight: categoriaSelecionada === null ? 'bold' : 'normal',
            padding: '8px 12px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer',
            backgroundColor: categoriaSelecionada === null ? '#e0e0e0' : '#f0f0f0',
          }}
        >
          Todas
        </button>
        {CATEGORIAS.map((cat) => (
          <button
            key={cat.id} // Use cat.id como key
            onClick={() => setCategoriaSelecionada(cat.id)}
            style={{
              fontWeight: categoriaSelecionada === cat.id ? 'bold' : 'normal',
              padding: '8px 12px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              cursor: 'pointer',
              backgroundColor: categoriaSelecionada === cat.id ? '#e0e0e0' : '#f0f0f0',
            }}
          >
            {cat.nome}
          </button>
        ))}
      </div>

      {carregando && <p>Carregando experiências...</p>}
      {erro && <p style={{ color: 'red' }}>{erro}</p>}

      {!carregando && !erro && experiencias.length === 0 && (
        <p>Nenhuma experiência encontrada para a categoria selecionada.</p>
      )}

      {!carregando && !erro && experiencias.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '16px', marginTop: '20px' }}>
          {experiencias.map((exp) => (
            <ExperienciaCard key={exp.id} experiencia={exp} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Experiencias;