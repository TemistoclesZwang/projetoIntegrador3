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

interface Vaga {
  placa: string;
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

export function PlacasMaisUsadas({ endpoint }: { endpoint: string }) {
  const [placas, setPlacas] = useState<Record<string, number>>({});

  // Modificação aqui para usar o useGetCharts
  useGetCharts({
    getEndpoint: endpoint,
    setEndpoint: (dados: Vaga[]) => {
      const contadorPlacas = dados.reduce((acc, curr) => {
        acc[curr.placa] = (acc[curr.placa] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      setPlacas(contadorPlacas);
    }
  });

  // Preparing the data for the chart
  const labels = Object.keys(placas);
  const dataValues = Object.values(placas);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Frequência de Uso de Placas',
        data: dataValues,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        borderColor: 'rgb(53, 162, 235)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      y: {
        // beginAtZero: false,
        min: 2,
      },
    },
  };

  return (
    <div style={{ width: "95%", height: "300px" }}>
      <Bar data={data} options={options} />
    </div>
  );
}