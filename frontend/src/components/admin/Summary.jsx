import Chart from "./Chart";
import LineChart from "./LineChart";
import { setHeaders, url } from "../../slices/api";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Summary = () => {
  const auth = useSelector(state => state.auth)
  const [orders, setOrders] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${url}/orders/income/${auth._id}`,
          setHeaders()
        );
          setOrders(response.data)
           } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [auth._id]);

  return (
    <div style={{display: 'flex', flexWrap: 'wrap'}}>
    <Chart />
      <LineChart />
    
      {orders && orders.map((order) => <p>{order.total}</p>)}
     </div>
  );
};

export default Summary;
