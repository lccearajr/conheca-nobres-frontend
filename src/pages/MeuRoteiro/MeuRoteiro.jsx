// src/pages/MeuRoteiro/MeuRoteiro.jsx
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  adicionarItemAoRoteiro,
  removerItemDoRoteiro,
  limparRoteiro,
  setViagemId,
  setStatus,
  setError,
  iniciarNovoRoteiro,
  reordenarItensRoteiro,
  removerHospedagem, // Importe a ação para remover hospedagem
} from '../../store/slices/roteiroSlice';

// Importações do dnd-kit
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Componente ItemSortable para cada item da lista
function ItemSortable({ item, onRemove }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    userSelect: 'none',
    padding: '8px',
    margin: '0 0 8px 0',
    backgroundColor: 'lightgray',
    borderRadius: '4px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '10px',
  };

  const handleRemoveClick = (event) => {
    event.preventDefault();
    event.stopPropagation();

    onRemove(item.id);
  };

  return (
    <li ref={setNodeRef} style={style}>
      <span style={{ flex: 1 }}>
        {item.nome} ({item.tipo})
      </span>

      <button
        type="button"
        onClick={handleRemoveClick}
        style={{ marginLeft: '10px' }}
      >
        Remover
      </button>

      <button
        type="button"
        {...attributes}
        {...listeners}
        aria-label={`Mover ${item.nome}`}
        title="Arraste para reordenar"
        style={{
          cursor: 'grab',
          padding: '4px 8px',
        }}
      >
        ☰
      </button>
    </li>
  );
}

