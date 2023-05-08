import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { setHeaders, url } from "../../slices/api";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Orders = () => {
  const auth = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false)
  const [sortedBrand, setSortedBrand] = useState("");

  const fetchOrders = useCallback(async () => {
    setLoading(!loading)
    try {
      const res = await axios.get(`${url}/orders/seller-orders/${auth._id}/pending`, setHeaders());
      setOrders(res.data);
      setLoading(false)
    } catch (err) {
      console.log(err)
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
        console.log(err)
    }
  };

  const callRider = (RiderNumber) => {
    window.open(`tel:${RiderNumber}`);
  }
  const callClient = (ClientNumber) => {
    window.open(`tel:${ClientNumber}`);
  }

  const handleSortByBrand = (brand) => {
    setSortedBrand(brand);
  };

  const filteredData = sortedBrand
    ? orders?.filter((order) => order.delivery_status === sortedBrand)
    : orders;
 
  return (
    <div>
      <h2 style={{top: 0}}>Orders</h2>
      <nav>
      <ul style={{listStyle: 'none', display: 'flex', flexDirection: 'row', 
      justifyContent: 'center', alignItems: 'center', position: 'sticky', 
      top: 0}}>

          <li style={{marginInline: '20px'}}>
              <Link to="/admin/orders" onClick={() => handleSortByBrand("")}>
              All
              </Link>
            </li>
          <li style={{marginInline: '20px'}}>
              <Link to="/admin/orders" onClick={() => handleSortByBrand("pending")}>
              Pending
              </Link>
            </li>
            <li style={{marginInline: '20px'}}>
              <Link to="/admin/orders" onClick={() => handleSortByBrand("Delivered")}>
                Delivered
              </Link>
            </li>
            <li style={{marginInline: '20px'}}>
              <Link to="/admin/orders" onClick={() => handleSortByBrand("For Pick Up")}>
              For Pick Up
              </Link>
            </li>
            <li style={{marginInline: '2px'}}>
              <Link to="/admin/orders" onClick={() => handleSortByBrand("Cancelled")}>
              Cancelled
              </Link>
            </li>
          </ul>
        </nav>
        <div>
      {loading && <p>Loading..</p>}
         <ul className="products">
      {filteredData && filteredData.map((order) => (
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
            order.delivery_status === 'Delivered' ? null :
            <button onClick={() => updateOrder(order._id)}>Request Delivery</button>}
          </li>
        ))}
     
      </ul>
      </div>
    </div>
  );
};

export default Orders;
