import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { setHeaders, url } from "../../slices/api";
import { useSelector } from "react-redux";
import { Card, Button } from "react-bootstrap";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const Order = () => {
  const auth = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false)

  const fetchOrders = useCallback(async () => {
    setLoading(!loading)
    try {
      const res = await axios.get(`${url}/orders/find/${auth._id}/${encodeURIComponent('For Pick Up')}`, setHeaders());
      setOrders((res.data).reverse());
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
      await axios.put(`${url}/orders/${auth._id}/${orderId}`, updatedOrder, setHeaders());
      fetchOrders();
    } catch (err) {
      //console.log(err)
    }
  };

  const formatDate = (date) => {
    return (new Date(date).toLocaleString('en-US', {
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
    <div >
      <h2>Orders</h2>
      {loading && <p>Loading...</p>}
      {!loading && orders.length === 0 ? (
        <>
        <p>No Orders made</p>
        <Link to="/shoppingPage">
        <FaArrowAltCircleLeft />
        <span>Continue Shopping</span>
      </Link></>
      ) : (
        orders.map((order) => (
          <Card className="border-bottom shadow p-4" key={order._id}>
            <div className="row border-bottom">
              <p className="col-8">Date Ordered: {formatDate(order.createdAt)}</p>
              <p className="col-4">Status: <span>{order.delivery_status}</span></p>
            </div>
            <Card.Title>Item/Items</Card.Title>
            {order.products.map((product) => (
              <Card key={product.productId}>
                <div className="row d-flex" >
                  <img className="col-4" style={{ width: '7rem', height: '100px' }} src={product.image} />
                  <div className="col-6">
                    <Card.Text>Product Id: <span>{product.productId}</span></Card.Text>
                    <Card.Text>Product Name: <span>{product.name}</span></Card.Text>
                  </div>
                  <div className="col-lg-2 col-6">
                    <Card.Text>Price: <span>{currency(product.price)}</span></Card.Text>
                    <Card.Text>Quantity: <span>{product.quantity}</span></Card.Text>
                  </div>
                </div>
              </Card>
            ))}
            <div className="row border-bottom">
              <Card.Text className="col-8">Payment Status: <span>{order.payment_status}</span></Card.Text>
              <Card.Text className="col-4">Total: <span>{currency(order.total)}</span></Card.Text>
            </div>
            <Button variant="danger" className="m-3" onClick={() => updateOrder(order._id)}>Cancel</Button>
          </Card>
        ))
      )}
    </div>

  );
};

export default Order;
