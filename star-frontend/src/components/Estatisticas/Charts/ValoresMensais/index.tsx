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


interface ValorPorMesProps {
  endpoint: string;
  onDataUpdate: (data: Record<string, number>) => void;
}

export function ValorPorMes({ endpoint, onDataUpdate }: ValorPorMesProps) {
  const [dados, setDados] = React.useState<Vaga[]>([]);

  useGetCharts({ getEndpoint: endpoint, setEndpoint: setDados });

  const valorPorMes = (dados: Vaga[]) => {
    const valoresMes = new Array(12).fill(0);
    dados.forEach((vaga) => {
      const mes = new Date(vaga.entrada).getMonth();
      valoresMes[mes] += parseFloat(vaga.valor);
    });
    return valoresMes;
  };

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

  // Atualiza os dados do gráfico
  React.useEffect(() => {
    const formattedData = data.labels.reduce((acc, label, index) => {
      acc[label] = dadosMeses[index];
      return acc;
    }, {} as Record<string, number>);
    onDataUpdate(formattedData);
  }, [dadosMeses]);

  const options = {
    responsive: true,
    animation: {
      duration: 200, // Controla a duração da animação
    },
    plugins: {
      legend: { display: true },
      tooltip: { mode: "index" as const, intersect: false },
    },
    scales: {
      y: { min: 2 },
    },
  };

  return (
    <div style={{ width: "95%", height: "300px" }}>
      <Bar data={data} options={options} />
    </div>
  );
}