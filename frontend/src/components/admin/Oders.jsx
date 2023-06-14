import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { setHeaders, url } from "../../slices/api";
import { useSelector } from "react-redux";
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { toast } from "react-toastify";
import { Button, Card } from "react-bootstrap";
import DateFormat from "../formatters/DateFormat";
import CurrencyFormat from "../formatters/CurrencyFormat";
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

const Orders = () => {
  const auth = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false)
  const [sortedBrand, setSortedBrand] = useState("");


  const fetchOrders = async () => {
    setLoading(!loading)
    try {
      const res = await axios.get(`${url}/orders/seller-orders/${auth._id}/pending`, setHeaders());
      setOrders((res.data).reverse());
      setLoading(false)
    } catch (err) {
      console.log(err)
      toast.error("Something went wrong!")
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateOrder = async (orderId) => {
    try {
      const updatedOrder = {
        delivery_status: 'For Delivery',
        payment_status: 'Cash on Delivery',
        updated_at: new Date().toLocaleString()
      }
      await axios.put(`${url}/orders/${auth._id}/${orderId}`, updatedOrder, setHeaders());
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
      <Nav className="d-flex flex-column align-items-center justify-content-center">
        <h2>My Orders</h2>
        <NavDropdown id="dropdown-basic-button" title="Orders Sort by">
          <NavDropdown.Item onClick={() => handleSortByBrand("")}>All</NavDropdown.Item>
          <NavDropdown.Item onClick={() => handleSortByBrand("pending")}>Pending</NavDropdown.Item>
          <NavDropdown.Item onClick={() => handleSortByBrand("For Delivery")}>For Delivery</NavDropdown.Item>
          <NavDropdown.Item onClick={() => handleSortByBrand("Delivered")}>Delivered</NavDropdown.Item>
          <NavDropdown.Item onClick={() => handleSortByBrand("For Pick Up")}>For Pick Up</NavDropdown.Item>
          <NavDropdown.Item onClick={() => handleSortByBrand("Cancelled")}>Cancelled</NavDropdown.Item>
        </NavDropdown>{sortedBrand}
      </Nav>
      <div>
        {loading && <p>Loading..</p>}
        {filteredData && filteredData === 0 && <p>No Order found</p>}
        <ul>
          {filteredData && filteredData.map((order) => (
            <li className="shadow p-3 mb-3" style={{ borderColor: 'white', borderWidth: '12px', borderStyle: 'solid' }} key={order._id}>
              <div className="d-md-flex border-bottom">
                <Card.Text className="col-md-6 col-12">Date Ordered: {DateFormat(order.createdAt)}</Card.Text>
                <Card.Text className="col-md-6 col-12"><FcPodiumWithSpeaker size={24} /> Client Name: {order.name}</Card.Text>
              </div>
              <div className="d-md-flex border-bottom">
                <Card.Text className="col-md-6 col-12"><FcTodoList size={24} /> ProductId: {order.products[0].productId}</Card.Text>
                <Card.Text className="col-md-6 col-12"><FcDeployment size={24} /> Items: {order.products[0].quantity}</Card.Text>
              </div>
              <div className="d-md-flex border-bottom">
                <Card.Text className="col-md-6 col-12"><FcViewDetails size={24} /> Delivery Status: {order.delivery_status}</Card.Text>
                <Card.Text className="col-md-6 col-12"><FcServices size={24} /> Payment Status: {order.payment_status}</Card.Text>
              </div>
              <div className="d-md-flex border-bottom mb-3">
                <Card.Text className="col-md-6 col-12"><FcMoneyTransfer size={24} /> Total: {CurrencyFormat(order.total)}</Card.Text>
              </div>
              {order.delivery_status === 'For Pick Up' ?
                <><Button onClick={() => callRider(order.shipping.phoneNumber)}>Call Rider</Button>
                  <Button onClick={() => callClient(order.shipping.phoneNumber)}>Call Client</Button></> :
                order.delivery_status === 'Delivered' ? null :
                  <Button onClick={() => updateOrder(order._id)}>Request Delivery</Button>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Orders;
