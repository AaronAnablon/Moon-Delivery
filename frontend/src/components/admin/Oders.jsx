import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { setHeaders, url } from "../../slices/api";
import { useSelector } from "react-redux";

const Orders = () => {
  const auth = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false)

  const fetchOrders = useCallback(async () => {
    setLoading(!loading)
    try {
      const res = await axios.get(`${url}/orders/seller-orders/${auth._id}/pending`, setHeaders());
      setOrders(res.data);
      setLoading(false)
    } catch (err) {
      console.log(err)
      setError(err.response.data);
    }
  }, [auth.token]);
  
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);
  
  const updateOrder = async (orderId) => {
    try {
      const updatedOrder = {
        delivery_status: 'For Delivery',
        payment_status: 'Cash on Delivery',
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

  const callRider = (RiderNumber) => {
    window.open(`tel:${RiderNumber}`);
  }
  const callClient = (ClientNumber) => {
    window.open(`tel:${ClientNumber}`);
  }

  return (
    <div>
      <h2>Orders</h2>
      {loading && <p>Loading..</p>}
      {error && <div>{error}</div>}
      <ul style={{display: 'flex', flexWrap: 'wrap'}}>
      {orders && orders.map((order) => (
          <li style={{  borderColor: 'white', borderWidth: '12px', borderStyle: 'solid' }} key={order._id}>
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
            <p>Delivery Status: {order.delivery_status}</p>
            <p>Payment Status: {order.payment_status}</p>
            <p>Total: {order.total}</p>
            {order.delivery_status === 'For Pick Up' ? 
            <p><button onClick={() => callRider(order.shipping.phoneNumber)}>Call Rider</button>
            <button onClick={() => callClient(order.shipping.phoneNumber)}>Call Client</button></p>: 
            <button onClick={() => updateOrder(order._id)}>Request Delivery</button>}
          </li>
        ))}
     
      </ul>
    </div>
  );
};

export default Orders;
