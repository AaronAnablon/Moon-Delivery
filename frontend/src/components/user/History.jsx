import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { setHeaders, url } from "../../slices/api";
import { useSelector } from "react-redux";
import { Button, Card } from "react-bootstrap";
import CurrencyFormat from "../formatters/CurrencyFormat";
import DateFormat from "../formatters/DateFormat";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const History = () => {
  const auth = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false)

  const fetchOrders = useCallback(async () => {
    setLoading(true)
    try {
      const res = await axios.get(
        `${url}/orders/findCompleted/${auth._id}`,
        setHeaders()
      );
      setOrders((res.data).reverse());
      setLoading(false)
    } catch (err) {
      console.log(err.response.data);
      toast.error('Something Went wrong!!')
      setLoading(false)
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
        console.log(err)
        toast.error('Something Went wrong!!')
      }
    }
  };

  return (
    <div>
      <h2>Purchase History</h2>
      {loading && <p>Loading...</p>}
      {!loading && orders.length === 0 &&         <>
        <p>No Orders made</p>
        <Link to="/shoppingPage">
        <FaArrowAltCircleLeft />
        <span>Continue Shopping</span>
      </Link></>}
         <div className="m-2">
        {orders.map((order) => (
          <Card className="row ml-2 border-bottom shadow mb-3" key={order._id}> 
          <div className="row border-bottom">
          <p className="col-lg-6">Date Ordered: {DateFormat(order.createdAt)}</p>
          <p className="col-lg-6">Date Completed: {DateFormat(order.updatedAt)}</p>
          </div>
        {order.products.map((product) => (
                  <div key={product.productId}>
                    <Card.Title>Item/Items</Card.Title>
                    <div className="row border-bottom">
                    <img className="col-4 col-lg-6" style={{width: '7rem', height: '100px'}} src={product.image}/>
                    <div className="col-6">
                    <Card.Text>Product Id: <span>{product.productId}</span></Card.Text>
                    <Card.Text>Product Name: <span>{product.name}</span></Card.Text>
                    </div>
                    <div className="col-lg-2">
                    <Card.Text>Price: <span>{CurrencyFormat(product.price)}</span></Card.Text>
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
            <Button variant="danger"  className="col-3 col-lg-2 m-3" onClick={() => deleteOrder(order._id)}>Delete</Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default History;
