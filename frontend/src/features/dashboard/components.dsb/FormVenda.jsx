// src/features/dashboard/components.dsb/FormVenda.jsx
import { useState } from 'react';

function FormVenda({ onVendaAdicionada }) {
  // 1. Estado para controlar os campos do formulário
  const [formData, setFormData] = useState({
    produto: '',
    valor: '',
    quantidade: '',
    cliente: '',
    regiao: 'N/A',
    vendedor: 'N/A'
  });

  // 2. Estado para loading e erro
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 3. Função para atualizar o estado quando campos mudam
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 4. Função para enviar os dados para o backend
  const handleSubmit = async (e) => {
    e.preventDefault(); // Impede o recarregamento da página
    setLoading(true);
    setError(null);

    try {
      // Converter valor para número
      const vendaParaEnviar = {
        ...formData,
        valor: Number(formData.valor),
        quantidade: formData.quantidade ? Number(formData.quantidade) : 1 // ← Se vazio, usa 1 como padrão
      };

      // Fazer a requisição POST
      const response = await fetch('http://localhost:5000/vendas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vendaParaEnviar)
      });

      if (!response.ok) throw new Error('Erro ao adicionar venda');

      // Limpar formulário e recarregar dados
      setFormData({
        produto: '',
        valor: '',
        quantidade: '',
        cliente: '',
        regiao: 'N/A',
        vendedor: 'N/A'
      });

      // 5. Notificar o componente pai que uma nova venda foi adicionada
      if (onVendaAdicionada) onVendaAdicionada();

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ margin: '20px 0', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h3>Adicionar Nova Venda</h3>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            name="produto"
            placeholder="Produto"
            value={formData.produto}
            onChange={handleChange}
            required
            style={{ marginRight: '10px', padding: '8px' }}
          />
          <input
            type="number"
            name="valor"
            placeholder="Valor"
            value={formData.valor}
            onChange={handleChange}
            required
            style={{ marginRight: '10px', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <input
            type="number"
            name="quantidade"
            placeholder="Quantidade"
            value={formData.quantidade}
            onChange={handleChange}
            style={{ marginRight: '10px', padding: '8px', width: '120px' }}
          />
          <input
            type="text"
            name="cliente"
            placeholder="Cliente"
            value={formData.cliente}
            onChange={handleChange}
            required
            style={{ marginRight: '10px', padding: '8px' }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '10px 20px',
            backgroundColor: loading ? '#ccc' : '#4f46e5',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Adicionando...' : 'Adicionar Venda'}
        </button>

        {error && <p style={{ color: 'red', marginTop: '10px' }}>Erro: {error}</p>}
      </form>
    </div>
  );
}

export default FormVenda;