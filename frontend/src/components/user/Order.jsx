import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { setHeaders, url } from "../../slices/api";
import { useSelector } from "react-redux";

const Order = () => {
  const auth = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  
  const fetchOrders = useCallback(async () => {
    try {
      const res = await axios.get(`${url}/orders/find/${auth._id}/${encodeURIComponent('For Pick Up')}`, setHeaders());
      setOrders(res.data);
    } catch (err) {
      setError(err.response.data);
    }
  }, [auth.token]);
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchOrders();
    }, 3000); // call getBooking every 5 seconds
    return () => clearInterval(intervalId); // cleanup function to clear the interval when component unmounts
  }, []);
  
  const updateOrder = async (orderId) => {
    try {
      const updatedOrder = {
        delivery_status: 'Cancelled',
        }
      await axios.put(`${url}/orders/${auth._id}/${orderId}`, updatedOrder, {
        headers: {
          'x-auth-token': auth.token
        }
      });
      fetchOrders();
    } catch (err) {
      setError(err.response.data);
      console.log(err)
    }
  };

  return (
    <div>
      <h2>Orders</h2>
      {error && <div>{error}</div>}
      <ul>
        {orders.map((order) => (
          <li style={{ borderBottom: '1px solid black', marginBottom: '1px' }} key={order._id}>
            <p>ProductId: {order.products[0].productId}</p>
            <p>Items: {order.products[0].quantity}</p>
            <p>Date Ordered: {new Date(order.createdAt).toLocaleString('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              timeZoneName: 'short',
            })}</p>
            <p>Delivery Status: {order.delivery_status}</p>
            <p>Payment Status: {order.payment_status}</p>
            <p>Total: {order.total}</p>
           
             <button onClick={() => updateOrder(order._id)} >Cancel</button>
           </li>
        ))}
     
      </ul>
    </div>
  );
};

export default Order;
