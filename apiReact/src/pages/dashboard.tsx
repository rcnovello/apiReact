import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface VoteData {
  date: string;
  candidate: string;
  votes: number;
}


interface Props {
  data: {
    CD_PESQUISA: string;
    DT_PESQUISA: string;
    NM_MUNICIPIO: string;
    NM_ESTADO: string;
    CD_CANDIDATO: string;
  }[];
}

const VoteTrendsChart: React.FC<Props> = ({ data }) => {
  const transformedData: VoteData[] = data.map(item => ({
    date: item.DT_PESQUISA,
    candidate: item.CD_CANDIDATO,
    votes: 1 
  }));

  // Extrair candidatos e datas únicas
  const candidates = Array.from(new Set(transformedData.map(item => item.candidate)));
  const dates = Array.from(new Set(transformedData.map(item => item.date)));

  // Criar datasets para o gráfico
  const datasets = candidates.map(candidate => ({
    label: candidate,
    data: dates.map(date => 
      transformedData.filter(item => item.date === date && item.candidate === candidate).length // Contar votos
    ),
    borderColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    borderWidth: 2,
    fill: false,
  }));

  const chartData = {
    labels: dates,
    datasets,
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Evolução Temporal das Intenções de Voto',
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default VoteTrendsChart;