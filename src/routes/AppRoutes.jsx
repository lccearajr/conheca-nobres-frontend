import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Destino from '../pages/Destino';
import Experiencias from '../pages/Experiencias';
import ExperienciaDetalhe from '../pages/Experiencias/Detalhe';
import MeuRoteiro from '../pages/MeuRoteiro/MeuRoteiro';
import Hospedagens from '../pages/Hospedagens';
import HospedagemDetalhe from '../pages/Hospedagens/Detalhe';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/destino" element={<Destino />} />

      <Route path="/experiencias" element={<Experiencias />} />
      <Route
        path="/experiencias/:id"
        element={<ExperienciaDetalhe />}
      />

      <Route path="/hospedagens" element={<Hospedagens />} />
      <Route
        path="/hospedagens/:id"
        element={<HospedagemDetalhe />}
      />

      <Route path="/meu-roteiro" element={<MeuRoteiro />} />
    </Routes>
  );
}

export default AppRoutes;