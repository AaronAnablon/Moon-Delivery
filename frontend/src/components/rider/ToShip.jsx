import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { setHeaders, url } from "../../slices/api";
import { useSelector } from "react-redux";
import { Button, Card } from "react-bootstrap";
import {
  FcCalendar,
  FcServices,
  FcTodoList,
  FcInTransit,
  FcNightPortrait,
  FcPodiumWithSpeaker,
  FcPortraitMode,
  FcMoneyTransfer,
  FcDeployment,
  FcViewDetails,
  FcShop,
  FcGlobe,
  FcAssistant
} from "react-icons/fc";
import { GiFullMotorcycleHelmet } from "react-icons/gi";
import { HiOutlineClipboardDocumentCheck } from "react-icons/hi2";
import { IoTrashBinOutline } from "react-icons/io5";

const ToShip = () => {
  const auth = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = useCallback(async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${url}/orders/rider/${auth._id}/For Delivery`, setHeaders());
      setOrders((res.data).reverse());
      setLoading(false)
    } catch (err) {
      console.log(err)
    }
  }, [auth.token]);


  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);
  const rider = [auth.name, auth._id]
  const updateOrder = async (orderId) => {
    try {
      const updatedOrder = {
        delivery_status: 'For Pick Up',
        payment_status: 'Cash on Delivery',
        rider: rider,
        updated_at: new Date().toLocaleString()
      }
      await axios.put(`${url}/orders/${auth._id}/${orderId}`, updatedOrder, setHeaders());
      fetchOrders();
    } catch (err) {
      console.log(err)
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
    <div className="shadow">
      <h2>ToShip</h2>
      {loading && <p>Loading...</p>}
      {orders && orders.length === 0 && <p>No order found</p>}
        {orders && orders.map((order) => (
          <Card className="border-bottom col-12 p-4 shadow" key={order._id}>
            <div className="d-md-flex border-bottom"> 
            <Card.Text className="col-md-6 col-12"><FcCalendar size={28} /> Date Ordered: {formatDate(order.createdAt)}</Card.Text>
            <Card.Text className="col-md-6 col-12"><FcServices size={28} /> Order Number: {order._id}</Card.Text>
            </div>
            <div className="d-md-flex border-bottom"> 
            <Card.Text className="col-md-6 col-12"><FcPodiumWithSpeaker size={28} /> Client Name: {order.name}</Card.Text>
            <Card.Text className="col-md-6 col-12">📞 Client Phone Number: 🟢{order.shipping.phoneNumber}</Card.Text>
            </div>
            <div className="d-md-flex border-bottom"> 
            <Card.Text className="col-md-6 col-12"><FcDeployment size={28} /> Product No. : {order.products[0].productId}</Card.Text>
            <Card.Text className="col-md-6 col-12"><FcTodoList size={28} /> Item/Items: {order.products[0].quantity}</Card.Text>
            </div>
            <div className="d-md-flex border-bottom"> 
            <Card.Text className="col-md-6 col-12"><FcAssistant size={28} /> Pick Up Location: {order.shipping.address1}</Card.Text>
            <Card.Text className="col-md-6 col-12"><FcGlobe size={28} /> Dropping Location: {order.shipping.address2}</Card.Text>
            </div>
            <div className="d-md-flex border-bottom"> 
            <Card.Text className="col-md-6 col-12"><FcTodoList size={28} /> Delivery Status: {order.delivery_status}</Card.Text>
            <Card.Text className="col-md-6 col-12"><FcViewDetails size={28} /> Payment Status: {order.payment_status}</Card.Text>
           </div>
            <Card.Text><FcMoneyTransfer size={28} /> Total: {currency(order.total)}</Card.Text>
            <div className="d-flex justify-content-end mt-2">
            <Button onClick={() => updateOrder(order._id)}><HiOutlineClipboardDocumentCheck size={24} /> Accept Delivery</Button>
            </div>
          </Card>
        ))}
    </div>
  );
};

export default ToShip;