const MeuRoteiro = () => {
  const roteiro = useSelector((state) => state.roteiro);
  const dispatch = useDispatch();

  // Desestruturar a hospedagemSelecionada do estado do roteiro
  const { hospedagemSelecionada } = roteiro;

  const [localDataEntrada, setLocalDataEntrada] = useState('');
  const [localDataSaida, setLocalDataSaida] = useState('');

  // Configuração dos sensores para DndContext
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Efeito para carregar o roteiro do localStorage na montagem do componente
  useEffect(() => {
    const roteiroSalvo = localStorage.getItem('roteiro');
    if (roteiroSalvo) {
      try {
        const parsedRoteiro = JSON.parse(roteiroSalvo);
        // Dispatch iniciarNovoRoteiro com os dados salvos
        dispatch(iniciarNovoRoteiro({
          dataEntrada: parsedRoteiro.dataEntrada,
          dataSaida: parsedRoteiro.dataSaida,
          itens: parsedRoteiro.itens,
          hospedagemSelecionada: parsedRoteiro.hospedagemSelecionada,
          viagemId: parsedRoteiro.viagemId,
        }));
        setLocalDataEntrada(parsedRoteiro.dataEntrada);
        setLocalDataSaida(parsedRoteiro.dataSaida);
      } catch (error) {
        console.error('Erro ao parsear roteiro do localStorage:', error);
        // Se houver erro, inicializa com datas padrão
        const hoje = new Date();
        const dataEntradaPadrao = hoje.toISOString().split('T')[0];
        const dataSaidaPadrao = new Date(hoje.setDate(hoje.getDate() + 7)).toISOString().split('T')[0];
        setLocalDataEntrada(dataEntradaPadrao);
        setLocalDataSaida(dataSaidaPadrao);
        dispatch(iniciarNovoRoteiro({
          dataEntrada: dataEntradaPadrao,
          dataSaida: dataSaidaPadrao,
        }));
      }
    } else {
      // Se não houver roteiro salvo, inicializa com datas padrão
      const hoje = new Date();
      const dataEntradaPadrao = hoje.toISOString().split('T')[0];
      const dataSaidaPadrao = new Date(hoje.setDate(hoje.getDate() + 7)).toISOString().split('T')[0];
      setLocalDataEntrada(dataEntradaPadrao);
      setLocalDataSaida(dataSaidaPadrao);
      dispatch(iniciarNovoRoteiro({
        dataEntrada: dataEntradaPadrao,
        dataSaida: dataSaidaPadrao,
      }));
    }
  }, [dispatch]); // Executa apenas na montagem do componente

  // Efeito para salvar o roteiro no localStorage sempre que ele mudar
  useEffect(() => {
    try {
      localStorage.setItem('roteiro', JSON.stringify(roteiro));
    } catch (erro) {
      console.error('Erro ao salvar roteiro localmente:', erro);
    }
  }, [roteiro]); // Dependência do objeto roteiro

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    if (name === 'dataEntrada') {
      setLocalDataEntrada(value);
      dispatch(iniciarNovoRoteiro({ dataEntrada: value, dataSaida: roteiro.dataSaida, itens: roteiro.itens, hospedagemSelecionada: roteiro.hospedagemSelecionada, viagemId: roteiro.viagemId }));
    } else if (name === 'dataSaida') {
      setLocalDataSaida(value);
      dispatch(iniciarNovoRoteiro({ dataEntrada: roteiro.dataEntrada, dataSaida: value, itens: roteiro.itens, hospedagemSelecionada: roteiro.hospedagemSelecionada, viagemId: roteiro.viagemId }));
    }
  };

  const handleAdicionarItem = () => {
    const novoItem = {
      id: Math.random().toString(36).substr(2, 9), // IDs precisam ser strings para dnd-kit
      tipo: 'experiencia',
      nome: `Experiência Aleatória ${roteiro.itens.length + 1}`,
      detalhes: 'Detalhes da experiência',
    };
    dispatch(adicionarItemAoRoteiro(novoItem));
  };

  const handleRemoverItem = (itemId) => {
    dispatch(removerItemDoRoteiro({ id: itemId }));
  };

  const handleLimparRoteiro = () => {
    localStorage.removeItem('roteiro'); // Remove do localStorage
    dispatch(limparRoteiro()); // Limpa o estado Redux

    // Reinicializa as datas no estado local e Redux
    const hoje = new Date();
    const dataEntradaPadrao = hoje.toISOString().split('T')[0];
    const dataSaidaPadrao = new Date(hoje.setDate(hoje.getDate() + 7)).toISOString().split('T')[0];

    setLocalDataEntrada(dataEntradaPadrao);
    setLocalDataSaida(dataSaidaPadrao);

    dispatch(
      iniciarNovoRoteiro({
        dataEntrada: dataEntradaPadrao,
        dataSaida: dataSaidaPadrao,
        itens: [],
      })
    );
  };

  const handleSalvarRoteiro = async () => {
    dispatch(setStatus('carregando'));
    dispatch(setError(null));
    try {
      if (!roteiro.dataEntrada || !roteiro.dataSaida) {
        throw new Error('Os campos Data de Entrada e Data de Saída são obrigatórios.');
      }

      console.log('Salvando roteiro:', roteiro);
      const response = await fetch('http://localhost:3000/viagens', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data_inicio: roteiro.dataEntrada,
          data_fim: roteiro.dataSaida,
          cliente_id: roteiro.clienteId || null,
          valor_total: 0, // Este valor será calculado no backend ou atualizado depois
          status: 'planejamento',
          // Incluir hospedagem e itens do roteiro aqui quando o backend estiver pronto
          hospedagem_id: hospedagemSelecionada ? hospedagemSelecionada.id : null,
          itens_roteiro: roteiro.itens.map(item => ({
            tipo: item.tipo,
            id_referencia: item.id, // ID da experiência, hospedagem ou transporte
            nome: item.nome,
            // Adicionar outros campos relevantes para o backend
          })),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.erro || 'Erro ao salvar roteiro no backend.');
      }

      const novaViagem = await response.json();
      dispatch(setViagemId(novaViagem.id));
      dispatch(setStatus('sucesso'));
      alert('Roteiro salvo com sucesso! ID da Viagem: ' + novaViagem.id);
    } catch (error) {
      console.error('Erro ao salvar roteiro:', error);
      dispatch(setError(error.message));
      dispatch(setStatus('erro'));
      alert('Erro ao salvar roteiro: ' + error.message);
    }
  };

  // Função para reordenar os itens após o drag-and-drop com dnd-kit
  function handleDragEnd(event) {
    const { active, over } = event;

    // Adicionado: verifica se 'over' existe antes de comparar IDs
    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = roteiro.itens.findIndex(item => item.id === active.id);
    const newIndex = roteiro.itens.findIndex(item => item.id === over.id);

    // Adicionado: verifica se os índices são válidos
    if (oldIndex === -1 || newIndex === -1) {
      return;
    }

    const newItems = Array.from(roteiro.itens);
    const [reorderedItem] = newItems.splice(oldIndex, 1);
    newItems.splice(newIndex, 0, reorderedItem);

    dispatch(reordenarItensRoteiro(newItems));
  }

  // Função auxiliar para formatar valores monetários
  const formatarValor = (valor) => {
    if (valor === null || valor === undefined) {
      return 'Não informado';
    }
    return Number(valor).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Meu Roteiro</h1>

      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="dataEntrada">Data de Entrada:</label>
        <input
          type="date"
          id="dataEntrada"
          name="dataEntrada"
          value={localDataEntrada}
          onChange={handleDateChange}
          style={{ marginLeft: '10px', marginRight: '20px' }}
        />

        <label htmlFor="dataSaida">Data de Saída:</label>
        <input
          type="date"
          id="dataSaida"
          name="dataSaida"
          value={localDataSaida}
          onChange={handleDateChange}
          style={{ marginLeft: '10px' }}
        />
      </div>

      <div style={{ marginTop: '20px', border: '1px solid #eee', padding: '15px', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
        <p><strong>Data de Entrada (Redux):</strong> {roteiro.dataEntrada || 'Não definida'}</p>
        <p><strong>Data de Saída (Redux):</strong> {roteiro.dataSaida || 'Não definida'}</p>
        <p><strong>ID da Viagem (Backend):</strong> {roteiro.viagemId || 'Não salvo'}</p>
        <p><strong>Status:</strong> {roteiro.status}</p>
        {roteiro.erro && <p style={{ color: 'red' }}><strong>Erro:</strong> {roteiro.erro}</p>}
      </div>

      {/* Seção para exibir a hospedagem selecionada */}
      <div style={{ marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
        <h2>Hospedagem Selecionada:</h2>
        {hospedagemSelecionada ? (
          <div style={{
            border: '1px solid #ccc',
            padding: '15px',
            borderRadius: '8px',
            backgroundColor: '#e6ffe6', // Cor de fundo para hospedagem
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <div>
              <h3>{hospedagemSelecionada.nome}</h3>
              <p>Tipo: {hospedagemSelecionada.tipo_acomodacao}</p>
              <p>Diária: {formatarValor(hospedagemSelecionada.valor_diaria_min)} até {formatarValor(hospedagemSelecionada.valor_diaria_max)}</p>
              <p>Distância da vila: {hospedagemSelecionada.distancia_vila_km} km</p>
            </div>
            <button
              onClick={() => dispatch(removerHospedagem())}
              style={{
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                padding: '8px 12px',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Remover
            </button>
          </div>
        ) : (
          <p>Nenhuma hospedagem selecionada ainda.</p>
        )}
      </div>

      <h2 style={{ marginTop: '20px' }}>Itens do Roteiro:</h2>
      {roteiro.itens.length === 0 ? (
        <p>Nenhum item adicionado ao roteiro ainda.</p>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={roteiro.itens.map(item => item.id)} // Passa apenas os IDs dos itens
            strategy={verticalListSortingStrategy}
          >
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {roteiro.itens.map((item) => (
                <ItemSortable key={item.id} item={item} onRemove={handleRemoverItem} />
              ))}
            </ul>
          </SortableContext>
        </DndContext>
      )}

      <div style={{ marginTop: '20px' }}>
        <button onClick={handleAdicionarItem} style={{ padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Adicionar Item Fictício</button>
        <button onClick={handleLimparRoteiro} style={{ marginLeft: '10px', padding: '10px 15px', backgroundColor: '#ffc107', color: 'black', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Limpar Roteiro</button>
        <button onClick={handleSalvarRoteiro} style={{ marginLeft: '10px', padding: '10px 15px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }} disabled={roteiro.status === 'carregando'}>
          {roteiro.status === 'carregando' ? 'Salvando...' : 'Salvar Roteiro no Backend'}
        </button>
      </div>
    </div>
  );
};

export default MeuRoteiro;