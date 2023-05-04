import Chart from "./Chart";
import LineChart from "./LineChart";
import { useState, useEffect, useCallback } from "react";
import { setHeaders, url } from "../../slices/api";
import { useSelector } from "react-redux";
import axios from "axios";

const Summary = () => {
  const auth = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);
  const [data, setData] = useState("");

  const fetchOrders = useCallback(async () => {
    try {
      const res = await axios.get(
        `${url}/orders/seller-orders/${auth._id}/pending`,
        setHeaders()
      );
      setOrders(res.data);
      console.log("fetchOrders:", orders)
    } catch (err) {
      console.log(err);
      console.log(err.response.data);
    }
  }, [auth._id]);

  useEffect(() => {
    fetchOrders();
    
  }, []);

  useEffect(() => {
   setData(orders.map((order) => order.createdAt))
  
    }, [orders]);

  return (
    <>
      <Chart />
  {orders.length > 0 && <LineChart labels={data} />}
    </>
  );
};

export default Summary;
