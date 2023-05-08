import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { setHeaders, url } from "../../slices/api";
import { useSelector } from "react-redux";

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
      setOrders(res.data);
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


  return (
    <div>
      <h2>Orders</h2>
      {error && <div>{error}</div>}
      <ul>
        {orders.map((order) => (
          <li
            style={{ borderBottom: "1px solid black", marginBottom: "1px" }}
            key={order._id}
          >
            <img
              style={{ height: "90px", width: "80%" }}
              src={order.image}
              alt={order._id}
            />
            <p>ProductId: {order.products[0].productId}</p>
            <p>Items: {order.products[0].quantity}</p>
            <p>
              Date Ordered:{" "}
              {new Date(order.createdAt).toLocaleString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                timeZoneName: "short",
              })}
            </p>
            <p>Delivery Status: {order.delivery_status}</p>
            <p>Payment Status: {order.payment_status}</p>
            <p>Total: {order.total}</p>
            {selectedOrderId === order._id ? (
              <div>
                <label htmlFor="comment">Add a comment:</label>
                <input type="text" id="comment" value={comment} onChange={handleComment} />
              <div className="rating">
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
                <p>
                  {rating
                    ? `You rated: ${rating} stars`
                    : "Please rate this product"}
                </p>
              
              </div>  <button onClick={() => submitRating(order.products[0].productId, order._id)}>
                Submit Rating
              </button></div>
            ) : (
              <button onClick={() => setSelectedOrderId(order._id)}>
                Rate
              </button>
            )}
            <button onClick={() => updateOrder(order._id)}>
              Order Received
            </button>
         
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToRate;
