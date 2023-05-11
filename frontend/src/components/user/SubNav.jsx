import { NavLink } from "react-router-dom";
import { Container, Row, Col, Nav } from 'react-bootstrap';

const SubNav = () => {

  return (
    <Container fluid className="bg-light text-dark">
      <Row>
        <Col>
          <Nav className="flex-nowrap overflow-auto">
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

export default SubNav;
