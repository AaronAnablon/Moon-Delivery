import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { setHeaders, url } from '../../slices/api';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Chart() {
  const auth = useSelector((state) => state.auth);
  const [ordered, setOrders] = useState({});
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(!loading)
      try {
        const response = await axios.get(
          `${url}/orders/seller-orders/${auth._id}/pending`,
          setHeaders(),
          setLoading(false)
        );
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
      text: 'Summary',
    },
  },
}
const labels = ['Orders', 'Completed', 'For Pick Up', 'Cancelled']
const data = {
  labels: labels,
  datasets: [{
    data: [ordered,3, 2,4],
    backgroundColor: ['orange', 'green', 'yellow', 'red'],
    borderColor: ['orange', 'green', 'yellow', 'red']
  }]
}
  return (
  <div>
    {loading && <p>Loading...</p>} 
    <Doughnut 
        data={data} 
        options = {options}
        />
        </div>
 )
}
