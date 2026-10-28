// src/store/slices/roteiroSlice.js

import { createSlice } from '@reduxjs/toolkit';

const roteiroSalvo = (() => {
  // No prerender (Node) não existe localStorage.
  if (typeof localStorage === 'undefined') return null;
  try {
    const dados = localStorage.getItem('roteiro');

    return dados ? JSON.parse(dados) : null;
  } catch (erro) {
    console.error('Erro ao carregar roteiro salvo:', erro);
    return null;
  }
})();

const roteiroSlice = createSlice({
  name: 'roteiro',

initialState: {
  viagemId: roteiroSalvo?.viagemId || null,
  dataEntrada: roteiroSalvo?.dataEntrada || null,
  dataSaida: roteiroSalvo?.dataSaida || null,
  itens: Array.isArray(roteiroSalvo?.itens)
    ? roteiroSalvo.itens
    : [],
  hospedagemSelecionada: roteiroSalvo?.hospedagemSelecionada || null,
  status: 'ocioso',
  erro: null,
},

  reducers: {
    iniciarNovoRoteiro: (state, action) => {
      state.viagemId = null;
      state.dataEntrada = action.payload.dataEntrada;
      state.dataSaida = action.payload.dataSaida;

      if (action.payload.itens !== undefined) {
        state.itens = action.payload.itens;
      }

      state.status = 'ocioso';
      state.erro = null;
    },

    adicionarItemAoRoteiro: (state, action) => {
      state.itens.push(action.payload);
    },

    removerItemDoRoteiro: (state, action) => {
      state.itens = state.itens.filter(
        (item) => item.id !== action.payload.id
      );
    },

    selecionarHospedagem: (state, action) => {
      state.hospedagemSelecionada = action.payload;
    },

    removerHospedagem: (state) => {
      state.hospedagemSelecionada = null;
    },

    setViagemId: (state, action) => {
      state.viagemId = action.payload;
    },

    setStatus: (state, action) => {
      state.status = action.payload;
    },

    setError: (state, action) => {
      state.erro = action.payload;
    },

    carregarRoteiroExistente: (state, action) => {
      state.viagemId = action.payload.viagemId;
      state.dataEntrada = action.payload.dataEntrada;
      state.dataSaida = action.payload.dataSaida;
      state.itens = action.payload.itens || [];
      state.hospedagemSelecionada =
        action.payload.hospedagemSelecionada || null;
      state.status = 'sucesso';
      state.erro = null;
    },

    limparRoteiro: (state) => {
      state.viagemId = null;
      state.dataEntrada = null;
      state.dataSaida = null;
      state.itens = [];
      state.hospedagemSelecionada = null;
      state.status = 'ocioso';
      state.erro = null;
    },

    reordenarItensRoteiro: (state, action) => {
      state.itens = action.payload;
    },
  },
});

export const {
  iniciarNovoRoteiro,
  adicionarItemAoRoteiro,
  removerItemDoRoteiro,
  selecionarHospedagem,
  removerHospedagem,
  setViagemId,
  setStatus,
  setError,
  carregarRoteiroExistente,
  limparRoteiro,
  reordenarItensRoteiro,
} = roteiroSlice.actions;

export default roteiroSlice.reducer;