import React from 'react';
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

import { Line } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ date, pending, cancelled }) => {
  console.log(date)

  const options = {
    responsive: true,
    plugins: {
      legend: true,
      title: {
        display: true,
        text: 'Weekly Summary',
      },
    },
  };

  const day = date && date.map((order) =>
    `${order._id.year}-${order._id.month}-${order._id.day}`
  )
  const data = {
    labels: day,
    datasets: [{
      label: 'Orders of the week',
      data: date && date.map((order) =>
        order.count
      ),
      backgroundColor: 'aqua',
      borderColor: 'black',
      pointBorderColor: 'aqua',
      tension: 0.4,
    },],

  }
  return (
    <div>
      <Line options={options} data={data} />
    </div>
  )
};

export default LineChart;







