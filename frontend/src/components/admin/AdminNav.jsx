import { NavLink } from "react-router-dom";
import { Nav, Container, Row, Col } from 'react-bootstrap';

const AdminNav = () => {

  return (
    <Container fluid className="bg-light">
        <Nav >
            <Col className="d-flex flex-row flex-nowrap overflow-auto">
          
            <NavLink
              className="nav-link"
           
              to="/admin/summary"
            >
              Summary
            </NavLink>
            <NavLink
              className="nav-link"
           
              to="/admin/products"
            >
              Products
            </NavLink>
            <NavLink
              className="nav-link"
           
              to="/admin/orders"
            >
              Orders
            </NavLink>
            <NavLink
              className="nav-link"
           
              to="/admin/users"
            >
              User Settings
            </NavLink> 
         
            </Col>
          </Nav>    
        </Container>
  );
};

export default AdminNav;
