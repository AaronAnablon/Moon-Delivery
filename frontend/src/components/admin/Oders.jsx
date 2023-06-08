import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { setHeaders, url } from "../../slices/api";
import { useSelector } from "react-redux";
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { toast } from "react-toastify";

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
        <ul className="products">
          {filteredData && filteredData.map((order) => (
            <li style={{ borderColor: 'white', borderWidth: '12px', borderStyle: 'solid' }} key={order._id}>
              <p>Client ID: {order.userId}</p>
              <p>ProductId: {order.products[0].productId}</p>
              <p>Items: {order.products[0].quantity}</p>
              <p>Date Ordered: {new Date(order.createdAt).toLocaleString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                timeZoneName: 'short',
              })}</p>
              <p>Delivery Status: {order.delivery_status}</p>
              <p>Payment Status: {order.payment_status}</p>
              <p>Total: {order.total}</p>
              {order.delivery_status === 'For Pick Up' ?
                <p><button onClick={() => callRider(order.shipping.phoneNumber)}>Call Rider</button>
                  <button onClick={() => callClient(order.shipping.phoneNumber)}>Call Client</button></p> :
                order.delivery_status === 'Delivered' ? null :
                  <button onClick={() => updateOrder(order._id)}>Request Delivery</button>}
            </li>
          ))}

        </ul>
      </div>
    </div>
  );
};

export default Orders;
