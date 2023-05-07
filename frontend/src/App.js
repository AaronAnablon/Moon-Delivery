import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Home from "./components/Home";
import NavBar from "./components/NavBar";
import NotFound from "./components/NotFound";
import Cart from "./components/Cart";

import "react-toastify/dist/ReactToastify.css";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUser } from "./slices/authSlice";
import CheckoutSuccess from "./components/CheckoutSuccess";
import Dashboard from "./components/admin/Dashboard";
import Products from "./components/admin/Products";
import Users from "./components/admin/Users";
import Orders from "./components/admin/Oders";
import Summary from "./components/admin/Summary";
import CreateProduct from "./components/admin/CreateProduct";
import CheckOut from "./components/CheckOut";
import ProductDescription from "./components/ProductDescription"
import Order from "./components/user/Order";
import Profile from "./components/user/Profile";
import History from "./components/user/History";
import ToRate from "./components/user/ToRate";
import RegisterAsRider from "./components/auth/RegisterAsRider";
import RegisterAsSeller from "./components/auth/RegisterAsSeller";
import Booked from "./components/rider/Booked";
import DropOff from "./components/rider/DropOff";
import PickUp from "./components/rider/PickUp";
import Shipment from "./components/rider/Shipment";
import ToShip from "./components/rider/ToShip";
import Rider from "./components/rider/Rider"
import UserBooking from "./components/user/UserBooking";
import Booking from "./components/Booking";
import Pabili from "./components/services/Pabili";
import PakuhaPadala from "./components/services/PakuhaPadala"
import PahatidSundo from "./components/services/PahatidSundo";
import PickUpClient from "./components/rider/PickUpClient";
import BookingHistory from "./components/user/BookingHistory";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser(null));
  }, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        <NavBar />
        <div className="content-container">
          <Routes>
            <Route path="/" element={<Home />} />
                   <Route path="/booking" element={<Booking />}>
              <Route path="pabili" element={<Pabili />} />
              <Route path="pahatidSundo" element={<PahatidSundo />} />
              <Route path="pakuhaPadala" element={<PakuhaPadala />} />
            </Route>
            <Route path="/productDesc" element={<ProductDescription />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<CheckOut />} />
            <Route path="/checkout-success" element={<CheckoutSuccess />} />
            <Route path="/register" element={<Register />} />
            <Route path="/registerSeller" element={<RegisterAsSeller />} />
            <Route path="/registerRider" element={<RegisterAsRider />} />
            <Route path="/login" element={<Login />} />
            <Route path="/user" element={<Profile />} >
              <Route path="history" element={<History />} />
              <Route path="order" element={<Order />} />
              <Route path="userBooking" element={<UserBooking />} />
              <Route path="bookingHistory" element={<BookingHistory />} />
              <Route path="toRate" element={<ToRate />} />
            </Route>
            <Route path="/admin" element={<Dashboard />}>
              <Route path="summary" element={<Summary />} />
              <Route path="products" element={<Products />}>
                <Route path="create-product" element={<CreateProduct />} />
              </Route>
              <Route path="users" element={<Users />} />
              <Route path="orders" element={<Orders />} />
            </Route>
            <Route path="/rider" element={<Rider />} >
              <Route path="booked" element={<Booked />} />
              <Route path="dropOff" element={<DropOff />} />
              <Route path="pickUp" element={<PickUp />} />
              <Route path="shipment" element={<Shipment />} />
              <Route path="toShip" element={<ToShip />} />
              <Route path="pickUpClient" element={<PickUpClient />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
