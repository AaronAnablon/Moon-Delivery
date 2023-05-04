import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['Orders', 'Completed', 'For Pick Up', 'Cancelled'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5,],
      backgroundColor: [
        'rgb(255, 165, 0)',
        'rgb(60, 179, 113)',
        'rgb(56, 255, 255)',
        'rgb(255, 0, 0)',
       ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
       ],
      borderWidth: 1,
    },
  ],
};

export default function Chart() {
  return <Doughnut data={data} />;
}
