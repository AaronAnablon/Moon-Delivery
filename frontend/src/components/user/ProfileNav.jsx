import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { IoIosCart, IoMdBook, IoMdNotificationsOutline } from 'react-icons/io';

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
                to="/user/userBooking"
              ><IoMdBook />
                Booking
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink
                className="nav-link"
                to="/user/bookingHistory"
              >
                Booking History
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink
                className="nav-link"
                to="/user/order"
              >
                Orders
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink
                className="nav-link"
                to="/user/history"
              >
                Purchase History
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink
                className="nav-link"
                to="/user/toRate"
              >
                Rate Product
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink
                className="nav-link"
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
