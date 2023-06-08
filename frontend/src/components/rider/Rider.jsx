import { Outlet, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Nav, Container, Col } from "react-bootstrap";
import { MdOutlineRateReview, MdOutlineHistory } from "react-icons/md";
import { IoMdBook } from "react-icons/io";
import { BsCardChecklist } from "react-icons/bs";

const Rider = () => {
  const auth = useSelector((state) => state.auth);

  if (!auth.isRider) return <p>Access denied. Not a Rider!</p>;

  return (
    <>
      <Nav variant="outline-danger d-md-none bg-light position-fixed" style={{ zIndex: '1' }}>
        <Col style={{ display: 'flex', flexDirection: 'row', whiteSpace: 'nowrap', overflowX: 'scroll' }}>
          <Nav.Item>
            <NavLink className="nav-link" to="/rider/booked">
              Booking
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink className="nav-link" to="/rider/pickUpClient">
              Pick Up Booked
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink className="nav-link" to="/rider/dropOff">
              Completed Booking
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink className="nav-link" to="/rider/toShip">
              For Shipping
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink className="nav-link" to="/rider/pickUp">
              Pick Up Order
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink className="nav-link" to="/rider/shipment">
              Completed Orders
            </NavLink>
          </Nav.Item>
        </Col>
      </Nav>
      <div className="container-fluid col-12 d-md-flex ">

        <Container fluid className="d-none d-md-block border-top align-items-start justify-content-start">
          <h2 className="border-bottom">Bookings</h2>
          <Nav className="d-flex flex-column position-fixed">
            <Nav.Item>
              <NavLink className="nav-link" to="/rider/booked">
                <BsCardChecklist size={24} />
                <span className="m-3">Booking</span>
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink className="nav-link" to="/rider/pickUpClient">
                <MdOutlineHistory size={26} />
                <span className="m-3">Pick Up Booked</span>
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink className="nav-link border-bottom" to="/rider/dropOff">
                <MdOutlineRateReview size={26} />
                <span className="m-3">Completed Booking</span>
              </NavLink>
            </Nav.Item>
            <h2 className="border-bottom">Orders</h2>
            <Nav.Item>
              <NavLink className="nav-link" to="/rider/toShip">
                <IoMdBook size={26} />
                <span className="m-3">For Shipping</span>
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink className="nav-link" to="/rider/pickUp">
                <MdOutlineHistory size={26} />
                <span className="m-3">Pick Up Order</span>
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink className="nav-link" to="/rider/shipment">
                <MdOutlineRateReview size={26} />
                <span className="m-3">Completed Orders</span>
              </NavLink>
            </Nav.Item>
          </Nav>
        </Container>

        <div className="col-md-8 col-lg-9 col-12 mt-5 mt-md-0" style={{ zIndex: '0' }}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Rider;
