import { NavLink } from "react-router-dom";
import { Nav, Col,Row, Container } from 'react-bootstrap';
import { useSelector } from "react-redux";
import ProfileNav from './ProfileNav'

const SubNav = () => {
  const auth = useSelector((state) => state.auth);

  if (auth.isUser) return <p>Access denied. Not a User!</p>;
  return (
    <>
    <Container fluid className="d-none d-lg-block">
    <h2>Activities</h2>
    <ProfileNav />
    </Container>
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
</>
);
};

export default SubNav;






