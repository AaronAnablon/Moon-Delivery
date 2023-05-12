import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Row, Col, Nav } from 'react-bootstrap';

const Profile = () => {
  const auth = useSelector((state) => state.auth);

  if (auth.isUser) return <p>Access denied. Not a User!</p>;

  return (
    <Container fluid>
      <Row>
        <Col>
          <Nav>
            <Nav.Item>
              <NavLink
                className="nav-link"
                activeClassName="active"
                to="/user/userBooking"
              >
                Booking
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink
                className="nav-link"
                activeClassName="active"
                to="/user/bookingHistory"
              >
                Booking History
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink
                className="nav-link"
                activeClassName="active"
                to="/user/order"
              >
                Orders
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink
                className="nav-link"
                activeClassName="active"
                to="/user/history"
              >
                Purchase History
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink
                className="nav-link"
                activeClassName="active"
                to="/user/toRate"
              >
                Rate Product
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink
                className="nav-link"
                activeClassName="active"
                to="/user/rateRider"
              >
                Rate Rider
              </NavLink>
            </Nav.Item>
          </Nav>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
