import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Row, Col, Container } from 'react-bootstrap';
import SubNav from "./SubNav";

const Profile = () => {
  const auth = useSelector((state) => state.auth);

  if (auth.isUser) return <p>Access denied. Not a User!</p>;

  return (
   <Container>
   <Row>
     <Col xs={12} md={3} className="m-3 mb-md-0">
       <SubNav />
     </Col>
     <Col xs={12} md={9}>
       <Outlet />
     </Col>
   </Row>
 </Container>
 );
};

export default Profile;
