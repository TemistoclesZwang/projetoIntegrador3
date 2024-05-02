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
  vaga: string;
  duracao: number;
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

export function MediaTempoVaga({ endpoint }: { endpoint: string }) {
  const [mediaPorVaga, setMediaPorVaga] = useState<Record<string, number>>({});

  useGetCharts({
    getEndpoint: endpoint,
    setEndpoint: (dados: VagaData[]) => {
      const totais: Record<string, { total: number; count: number }> = {};
      dados.forEach(({ vaga, duracao }) => {
        if (!totais[vaga]) {
          totais[vaga] = { total: 0, count: 0 };
        }
        totais[vaga].total += duracao;
        totais[vaga].count += 1;
      });
      const medias = Object.keys(totais).reduce((acc, vaga) => {
        acc[vaga] = totais[vaga].total / totais[vaga].count;
        return acc;
      }, {} as Record<string, number>);
      setMediaPorVaga(medias);
    }
  });

  const labels = Object.keys(mediaPorVaga);
  const dataValues = Object.values(mediaPorVaga);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Média de Tempo por Vaga (minutos)',
        data: dataValues,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: 'y' as const,  // Orient the chart to have the Y axis as the category axis
    responsive: true,
    plugins: {
      legend: {
        display: false,  // Optionally hide the legend if it's not necessary
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      x: {
        min: 0,  // Ensures the scale starts from zero
        title: {
          display: true,
          text: 'Duração Média (minutos)',
        },
      },
    },
  };

  return (
    <div style={{ width: "95%", height: "400px" }}>
      <Bar data={data} options={options} />
    </div>
  );
}
