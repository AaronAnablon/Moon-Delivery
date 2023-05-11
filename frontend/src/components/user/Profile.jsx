import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Col } from 'react-bootstrap';
import SubNav from "./SubNav";

const Profile = () => {
  const auth = useSelector((state) => state.auth);

  if (auth.isUser) return <p>Access denied. Not a User!</p>;

  return (
        <Col lg={10} className="bg-light"> 
          <SubNav />
          <Outlet />
        </Col>
 );
};

export default Profile;
