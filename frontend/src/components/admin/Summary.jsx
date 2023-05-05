import Chart from "./Chart";
import LineChart from "./LineChart";
import { setHeaders, url } from "../../slices/api";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from 'moment';

const Summary = () => {
  const auth = useSelector(state => state.auth)
  const [orders, setOrders] = useState('')
  const [completedOrders, setCompletedOrders] = useState(0);
  const [cancelledOrders, setCancelledOrders] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [ordersByDate, setOrdersByDate] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${url}/orders/seller-orders/${auth._id}/pending`,
          setHeaders()
        );
          setOrders(response.data)
           } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [auth._id]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await axios.get(`${url}/orders/orders-by-status-and-date`, setHeaders());
        setCompletedOrders(response.data.completedOrders);
        setCancelledOrders(response.data.cancelledOrders);
        setPendingOrders(response.data.pendingOrders);
        setOrdersByDate(response.data.ordersByDate);
        } catch (err) {
        console.error(err);
      }
    }
    fetchOrders();
  }, []);

 
 
  return (
    <div style={{display: 'flex', flexWrap: 'wrap'}}>
      <Chart />
    <LineChart date={ordersByDate} pending={pendingOrders} cancelled={cancelledOrders}/>
      <div><h2>Recent Sales: </h2>{orders && orders.map((order) => 
      <li>
      <p>Customer Name:{order.name}</p>
      <p>Rider: {order.rider[0]}</p>
      <p>Total: {order.total}</p>
      </li>
      )}</div>
      <div>
      <h2>Orders by Status and Date</h2>
      <p>Completed Orders: {completedOrders}</p>
      <p>Cancelled Orders: {cancelledOrders}</p>
      <p>Pending Orders: {pendingOrders}</p>
      <h3>Orders by Date</h3>
      <ul>
        {ordersByDate.map((order) => (
          <li key={`${order._id.year}-${order._id.month}-${order._id.day}`}>{`${moment(
            `${order._id.year}-${order._id.month}-${order._id.day}`,
            'YYYY-M-D'
          ).format('MMMM D, YYYY')}: ${order.count}`}</li>
        ))}
      </ul>
    </div>
     </div>
  );
};

export default Summary;
