import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { setHeaders, url } from "../../slices/api";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const PickUp = () => {
  const auth = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = useCallback(async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${url}/orders/rider/${auth._id}/For Pick Up`, setHeaders());
      setOrders((res.data).reverse());
      setLoading(false)
    } catch (err) {
      console.log(err)
      toast.error("Something went wrong!!")
      setLoading(false)
    }
  }, [auth.token]);

  useEffect(() => {
      fetchOrders();
  }, []);

  const updateOrder = async (orderId) => {
    try {
      const updatedOrder = {
        delivery_status: 'Delivered',
        payment_status: 'Paid',
        updated_at: new Date().toLocaleString()
      }
      await axios.put(`${url}/orders/${auth._id}/${orderId}`, updatedOrder, setHeaders());
      fetchOrders();
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <div>
      <h2>Pick Up</h2>
      {loading && <p>Loading...</p>}
      {orders && orders.length === 0 && <p>No booking found</p>}
      <ul>
        {orders && orders.map((order) => (
          <li style={{ borderBottom: '1px solid black', marginBottom: '1px' }} key={order._id}>
            <p>Order Number: {order._id}</p>
            <p>Client ID: {order.name}</p>
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
            <p>Pick Up Locaction: {order.shipping.address1}</p>
            <p>Dropping Location: {order.shipping.address2}</p>
            <p>Delivery Status: {order.delivery_status}</p>
            <p>Payment Status: {order.payment_status}</p>
            <p>Total: {order.total}</p>
            <button onClick={() => updateOrder(order._id)}>Delivered</button>
          </li>
        ))}

      </ul>
    </div>
  );
};

export default PickUp;
