// src/features/dashboard/components.dsb/InsightCard.jsx
function InsightCard({ insights, loading, error, onRefresh }) {
  if (loading) return <div className="insight-card loading">Gerando insights...</div>;
  if (error) return <div className="insight-card error">Erro: {error}</div>;

  return (
    <div className="insight-card">
      <div className="insight-header">
        <h3>💡 Insights Inteligentes</h3>
        <button onClick={onRefresh} disabled={loading}>
          🔄
        </button>
      </div>
      <div className="insight-content">
        {insights ? (
          <p>{insights}</p>
        ) : (
          <p>Clique no botão para gerar insights com base nas vendas.</p>
        )}
      </div>
    </div>
  );
}

export default InsightCard;