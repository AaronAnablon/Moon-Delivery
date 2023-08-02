import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { setHeaders, url } from "../../slices/api";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  FcCalendar,
  FcTodoList,
  FcPodiumWithSpeaker,
  FcMoneyTransfer,
  FcDeployment,
  FcViewDetails,
  FcGlobe,
  FcAssistant
} from "react-icons/fc";
import { HiOutlineClipboardDocumentCheck } from "react-icons/hi2";
import { Button, Card } from "react-bootstrap";
import CurrencyFormat from "../formatters/CurrencyFormat";
import DateFormat from "../formatters/DateFormat";
import Loading from "../Loading";

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
      //console.log(err)
      toast.error("Something went wrong!!")
      setLoading(false)
    }
  }, [auth.token]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const DateFormatDb = (date) => {
    return (new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }))
  }

  const updateOrder = async (orderId, products) => {
    try {
      const updatedProducts = products.map(product => ({
        ...product,
        deliveryStatus: 'Delivered'
      }));
  
      const updatedOrder = {
        $set: {
          products: updatedProducts,
        },
        delivery_status: 'Delivered',
        payment_status: 'Paid',
        updated_at: DateFormatDb(new Date())
      };
  
      await axios.put(`${url}/orders/${auth._id}/${orderId}`, updatedOrder, setHeaders());
      fetchOrders();
    } catch (err) {
      //console.log(err)
    }
  };
  

  return (
    <div>
      <h2>Pick Up</h2>
      {loading && <Loading />}
      {orders && orders.length === 0 && <p>No booking found</p>}

      {orders && orders.map((order) => (
        <div className="p-3 mb-2 shadow" key={order._id}>
          <div className="d-md-flex bg-info border-bottom">
            <Card.Text className="col-md-6 text-wrap col-12"><FcCalendar size={28} /> Date Ordered: {DateFormat(order.createdAt)}</Card.Text>
            <Card.Text className="col-md-6 text-wrap col-12"><FcTodoList size={28} /> Order Number: {order._id}</Card.Text>
          </div>
          <Card.Text><FcDeployment size={28} /> Items:
            {order.products.map((product) => (
              <div className="border p-3">
                <div className="d-md-flex">
                  <Card.Text className="col-md-6 text-wrap col-12">Seller: {product.sellerName}</Card.Text>
                  <Card.Text className="col-md-6 text-wrap col-12">📞 Seller: 🟢{product.sellerNumber}</Card.Text>
                </div>
                <Card.Text><FcAssistant size={28} /> Pick Up Location: {product.address}</Card.Text>
                <div className="d-md-flex">
                  <Card.Text className="col-md-6 text-wrap col-12">Product: {product.name}</Card.Text>
                  <Card.Text className="col-md-6 text-wrap col-12">Subtotal: {CurrencyFormat(product.price)}</Card.Text>
                </div>
                <Card.Text className="col-md-6 text-wrap col-12"><FcTodoList size={28} /> Delivery Status: {product.deliveryStatus}</Card.Text>
              </div>
            ))}</Card.Text>
          <div className="d-md-flex border-bottom">
            <Card.Text className="col-md-6 text-wrap col-12"><FcPodiumWithSpeaker size={28} /> Client Name: {order.name}</Card.Text>
            <Card.Text className="col-md-6 text-wrap col-12">📞 Client Phone Number: 🟢{order.shipping.phoneNumber}</Card.Text>
          </div>
          <div className="d-md-flex border-bottom">
            <Card.Text className="col-md-6 text-wrap col-12"><FcGlobe size={28} /> Dropping Location: {order.shipping.address2}</Card.Text>
            <img className="col-12 col-md-6 " style={{ width: '7rem', height: '100px' }} src={order.image} />
          </div>
       
          <div className="d-md-flex border-bottom">
            <Card.Text className="col-md-6 text-wrap col-12"><FcViewDetails size={28} /> Payment Status: {order.payment_status}</Card.Text>
          </div>
          <Card.Text className="col-md-6 text-wrap col-12"><FcMoneyTransfer size={28} /> Total: {CurrencyFormat(order.total)}</Card.Text>

          <div className="d-md-flex justify-content-end mt-2">
            <Button onClick={() => updateOrder(order._id, order.products)}><HiOutlineClipboardDocumentCheck size={24} /> Delivered</Button>
          </div>
        </div>
      ))}


    </div>
  );
};

export default PickUp;
