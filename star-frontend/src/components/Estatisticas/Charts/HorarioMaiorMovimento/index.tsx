import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useGetCharts } from "../../../../hooks/api/useGetCharts";

interface VagaData {
  entrada: string;
  saida: string;
}

// Register the necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function HorariosDeMovimento({ endpoint }: { endpoint: string }) {
  const [movimentosPorHora, setMovimentosPorHora] = useState<Record<string, number>>({});

  useGetCharts({
    getEndpoint: endpoint,
    setEndpoint: (dados: VagaData[]) => {
      const contadorHoras: Record<string, number> = {};
      dados.forEach(({ entrada, saida }) => {
        const horaEntrada = new Date(entrada).getHours();
        const horaSaida = new Date(saida).getHours();

        contadorHoras[horaEntrada] = (contadorHoras[horaEntrada] || 0) + 1;
        contadorHoras[horaSaida] = (contadorHoras[horaSaida] || 0) + 1;
      });

      setMovimentosPorHora(contadorHoras);
    }
  });

  const labels = Object.keys(movimentosPorHora).map(Number).sort((a, b) => a - b).map(String);
  const dataValues = labels.map(hour => movimentosPorHora[hour] || 0);

  const data = {
    labels,
    datasets: [
      {
        label: 'Movimentos por Hora',
        data: dataValues,
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Hora do Dia',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Número de Movimentos',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: "95%", height: "300px" }}>
      <Bar data={data} options={options} />
    </div>
  );
}
