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
     <Col lg={2} style={{marginRight: "3.7rem"}}>
       <SubNav />
     </Col>
     <Col lg={9} style={{borderRadius: "15px",marginTop: '10px', backgroundColor: "#f4f4f4"}}>
       <Outlet />
     </Col>
   </Row>
 </Container>
 );
};

export default Profile;
