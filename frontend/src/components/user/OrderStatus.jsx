import { NavLink } from "react-router-dom";
import { Nav, Col,Row } from 'react-bootstrap';

const OrderStatus = () => {
  return (
    <>
    <Col lg={1} className="d-none d-lg-block">
      <Nav variant="underline" style={{ whiteSpace: 'nowrap' }} className="flex-column sidebar text-dark">
          <Nav.Item>
          <NavLink className="nav-link" to="/user/userBooking">
            Booking
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink className="nav-link" to="/user/bookingHistory">
            Booking History
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink className="nav-link" to="/user/rateRider">
            Rate Rider
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink className="nav-link" to="/user/order">
            Orders
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink className="nav-link" to="/user/history">
            Purchase History
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink className="nav-link" to="/user/toRate">
            Rate Product
          </NavLink>
        </Nav.Item>
     
      </Nav>
    </Col>
    <div >
  <Row xs={12} className="d-lg-none" >
    <Nav variant="outline-danger" >
     <Col style={{display: 'flex', flexDirection: 'row',whiteSpace: 'nowrap', overflowX: 'scroll'}}>
     <Nav.Item>
        <NavLink className="nav-link" to="/user/userSettings">
          User Settings
        </NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink className="nav-link" to="/user/userBooking">
          Booking
        </NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink className="nav-link" to="/user/bookingHistory">
          Booking History
        </NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink className="nav-link" to="/user/order">
          Orders
        </NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink className="nav-link" to="/user/history">
          Purchase History
        </NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink className="nav-link" to="/user/toRate">
          Rate Product
        </NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink className="nav-link" to="/user/rateRider">
          Rate Rider
        </NavLink>
      </Nav.Item>
      </Col>
    </Nav>
  </Row>
</div>

</>
);
};

export default OrderStatus;






