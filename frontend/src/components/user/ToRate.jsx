import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { setHeaders, url } from "../../slices/api";
import { useSelector } from "react-redux";
import { Card, Button } from "react-bootstrap";

const ToRate = () => {
  const auth = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [comment, setComment] = useState("");

  const handleRating = (value) => {
    setRating(value);
  };
  const handleComment = (event) => {
    setComment(event.target.value);
  };

  const fetchOrders = useCallback(async () => {
    try {
      const res = await axios.get(
        `${url}/orders/findDelivered/${auth._id}`,
        setHeaders()
      );
      setOrders((res.data).reverse());
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
        delivery_status: "Completed",
        payment_status: "Paid",
        updated_at: new Date().toLocaleString(),
      };
      await axios.put(
        `${url}/orders/${auth._id}/${orderId}`,
        updatedOrder,
       setHeaders()
      );
      fetchOrders();
    } catch (err) {
      setError(err.response.data);
      console.log(err);
    }
  };
  const submitRating = async (_id , orderId) => {
    try {
      const editedProduct = {
        rating: { count: 1, rating: rating, comment: [comment, auth.name, rating]}
      };
        await axios.put(`${url}/products/submitRating/${_id}`, editedProduct, setHeaders());
        updateOrder(orderId)
        fetchOrders();
    } catch (error) {
      console.log(error);
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
      {error && <div>{error}</div>}
      <ul>
        {orders.map((order) => (
          <div className="row border-bottom" key={order._id}>  
          <p className="border-bottom">Date Ordered: {formatDate(order.createdAt)}</p>
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
                  <div>
                    {selectedOrderId === product.productId ? (
              <div>
                <div className="row border-bottom">
              <div className="rating col-6">
              <p>{rating ? `You rated: ${rating} stars` : "Please rate this product"}</p>
                {[...Array(5)].map((star, index) => {
                  const ratingValue = index + 1;
                  return (
                    <label key={index}>
                      <input
                        type="radio"
                        name="rating"
                        value={ratingValue}
                        onClick={() => handleRating(ratingValue)}
                      />
                      <span
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(null)}
                      >
                        {ratingValue <= (hover || rating) ? "\u2605" : "\u2606"}
                      </span>
                    </label>
                  );
                })}
              </div> 
              <div className="col-3">
                <label className="mb-4" htmlFor="comment">Add a comment:</label>
                <input  type="text" id="comment" value={comment} onChange={handleComment} />
                </div>
              </div> 
               <Button className="m-3" onClick={() => submitRating(product.productId, order._id)}>Submit Rating</Button>
              <Button className="m-3" onClick={() => setSelectedOrderId(!selectedOrderId)}>Cancel</Button>
              </div> ) : (<Button className="m-3" onClick={() => setSelectedOrderId(product.productId)}>Rate</Button>)}
                    </div>
                  </div>
                ))}
            </div>
          <div className="row border-bottom">
            <div className="col-9">
            <div>Delivery Status: {order.delivery_status}</div>
            <div>Payment Status: {order.payment_status}</div>
            </div>
            <div className="col-3">Total: {currency(order.total)}</div>
          </div>
              <Button onClick={() => updateOrder(order._id)}>
                Order Received
              </Button>
          
          </div>
        ))}
      </ul>
    </div>
  );
};

export default ToRate;
