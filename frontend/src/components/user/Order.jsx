import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { setHeaders, url } from "../../slices/api";
import { useSelector } from "react-redux";
import { Card, Button } from "react-bootstrap";

const Order = () => {
  const auth = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false)
  
  const fetchOrders = useCallback(async () => {
    setLoading(!loading)
    try {
      const res = await axios.get(`${url}/orders/find/${auth._id}/${encodeURIComponent('For Pick Up')}`, setHeaders());
      setOrders(res.data);
      setLoading(false)
    } catch (err) {
      console(err.response.data);
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
      console.log(err)
    }
  };

  const formatDate = (date) =>{
    return( new Date(date).toLocaleString('en-US', {
   year: 'numeric',
   month: '2-digit',
   day: '2-digit',
   hour: '2-digit',
   minute: '2-digit',
   second: '2-digit',
   timeZoneName: 'short',
 }))
 }

 const currency = (price) => {
  return price.toLocaleString('en-PH', { style: 'currency', currency: 'PHP' })
 }

  return (
    <div>
    <h2>Orders</h2>
    {loading && <p>Loading...</p>}
    {orders.length <= 0 ? (
      <p>No Orders made</p>
    ) : (
      orders.map((order) => (
        <div className="border-bottom" key={order._id}>
          <div className="row border-bottom">
          <p className="col-8">Date Ordered: {formatDate(order.createdAt)}</p>
          <p className="col-4">Status: <span>{order.delivery_status}</span></p>
          </div>
          <div className="row border-bottom">
              {order.products.map((product) => (
                  <div key={product.productId}>
                    <Card.Title>Item/Items</Card.Title>
                    <div className="row border-bottom">
                    <img className="col-4 col-lg-6" style={{width: '7rem'}} src={product.image}/>
                    <div className="col-8">
                    <Card.Text>Product Id: <span>{product.productId}</span></Card.Text>
                    <Card.Text>Product Name: <span>{product.name}</span></Card.Text>
                    </div>
                    <div className="col-lg-1">
                    <Card.Text>Price: <span>{currency(product.price)}</span></Card.Text>
                    <Card.Text>Quantity: <span>{product.quantity}</span></Card.Text>
                  </div>
                  </div>
                  </div>
                ))}
            </div>
            <div className="row border-bottom">
              <Card.Text className="col-8">Payment Status: <span>{order.payment_status}</span></Card.Text>
              <Card.Text className="col-4">Total: <span>{currency(order.total)}</span></Card.Text>
            </div>
              <Button variant="danger" className="m-3" onClick={() => updateOrder(order._id)}>Cancel</Button>
        </div>
      ))
    )}
  </div>
  
  );
};

export default Order;
