// src/features/dashboard/hooks.dsb/useVendas.js
import { useState, useEffect } from 'react';
import { vendasService } from '../services/api';

// Este hook gerencia o estado das vendas (loading, error, data)
function useVendas() {
  // 1. Estados do React para gerenciar loading, erro e dados
  const [vendas, setVendas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. Função assíncrona para buscar vendas
  const fetchVendas = async () => {
    try {
      setLoading(true);
      setError(null);
      // 3. Faz a chamada para a API usando nosso serviço
      const response = await vendasService.getAll();
      // 4. Atualiza o estado com os dados recebidos
      setVendas(response.data);
    } catch (err) {
      // 5. Se der erro, captura a mensagem
      setError(err.message);
      console.error('Erro ao buscar vendas:', err);
    } finally {
      // 6. Finaliza o loading, tanto no sucesso quanto no erro
      setLoading(false);
    }
  };

  // 7. useEffect para buscar vendas quando o componente for montado
  useEffect(() => {
    fetchVendas();
  }, []); // Array vazio [] = executa apenas uma vez

  // 8. Retorna os estados e a função para recarregar dados
  return { vendas, loading, error, refetch: fetchVendas };
}

export default useVendas;