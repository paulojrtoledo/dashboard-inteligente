// src/features/dashboard/Dashboard.jsx
import { useState } from 'react';
import useVendas from './hooks.dsb/useVendas';
import useInsights from './hooks.dsb/useInsights';
import ChartVendas from '../../components/charts/ChartVendas';
import FormVenda from './components.dsb/FormVenda';
import InsightCard from './components.dsb/InsightCard';
import { vendasService } from './services/api'; // ← Importe o serviço

function Dashboard() {
  const { vendas, loading, error, refetch } = useVendas();
  const { insights, loading: loadingInsights, error: errorInsights, fetchInsights } = useInsights();
  const [deleting, setDeleting] = useState(false);

  // Função para deletar venda
  const handleDeleteVenda = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir esta venda?')) {
      return;
    }

    setDeleting(true);
    try {
      // Use fetch diretamente para testar:
      const response = await fetch(`http://localhost:5000/vendas/${id}`, {
        method: 'DELETE',
      });

      console.log('vendasService:', vendasService);
      console.log('vendasService.delete existe?', typeof vendasService.delete);

      if (!response.ok) throw new Error('Erro ao deletar');

      refetch();
      fetchInsights();
    } catch (err) {
      console.error('Erro ao deletar venda:', err);
      alert('Erro ao excluir venda');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <div>Carregando vendas...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div className="dashboard">
      <h1>Dashboard Inteligente</h1>

      <FormVenda onVendaAdicionada={() => {
        refetch();
        fetchInsights();
      }} />

      <ChartVendas
        data={vendas}
        onDeleteVenda={handleDeleteVenda} // ← Passe a função como prop
      />

      <InsightCard
        insights={insights}
        loading={loadingInsights}
        error={errorInsights}
        onRefresh={fetchInsights}
      />
    </div>
  );
}

export default Dashboard;