import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { setHeaders, url } from "../../slices/api";
import { useSelector } from "react-redux";
import { Button, Card } from "react-bootstrap";

const History = () => {
  const auth = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  const fetchOrders = useCallback(async () => {
    try {
      const res = await axios.get(
        `${url}/orders/findCompleted/${auth._id}`,
        setHeaders()
      );
      setOrders(res.data);
    } catch (err) {
      setError(err.response.data);
    }
  }, [auth.token]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const deleteOrder = async (orderId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this order?");
    if (confirmDelete) {
      try {
        const updatedOrder = {
          delivery_status: 'Deleted',
          payment_status: 'Paid',
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
 }))
 }

 const currency = (price) => {
  return price.toLocaleString('en-PH', { style: 'currency', currency: 'PHP' })
 }

  return (
    <div>
      <h2>Purchase History</h2>
      {error && <div>{error}</div>}
      <div>
        {orders.map((order) => (
          <div className="row border-bottom" key={order._id}> 
          <div className="row border-bottom">
          <p className="col-lg-6">Date Ordered: {formatDate(order.createdAt)}</p>
          <p className="col-lg-6">Date Completed: {formatDate(order.updatedAt)}</p>
          </div>
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
             <div className="row border-bottom mt-3">
            <Card.Text className="col-12 col-lg-6">Delivery Status: {order.delivery_status}</Card.Text>
            <Card.Text className="col-6 col-lg-4">Payment Status: {order.payment_status}</Card.Text>
            <Card.Text className="col-6 col-lg-2">Total: {order.total}</Card.Text>
            </div>
            <Button className="col-3 col-lg-2 m-3" onClick={() => deleteOrder(order._id)}>Delete</Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
