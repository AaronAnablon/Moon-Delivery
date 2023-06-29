import { Outlet, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Nav, Col } from "react-bootstrap";
import {
  FcVoicePresentation,
  FcCheckmark,
  FcAdvance,
  FcComboChart,
  FcRightUp2
} from "react-icons/fc";
import { FaStarHalfAlt } from "react-icons/fa";

const Rider = () => {
  const auth = useSelector((state) => state.auth);

  if (!auth.isRider) return <p>Access denied. Not a Rider!</p>;


  const Navigation = () => {
    return (
      <>
        <h2 className="d-md-block d-none border-bottom border-top">Summary</h2>
        <NavLink className="nav-link m-2 text-nowrap" to="/rider/summary">
          <FcComboChart size={22} /> Today
        </NavLink>
        <NavLink className="nav-link m-2 text-nowrap" to="/rider/riderRating">
          <FaStarHalfAlt size={22} /> Rating
        </NavLink>
        <h2 className="d-md-block d-none border-bottom border-top">Booking</h2>
        <NavLink className="nav-link m-2 text-nowrap" to="/rider/booked">
          <FcVoicePresentation size={22} /> Booked
        </NavLink>


        <NavLink className="nav-link m-2 text-nowrap" to="/rider/pickUpClient">
          <FcRightUp2 size={22} /> Pick Up Booked
        </NavLink>


        <NavLink className="nav-link m-2 text-nowrap" to="/rider/dropOff">
          <FcCheckmark size={22} /> Completed Booking
        </NavLink>

        <h2 className="d-md-block d-none border-bottom border-top">Orders</h2>

        <NavLink className="nav-link m-2 text-nowrap" to="/rider/toShip">
          <FcAdvance size={22} /> For Shipping
        </NavLink>


        <NavLink className="nav-link m-2 text-nowrap" to="/rider/pickUp">
          <FcRightUp2 size={22} /> Pick Up Order
        </NavLink>


        <NavLink className="nav-link m-2 text-nowrap" to="/rider/shipment">
          <FcCheckmark size={22} /> Completed Orders
        </NavLink>

      </>
    )
  }

  return (
    <div className="container-fluid d-md-flex ">
      <div className="col-md-3 d-none d-md-block position-relative">
        <Col className="position-sticky" style={{ top: '80px' }}>
          <Navigation />
        </Col>
      </div>
      <div style={{ top: '70px' }} className="d-flex bg-light flex-row sticky-top 
        d-block d-md-none flex-nowrap overflow-auto container-fluid">
        <Navigation />
      </div>
      <div className="col-12 col-md-9">
        <Outlet />
      </div>
    </div>
  );
};

export default Rider;
