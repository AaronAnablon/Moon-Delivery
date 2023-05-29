import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUser } from "./slices/authSlice";
import "react-toastify/dist/ReactToastify.css";

import Home from "./components/Home";
import NavBar from "./components/NavBar";
import NotFound from "./components/NotFound";

import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

import Cart from "./components/cart/Cart";
import CheckOut from "./components/cart/CheckOut";

import RegisterAsRider from "./components/auth/RegisterAsRider";
import RegisterAsSeller from "./components/auth/RegisterAsSeller";

import Pabili from "./components/services/Pabili";
import PakuhaPadala from "./components/services/PakuhaPadala"
import PahatidSundo from "./components/services/PahatidSundo";

import PickUpClient from "./components/rider/PickUpClient";
import Booked from "./components/rider/Booked";
import DropOff from "./components/rider/DropOff";
import PickUp from "./components/rider/PickUp";
import Shipment from "./components/rider/Shipment";
import ToShip from "./components/rider/ToShip";
import Rider from "./components/rider/Rider"

import GeneralAdmin from "./components/general_admin/GeneralAdmin";
import Stores from "./components/general_admin/Stores"
import SystemDashBoard from "./components/general_admin/SystemDashBoard"
import SystemRiders from "./components/general_admin/SystemRiders"
import SystemProfile from "./components/general_admin/SystemProfile"

import UserSettings from "./components/user/UserSettings"
import UserBooking from "./components/user/UserBooking";
import BookingHistory from "./components/user/BookingHistory";
import RateRider from "./components/user/RateRider";
import Order from "./components/user/Order";
import Profile from "./components/user/Profile";
import History from "./components/user/History";
import ToRate from "./components/user/ToRate";

import Products from "./components/admin/Products";
import Summary from "./components/admin/Summary";
import CreateProduct from "./components/admin/CreateProduct";
import Dashboard from "./components/admin/Dashboard";
import Users from "./components/admin/Users";
import Orders from "./components/admin/Oders";

import ProductDetails from "./components/products/ProductDetails";

import Booking from "./components/booking/Booking";
import Notification from "./components/notification/Notifications";
import Services from "./components/services/Services";

function App() {
  const dispatch = useDispatch();

  const [searchData, setSearchData] = useState('');

  useEffect(() => {
    dispatch(loadUser(null));
  }, [dispatch]);

  return (
    <div >
      <BrowserRouter>
        <ToastContainer />
        <div className="mx-auto" style={{maxWidth: '1200px'}}> 
          <NavBar setSearchData={setSearchData}/>
          <Routes>
            <Route path="/" element={<Home searchData={searchData}/>} />
              <Route path="/booking" element={<Booking />}>
              <Route path="pabili" element={<Pabili />} />
              <Route path="pahatidSundo" element={<PahatidSundo />} />
              <Route path="pakuhaPadala" element={<PakuhaPadala />} />
              <Route path="services" element={<Services />} />
            </Route>
            <Route path="/productDetails" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<CheckOut />} />

            <Route path="/notification" element={<Notification />} />
          
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
              <Route path="rateRider" element={<RateRider />} />
              <Route path="userSettings" element={<UserSettings />} />
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
            <Route path="/system" element={<GeneralAdmin />}>
              <Route path="systemStores" element={<Stores />} />
              <Route path="systemDashboard" element={<SystemDashBoard />} />
              <Route path="systemRiders" element={<SystemRiders />} />
              <Route path="systemProfile" element={<SystemProfile />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
