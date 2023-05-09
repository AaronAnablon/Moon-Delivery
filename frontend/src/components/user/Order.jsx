import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { setHeaders, url } from "../../slices/api";
import { useSelector } from "react-redux";

const Order = () => {
  const auth = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false)
  
  const fetchOrders = useCallback(async () => {
    setLoading(!loading)
    try {
      const res = await axios.get(`${url}/orders/find/${auth._id}/${encodeURIComponent('For Pick Up')}`, setHeaders());
      setOrders(res.data);
      setLoading(false)
    } catch (err) {
      setError(err.response.data);
    }
  }, [auth.token]);
  
  
  useEffect(() => {
         fetchOrders();
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
      {loading && <p>Loading...</p>}
          {error && <div>{error}</div>}
      <ul>
              {orders.length <= 0 ? <p>No Orders made</p> : orders.map((order) => (
          <li style={{ borderBottom: '1px solid black', marginBottom: '1px' }} key={order._id}>
              <p>Date Ordered: {new Date(order.createdAt).toLocaleString('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              timeZoneName: 'short',
            })}</p>
            <div style={{border: '1px 0 1px 0 solid black', background: 'lightgrey'}}>
            {order.products.map((order) => (<ul><p>Item/Items:</p>
            <li><p>Product Id:{order.productId}</p></li>
            <li><p>Quantity: {order.quantity}</p></li>
            </ul>
            ))}
            </div>
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
