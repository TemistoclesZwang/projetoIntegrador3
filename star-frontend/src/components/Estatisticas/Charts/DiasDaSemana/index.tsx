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
import {useChartAnimationOptions} from "../../../../components/Estatisticas/Charts/Animations";


interface VagaData {
  entrada: string;
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

interface DiasDaSemanaMaisUsadosProps {
  endpoint: string;
  onDataUpdate: (data: Record<string, number>) => void; // Nova prop
}

export function DiasDaSemanaMaisUsados({
  endpoint,
  onDataUpdate, // Recebe a nova prop
}: DiasDaSemanaMaisUsadosProps) {
  const [contagemDias, setContagemDias] = useState<Record<string, number>>({});

  useGetCharts({
    getEndpoint: endpoint,
    setEndpoint: (dados: VagaData[]) => {
      const contadorDias: Record<string, number> = {};
      dados.forEach(({ entrada }) => {
        const dia = new Date(entrada).toLocaleString('pt-BR', { weekday: 'long' });
        contadorDias[dia] = (contadorDias[dia] || 0) + 1;
      });
      setContagemDias(contadorDias);
      onDataUpdate(contadorDias); // Atualiza o pai com os dados
    }
  });

  const daysOfWeek = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];
  const dataValues = daysOfWeek.map(day => contagemDias[day] || 0);

  const data = {
    labels: daysOfWeek,
    datasets: [
      {
        label: 'Número de Entradas por Dia da Semana',
        data: dataValues,
        backgroundColor: 'rgba(255, 159, 64, 0.5)',
        borderColor: 'rgb(255, 159, 64)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    animation: {
      duration: 200, // Controla a duração da animação
    },
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
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Número de Entradas',
        },
      },
    },
  };

  return (
    <div style={{ width: "95%", height: "300px" }}>
      <Bar data={data} options={options} />
    </div>
  );
}
