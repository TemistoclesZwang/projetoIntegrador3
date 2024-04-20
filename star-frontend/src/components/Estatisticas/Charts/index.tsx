import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables, ChartArea, ScriptableContext } from 'chart.js';
Chart.register(...registerables);

export function LineChart() {
  // Função para criar um gradiente
  const getGradient = (ctx: CanvasRenderingContext2D, chartArea: ChartArea): CanvasGradient => {
    const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    gradient.addColorStop(0, 'rgba(255, 99, 132, 0.8)');  // Vermelho
    gradient.addColorStop(0.33, 'rgba(75, 192, 192, 0.8)'); // Verde-Água
    gradient.addColorStop(0.66, 'rgba(255, 206, 86, 0.8)'); // Amarelo
    gradient.addColorStop(1, 'rgba(153, 102, 255, 0.8)'); // Roxo
    return gradient;
  };

  // Dados para o gráfico
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Monthly Sales',
        data: [65, 59, 80, 81, 56, 55],
        fill: true,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
        backgroundColor: function(context: ScriptableContext<'line'>) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          // Verifica se chartArea está disponível
          if (!chartArea) {
            // Retorna uma cor sólida padrão se chartArea não estiver disponível
            return 'rgba(75, 192, 192, 0.8)'; 
          }

          return getGradient(ctx, chartArea);
        }
      }
    ]
  };

  // Opções para o gráfico
  const options = {
    plugins: {
      legend: {
        display: true,
        labels: {
          color: 'rgb(255, 99, 132)'
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div style={{ width: '95%', height: '100%' }}>
      {/* <h2>Line Chart Example</h2> */}
      <Line data={data} options={options} />
    </div>
  );
}
