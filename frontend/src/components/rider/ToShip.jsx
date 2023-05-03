import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { setHeaders, url } from "../../slices/api";
import { useSelector } from "react-redux";

const ToShip = () => {
  const auth = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  const fetchOrders = useCallback(async () => {
    try {
      const res = await axios.get(`${url}/orders/rider/${auth._id}/For Delivery`, {
        headers: {
          "x-auth-token": auth.token,
        },
      });
      setOrders(res.data);
    } catch (err) {
      console.log(err)
      setError(err.response.data);
    }
  }, [auth.token]);
  
  
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);
  const rider = [auth.name, auth._id]
  const updateOrder = async (orderId) => {
    try {
      const updatedOrder = {
        delivery_status: 'For Pick Up',
        payment_status: 'Cash on Delivery',
        rider: rider,
        updated_at: new Date().toLocaleString()
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

  if (orders.length === 0) return null;

  return (
    <div>
      <h2>ToShip</h2>
      {error && <div>{error}</div>}
      <ul>
      {orders && orders.map((order) => (
          <li style={{ borderBottom: '1px solid black', marginBottom: '1px' }} key={order._id}>
            <p>Client ID: {order.userId}</p>
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
             <p>Pick Up Loaction: {order.shipping.address1}</p>
            <p>Dropping Location: {order.shipping.address2}</p>
            <p>Delivery Status: {order.delivery_status}</p>
            <p>Payment Status: {order.payment_status}</p>
            <p>Total: {order.total}</p>
            <button onClick={() => updateOrder(order._id)}>Accept Delivery</button>
          </li>
        ))}
     
      </ul>
    </div>
  );
};

export default ToShip;
