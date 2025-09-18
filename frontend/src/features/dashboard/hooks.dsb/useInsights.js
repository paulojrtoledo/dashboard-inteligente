// src/features/dashboard/hooks.dsb/useInsights.js
import { useState } from 'react';
import { insightsService } from '../services/api';

function useInsights() {
  const [insights, setInsights] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchInsights = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await insightsService.getInsights();
      setInsights(response.data.insights || response.data);
    } catch (err) {
      setError(err.message);
      console.error('Erro ao buscar insights:', err);
    } finally {
      setLoading(false);
    }
  };

  return { insights, loading, error, fetchInsights };
}

export default useInsights;