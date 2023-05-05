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
import { setHeaders, url } from '../../slices/api';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';


  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

const LineChart = () => {

  const auth = useSelector((state) => state.auth);
  const [ordered, setOrders] = useState({});
  const [pending, setPending] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${url}/orders/seller-orders/${auth._id}/pending`,
          setHeaders()
        );
        setPending(response.data)
        const orders = response.data.length;
         setOrders(orders)
           } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [auth._id]);

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

    

  const data = {
    labels: pending && pending.map((order) =>
    new Date(order.createdAt).toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
       })
  ),
    datasets: [{
      label: 'Orders of the week',
      data: pending && pending.map((order, index) =>
      index ),
      backgroundColor: 'aqua',
      borderColor: 'black', 
      pointBorderColor: 'aqua',
      tension: 0.4,
    },  {
      label: 'Cancelled this week',
      data: pending && pending.map((order, index) =>
     index),
      backgroundColor: 'red',
      borderColor: 'black', 
      pointBorderColor: 'aqua',
      tension: 0.4,
    },],
  
  }
  
 

  return (
  <div>
    <Line options={options} data={data} />

    {pending && pending.filter(order => order.
delivery_status === "pending").length}
     </div>
         )
};

export default LineChart;
