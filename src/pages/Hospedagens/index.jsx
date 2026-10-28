import { useEffect, useState } from 'react';
import { getHospedagens } from '../../services/hospedagens';
import HospedagemCard from '../../components/UI/HospedagemCard';
import Seo from '../../components/SEO/Seo';

const seo = (
  <Seo
    title="Onde ficar em Nobres e Bom Jardim: pousadas e hotéis"
    description="Pousadas, hotéis e chalés em Bom Jardim e Nobres (MT): distância da vila, capacidade, comodidades e faixa de diária para montar seu roteiro."
    path="/hospedagens"
  />
);

const Hospedagens = () => {
  const [hospedagens, setHospedagens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHospedagens = async () => {
      try {
        const data = await getHospedagens();
        setHospedagens(data);
      } catch (err) {
        setError('Erro ao carregar as hospedagens. Tente novamente mais tarde.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchHospedagens();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      {seo}
      <h1>Hospedagens em Nobres e Bom Jardim</h1>
      {loading && <p>Carregando hospedagens...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '20px',
            marginTop: '20px'
          }}
        >
          {hospedagens.length === 0 ? (
            <p>Nenhuma hospedagem encontrada.</p>
          ) : (
            hospedagens.map(h => (
              <HospedagemCard key={h.id} hospedagem={h} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Hospedagens;