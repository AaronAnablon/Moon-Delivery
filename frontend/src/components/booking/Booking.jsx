import { NavLink, Outlet } from "react-router-dom";
import {Nav, Card, Col, Row, Container } from "react-bootstrap";
  import { GiFullMotorcycleHelmet } from "react-icons/gi";
  import { RiMoonFoggyFill } from "react-icons/ri";
import TopProducts from "../products/TopProducts";

const Booking = () => {
  return (
    <Container>
   <Row>
     <Col className="col-12 d-lg-none">
    <Nav>
     <Col style={{display: 'flex', flexDirection: 'row',whiteSpace: 'nowrap', overflowX: 'scroll' }}>
     <Nav.Item>
        <NavLink className="nav-link" to="/">
          Shopping
        </NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink className="nav-link" to="/booking/pabili">
          Pabili
        </NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink className="nav-link" to="/booking/pakuhaPadala">
          Pakuha/Padala
        </NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink className="nav-link" to="/booking/pahatidSundo">
          Book Ride
        </NavLink>
      </Nav.Item>
      </Col>
    </Nav>

     </Col>
   </Row>
      <Col className="row" style={{borderRadius: "15px",marginTop: '10px', backgroundColor: "#f4f4f4"}}>
      <div className="col-lg-6">
        <div className="d-none d-lg-block col-lg-12"  style={{ height: '100%', 
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text', display: 'inline-block',
        background: 'linear-gradient(90deg, rgb(229, 134, 70) 0%, rgb(203, 118, 61) 30%, rgb(255, 193, 84) 91%)' }}>
        
        <Nav>
     <Col style={{display: 'flex', flexDirection: 'row',whiteSpace: 'nowrap'}}>
     <Nav.Item>
        <NavLink className="nav-link text-light" to="/">
          Shopping
        </NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink className="nav-link text-light" to="/booking/pabili">
          Pabili
        </NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink className="nav-link text-light" to="/booking/pakuhaPadala">
          Pakuha/Padala
        </NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink className="nav-link text-light" to="/booking/pahatidSundo">
          Book Ride
        </NavLink>
      </Nav.Item>
      </Col>
    </Nav>
       
        <div className="d-flex justify-content-center col-12">
         <RiMoonFoggyFill className="col-8" size={330}/>  
         <div col-12>
          <GiFullMotorcycleHelmet className="col-4" size={330}/>
          </div>
        </div>
        <Card.Text className="col-8 m-5 text-light">Payment varies Depending on the Purchases made. Receipt will always be presented by the rider and recorded by our system</Card.Text>
  
  <TopProducts />
   </div>
        </div>
        <div className="col-lg-6">
        <Outlet />
        </div>
     </Col>
     </Container>
  );
};

export default Booking;
