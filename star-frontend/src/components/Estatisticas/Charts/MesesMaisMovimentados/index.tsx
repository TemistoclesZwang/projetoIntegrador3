import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { useAuth } from "../../../../context/Auth/index";
import { useGetCharts } from "../../../../hooks/api/useGetCharts";

// Register the necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface MesesMaisMovimentadosProps {
  endpoint: string;
  onDataUpdate: (data: Record<string, number>) => void;
}

export function MesesMaisMovimentados({ endpoint, onDataUpdate }: MesesMaisMovimentadosProps) {
  const [vagas, setVagas] = useState([]);

  useGetCharts({ getEndpoint: endpoint, setEndpoint: setVagas });

  const countEntriesByMonth = (vagas: any[]) => {
    const monthCounts = new Array(12).fill(0);
    vagas.forEach((vaga) => {
      const month = new Date(vaga.entrada).getMonth();
      monthCounts[month]++;
    });
    return monthCounts;
  };

  const dataEntries = countEntriesByMonth(vagas);
  const data = {
    labels: [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ],
    datasets: [
      {
        label: "Entradas por Mês",
        data: dataEntries,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Atualiza os dados no componente pai
  React.useEffect(() => {
    const formattedData = data.labels.reduce((acc, label, index) => {
      acc[label] = dataEntries[index];
      return acc;
    }, {} as Record<string, number>);
    onDataUpdate(formattedData);
  }, [dataEntries]);

  const options = {
    responsive: true,
    animation: {
      duration: 100, // Controla a duração da animação
    },
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: "95%", height: "300px" }}>
      <Line data={data} options={options} />
    </div>
  );
}
