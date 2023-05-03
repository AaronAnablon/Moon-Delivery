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


const LineChart = (labels) => {

console.log(labels)
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
 
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };

  
  const today = new Date();
  const weeksAgo = Math.floor((today - labels[0]) / (7 * 24 * 60 * 60 * 1000));
  const monthsAgo = Math.floor((today - labels[0]) / (30 * 24 * 60 * 60 * 1000));
  
  let formatedDate;
  if (monthsAgo > 0) {
    formatedDate = labels.map((label) => {
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return `${monthNames[label.getMonth()]} ${label.getFullYear()}`;
    });
  } else if (weeksAgo > 0) {
    formatedDate =  labels.map((label) => `week ${weeksAgo - Math.floor((today - label) / (7 * 24 * 60 * 60 * 1000))}`);
  } else {
    formatedDate = labels.map((label) => label.toLocaleDateString());
  }
  
  const data = {
    labels: formatedDate,
    datasets: [
      {
        label: 'Canceled Orders',
        data: [100, 467,577,26,5768,2768,577,4767,266,2678],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Completed Orders',
        data: [1777, 278,5886,2577,566,267,5677,467,2677,2777],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Returned',
        data: [177, 278,586,277,566,267,567,467,2677,277],
        borderColor: 'rgb(53, 170, 235)',
        backgroundColor: 'rgba(56, 150, 240, 0.5)',
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default LineChart;
