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

export function MesesMaisMovimentados({ endpoint }: { endpoint: string }) {
  const [vagas, setVagas] = useState([]);

  // Use o hook para buscar os dados
  useGetCharts({ getEndpoint: endpoint, setEndpoint: setVagas });

  // Calculating entries by month
  const countEntriesByMonth = (vagas: any[]) => {
    const monthCounts = new Array(12).fill(0);
    vagas.forEach((vaga) => {
      const month = new Date(vaga.entrada).getMonth();
      monthCounts[month]++;
    });
    return monthCounts;
  };

  // Data for the chart
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
        data: countEntriesByMonth(vagas),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Options for the chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        mode: "index" as const, // Ensuring 'index' is treated as a literal type
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
