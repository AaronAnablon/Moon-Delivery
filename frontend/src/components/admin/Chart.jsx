import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { setHeaders, url } from '../../slices/api';

export default function Chart() {
  const auth = useSelector((state) => state.auth);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${url}/orders/seller-orders/${auth._id}/pending`,
          setHeaders()
        );
        const orders = response.data;

        setChartData({
          labels: ['Orders', 'Completed', 'For Pick Up', 'Cancelled'],
          datasets: [
            {
              label: '# of Votes',
              data: [orders.length, 1, 3, 4],
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
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [auth._id]);

  return <Doughnut data={chartData} />;
}
