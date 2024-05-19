import React from "react";
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
import { useGetCharts } from "../../../../hooks/api/useGetCharts"; // Ajuste o caminho conforme necessário

interface Vaga {
  entrada: string;
  valor: string;
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

export function ValorPorMes({ endpoint }: { endpoint: string }) {
  // Adição de tipagem específica para o estado dos dados
  const [dados, setDados] = React.useState<Vaga[]>([]);

  // Use o hook para buscar os dados
  useGetCharts({ getEndpoint: endpoint, setEndpoint: setDados });

  // Calculating total value earned each month
  const valorPorMes = (dados: Vaga[]) => {
    const valoresMes = new Array(12).fill(0);
    dados.forEach((vaga) => {
      const mes = new Date(vaga.entrada).getMonth();
      valoresMes[mes] += parseFloat(vaga.valor);
    });
    return valoresMes;
  };

  // Prepare data for the chart
  const dadosMeses = valorPorMes(dados);
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
        label: "Valor Total por Mês (R$)",
        data: dadosMeses,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
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
