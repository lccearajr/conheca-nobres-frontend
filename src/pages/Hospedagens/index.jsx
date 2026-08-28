import React, { useEffect, useState } from 'react';
import { getHospedagens } from '../../services/hospedagens';
import HospedagemCard from '../../components/UI/HospedagemCard';

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

  if (loading) return <div style={{ padding: '20px' }}>Carregando hospedagens...</div>;
  if (error)   return <div style={{ padding: '20px', color: 'red' }}>{error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Nossas Hospedagens</h1>
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
    </div>
  );
};

export default Hospedagens;