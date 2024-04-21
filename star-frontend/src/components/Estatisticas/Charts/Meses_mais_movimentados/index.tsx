import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';

// Registrando os componentes necessários do Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export function LineChart2({ endpoint }: { endpoint: string }) {
  const [vagas, setVagas] = useState([]);

  // Carrega dados das vagas do endpoint fornecido
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(endpoint);
        const data = await response.json();
        setVagas(data);
      } catch (error) {
        console.error('Erro ao buscar dados das vagas:', error);
      }
    };

    fetchData();
  }, [endpoint]);

  // Calculando as entradas por mês
  const countEntriesByMonth = (vagas: any[]) => {
    const monthCounts = new Array(12).fill(0);
    vagas.forEach(vaga => {
      const month = new Date(vaga.entrada).getMonth();
      monthCounts[month]++;
    });
    return monthCounts;
  };

  // Dados para o gráfico
  const data = {
    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    datasets: [
      {
        label: 'Entradas por Mês',
        data: countEntriesByMonth(vagas),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  // Opções do gráfico
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true
      },
      tooltip: {
        mode: 'index' as const, // Ensuring 'index' is treated as a literal type
        intersect: false,
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };
  

  return (
    <div style={{ width: '95%', height: '400px' }}>
      <Line data={data} options={options} />
    </div>
  );
}
