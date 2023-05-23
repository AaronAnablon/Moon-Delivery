import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Col, Container } from 'react-bootstrap';
import SubNav from "./SubNav";

const Profile = () => {
  const auth = useSelector((state) => state.auth);

  if (auth.isUser) return <p>Access denied. Not a User!</p>;

  return (
   <Container fluid className="d-flex">
    <div className="col-12 d-lg-flex justify-content-center">
     <Col lg={3} sm={12}>
       <SubNav />
     </Col>
     <Col lg={9} sm={12}>
       <Outlet />
     </Col>
    </div>
 </Container>
 );
};

export default Profile;
