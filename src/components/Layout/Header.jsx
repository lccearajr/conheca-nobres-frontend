import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <nav>
        <Link to="/">Descubra Nobres</Link>{' '}

        <Link to="/destino">Destino</Link>{' '}

        <Link to="/experiencias">Experiências</Link>{' '}

        <Link to="/hospedagens">Hospedagens</Link>{' '}

        <Link to="/meu-roteiro">Meu Roteiro</Link>
      </nav>
    </header>
  );
}

export default Header;
