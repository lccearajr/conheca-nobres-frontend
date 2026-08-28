import { Link } from 'react-router-dom';

function ExperienciaCard({ experiencia }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '8px' }}>
      <h3>{experiencia.nome}</h3>
      <p>{experiencia.descricao_curta}</p>
      <p>Distância: {experiencia.distancia_km ?? '—'} km</p>
      <p>Idade mínima: {experiencia.idade_minima ?? '—'} anos</p>
      <Link to={`/experiencias/${experiencia.id}`}>Ver experiência</Link>
    </div>
  );
}

export default ExperienciaCard;