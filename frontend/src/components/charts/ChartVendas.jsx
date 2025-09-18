// src/components/charts/ChartVendas.jsx
import { Bar } from 'react-chartjs-2';
import { chartOptions, chartColors } from './ChartConfig';

function ChartVendas({ data, onDeleteVenda }) { // ← Adicione onDeleteVenda como prop
  if (!data || data.length === 0) {
    return (
      <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto', textAlign: 'center', padding: '40px' }}>
        <h2>Gráfico de Vendas</h2>
        <p>Nenhum dado de venda disponível.</p>
      </div>
    );
  }

  const chartData = {
    labels: data.map(venda => venda.produto),
    datasets: [
      {
        label: 'Valor Total em Vendas (R$)',
        data: data.map(venda => venda.valor * (venda.quantidade || 1)), // ✅ CORRIGIDO!
        backgroundColor: chartColors,
      },
    ],
  };

  return (
    <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Gráfico de Vendas</h2>

      {/* Lista de vendas com botão de delete */}
      <div style={{ margin: '20px 0' }}>
        <h3>Vendas Registradas:</h3>
        {data.map((venda) => (
          <div key={venda.id} style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            margin: '5px 0'
          }}>
            <span>
              <strong>{venda.produto}</strong> - R$ {venda.valor}
              {venda.quantidade > 1 && ` (${venda.quantidade} unidades)`}
            </span>
            <button
              onClick={() => onDeleteVenda(venda.id)}
              style={{
                background: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '5px 10px',
                cursor: 'pointer'
              }}
            >
              🗑️ Excluir
            </button>
          </div>
        ))}
      </div>

      {/* Gráfico */}
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}

export default ChartVendas;