import { Link } from 'react-router-dom';
import Seo from '../../components/SEO/Seo';
import { absoluteUrl } from '../../config/site';

const FAQ = [
  {
    pergunta: 'Preciso de agência para fazer os passeios em Nobres?',
    resposta:
      'Sim. Os passeios em Nobres são regulamentados pelo sistema de voucher único: a entrada nos atrativos é feita com voucher emitido por agência de turismo credenciada, comprado com antecedência.',
  },
  {
    pergunta: 'Qual a melhor época para visitar Nobres?',
    resposta:
      'De abril a outubro, no período de seca, quando os rios ficam mais cristalinos. Na época de chuvas a água pode ficar turva.',
  },
  {
    pergunta: 'Onde se hospedar em Nobres?',
    resposta:
      'A maior parte dos atrativos fica no distrito de Bom Jardim, a cerca de 65 km do centro de Nobres. Ficar em Bom Jardim reduz bastante o tempo de deslocamento.',
  },
  {
    pergunta: 'Como chegar a Nobres e Bom Jardim?',
    resposta:
      'O acesso mais comum é por Cuiabá, que fica a cerca de 140 a 150 km de Bom Jardim. Como os atrativos ficam em fazendas distantes entre si, é recomendável ter carro para se deslocar.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  url: absoluteUrl('/destino'),
  mainEntity: FAQ.map(({ pergunta, resposta }) => ({
    '@type': 'Question',
    name: pergunta,
    acceptedAnswer: { '@type': 'Answer', text: resposta },
  })),
};

function Destino() {
  return (
    <main style={{ padding: '20px' }}>
      <Seo
        title="Nobres e Bom Jardim (MT): como chegar, melhor época e voucher único"
        description="Guia de Nobres e Bom Jardim, em Mato Grosso: principais atrativos, voucher único obrigatório, melhor época, como chegar a partir de Cuiabá e onde se hospedar."
        path="/destino"
        jsonLd={jsonLd}
      />

      <h1>Nobres e Bom Jardim, Mato Grosso</h1>
      <p>
        Nobres, a cerca de 140 km de Cuiabá, e seu distrito de Bom Jardim são
        conhecidos pelas nascentes e rios de águas cristalinas, com peixes,
        cavernas, cachoeiras e grande variedade de aves.
      </p>

      <h2>Principais atrativos</h2>
      <ul>
        <li><strong>Aquário Encantado</strong>: nascente de água azul-turquesa com centenas de peixes, para contemplação e flutuação.</li>
        <li><strong>Rio Triste</strong>: flutuação com excelente visibilidade subaquática.</li>
        <li><strong>Cachoeira Serra Azul</strong>: queda d&apos;água de cerca de 46 metros em poço azul, na divisa com Rosário Oeste.</li>
        <li><strong>Lagoa das Araras</strong>: fim de tarde com araras-canindé pousando nos buritis.</li>
        <li><strong>Duto do Quebó</strong>: boia cross por um rio que atravessa uma caverna.</li>
        <li><strong>Balneário Estivado</strong>: rio raso e transparente, ideal para famílias.</li>
      </ul>
      <p>
        Veja todos os passeios em <Link to="/experiencias">Experiências</Link>.
      </p>

      <h2>Perguntas frequentes</h2>
      {FAQ.map(({ pergunta, resposta }) => (
        <section key={pergunta}>
          <h3>{pergunta}</h3>
          <p>{resposta}</p>
        </section>
      ))}

      <p>
        Pronto para escolher onde ficar? Veja as <Link to="/hospedagens">hospedagens</Link>.
      </p>
    </main>
  );
}

export default Destino;
