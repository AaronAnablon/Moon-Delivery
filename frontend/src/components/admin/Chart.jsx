import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Chart({ orders, completed, forPickUp, cancelled }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Summary',
      },
    },
  };

  const labels = ['Orders', 'Completed', 'For Pick Up', 'Cancelled'];
  const data = {
    labels: labels,
    datasets: [
      {
        data: [orders, completed, forPickUp, cancelled],
        backgroundColor: ['orange', 'green', 'yellow', 'red'],
        borderColor: ['orange', 'green', 'yellow', 'red'],
      },
    ],
  };

  return <Doughnut data={data} options={options} />;
}
