import { Link } from 'react-router-dom';
import Seo from '../../components/SEO/Seo';

function Home() {
  return (
    <main style={{ padding: '20px' }}>
      <Seo path="/" />

      <h1>Turismo em Nobres e Bom Jardim, Mato Grosso</h1>
      <p>
        Nobres e o distrito de Bom Jardim formam o principal polo de ecoturismo
        de águas cristalinas de Mato Grosso. Aqui você escolhe as experiências —
        flutuações, cachoeiras, balneários e observação de aves — e monta um
        roteiro com hospedagem em um só lugar.
      </p>

      <h2>Comece a planejar</h2>
      <ul>
        <li>
          <Link to="/destino">Destino</Link>: como chegar, melhor época, voucher
          único e onde se hospedar.
        </li>
        <li>
          <Link to="/experiencias">Experiências</Link>: Aquário Encantado, Rio
          Triste, Lagoa das Araras, Cachoeira Serra Azul e outros atrativos.
        </li>
        <li>
          <Link to="/hospedagens">Hospedagens</Link>: pousadas e hotéis em Bom
          Jardim e Nobres.
        </li>
        <li>
          <Link to="/meu-roteiro">Meu roteiro</Link>: organize datas,
          experiências e hospedagem da sua viagem.
        </li>
      </ul>
    </main>
  );
}

export default Home;
