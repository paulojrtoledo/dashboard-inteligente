// src/components/charts/chartConfig.js
import { 
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend 
} from 'chart.js';

// Registra os componentes necessários do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Vendas por Produto',
    },
  },
  scales: {
    y: {
      beginAtZero: true
    }
  }
};

export const chartColors = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];