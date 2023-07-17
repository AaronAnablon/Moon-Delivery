import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { setHeaders, url } from "../../slices/api";
import { useSelector } from "react-redux";
import Nav from 'react-bootstrap/Nav';
import { toast } from "react-toastify";
import { Button, Card, NavLink } from "react-bootstrap";
import DateFormat from "../formatters/DateFormat";
import CurrencyFormat from "../formatters/CurrencyFormat";
import {
  FcCalendar,
  FcServices,
  FcTodoList,
  FcPodiumWithSpeaker,
  FcMoneyTransfer,
  FcDeployment,
  FcViewDetails,
} from "react-icons/fc";
import Loading from "../Loading";

const Orders = () => {
  const auth = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false)
  const [sortedBrand, setSortedBrand] = useState("");


  const fetchOrders = useCallback(async () => {
    setLoading(!loading)
    try {
      const res = await axios.get(`${url}/orders/seller-orders/${auth._id}/Pending`, setHeaders());
      setOrders((res.data).reverse());
      console.log('orders', res.data)
      setLoading(false)
    } catch (err) {
      console.log(err)
      toast.error("Something went wrong!")
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, []);

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
  ? orders.filter((order) =>
      order.products.some((product) => product.deliveryStatus === sortedBrand)
    )
  : orders;

  const updateOrders = async (orderId, nestedIndex) => {
    const updatedOrder = {
      $set: {
        [`products.${nestedIndex}.deliveryStatus`]: 'For Delivery',
      },
    };
    try {
      await axios.put(`${url}/orders/${auth._id}/${orderId}`, updatedOrder, setHeaders());
      fetchOrders();
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <div>
      <Nav className="d-flex flex-column align-items-center justify-content-center">
        <h2>Client Orders</h2>
        <div className="d-flex bg-light flex-row sticky-top 
         flex-nowrap overflow-auto container-fluid">
          <NavLink className="m-1 d-flex flex-nowrap" onClick={() => handleSortByBrand("")}>All</NavLink>
          <NavLink className="m-1 d-flex flex-nowrap" onClick={() => handleSortByBrand("Pending")}>Pending</NavLink>
          <NavLink className="m-1 d-flex flex-nowrap" onClick={() => handleSortByBrand("For Delivery")}>For Delivery</NavLink>
          <NavLink className="m-1 d-flex flex-nowrap" onClick={() => handleSortByBrand("Delivered")}>Delivered</NavLink>
          <NavLink className="m-1 d-flex flex-nowrap" onClick={() => handleSortByBrand("For Pick Up")}>For Pick Up</NavLink>
          <NavLink className="m-1 d-flex flex-nowrap" onClick={() => handleSortByBrand("Cancelled")}>Cancelled</NavLink>
        </div>
      </Nav>
      <div>
        {loading && <Loading />}
        {filteredData && filteredData === 0 && <p>No Order found</p>}
        <ul>
          {filteredData.length == 0 && <p>No {sortedBrand} orders were found</p>}
          {filteredData && filteredData.map((order) => (
            <li className="shadow p-3 mb-3" style={{ borderColor: 'white', borderWidth: '12px', borderStyle: 'solid' }} key={order._id}>
              <div className="d-md-flex border-bottom">
                <Card.Text className="col-md-6 col-12"><FcCalendar size={24} /> Date Ordered: {DateFormat(order.createdAt)}</Card.Text>
                <Card.Text className="col-md-6 col-12"><FcPodiumWithSpeaker size={24} /> Client Name: {order.name}</Card.Text>
              </div>
              <div className=" border-bottom">
                {order.products.filter((product) => product.sellerId === auth._id).map((product, index) => (
                  <div className="d-flex">

                    <div className="col-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{ zIndex: '1', width: '100%', height: '100px', objectFit: 'cover' }}
                      />
                      <Card.Text><FcTodoList size={24} /> Delivery Status: {product.deliveryStatus}</Card.Text>
                    </div>
                    <div className="col-9">
                      <Card.Text><FcTodoList size={24} /> Product Number: {product.productId}</Card.Text>
                      <Card.Text><FcTodoList size={24} /> Product Name: {product.name}</Card.Text>
                      <Card.Text className="col-md-6 col-12"><FcDeployment size={24} /> Quantity: {product.quantity}</Card.Text>
                      <div className="d-md-flex border-bottom mb-3">
                        <Card.Text className="col-md-6 col-12"><FcMoneyTransfer size={24} /> Total: {CurrencyFormat(product.price * product.quantity)}</Card.Text>
                      </div>
                    
                      {product.deliveryStatus === 'For Pick Up' ?
                        <><Button className="m-2" onClick={() => callRider(order.shipping.phoneNumber)}>Call Rider</Button>
                          <Button className="m-2" onClick={() => callClient(order.shipping.phoneNumber)}>Call Client</Button></> :
                        order.delivery_status === 'Delivered' ? null : <>
                           <Button className="m-2" onClick={() => updateOrders(order._id, index)}>Request Delivery</Button>
                        </>
                      }
                    </div>
                  </div>
                ))}
              </div>
              <div className="d-md-flex border-bottom">
                <Card.Text className="col-md-6 col-12"><FcViewDetails size={24} /> Delivery Status: {order.delivery_status}</Card.Text>
                <Card.Text className="col-md-6 col-12"><FcServices size={24} /> Payment Status: {order.payment_status}</Card.Text>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Orders;
