// hooks/useChartAnimationOptions.tsx
import { ChartOptions } from 'chart.js';

interface AnimationOptionsProps {
  duration?: number;
  displayLegend?: boolean;
  beginAtZero?: boolean;
  indexAxis?: 'x' | 'y'; // Para gráficos que precisam de eixo diferente
}

export function useChartAnimationOptions({
  duration = 500, // Valor padrão da duração
  displayLegend = true,
  beginAtZero = true,
  indexAxis = 'x',
}: AnimationOptionsProps): ChartOptions<'bar' | 'line'> {
  return {
    responsive: true,
    animation: {
      duration: duration, // Controla a duração da animação
    },
    plugins: {
      legend: {
        display: displayLegend, // Controla a exibição da legenda
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      x: indexAxis === 'x' ? { title: { display: true, text: 'Categoria' } } : undefined,
      y: {
        beginAtZero: beginAtZero,
        title: {
          display: true,
          text: 'Valor',
        },
      },
    },
    indexAxis: indexAxis, // Eixo dos gráficos de barra (vertical ou horizontal)
  };
}
