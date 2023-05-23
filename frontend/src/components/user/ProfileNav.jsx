import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Nav } from 'react-bootstrap';
import { IoMdBook } from 'react-icons/io';
import { BsCardChecklist } from "react-icons/bs";
import { MdOutlineHistory, MdOutlineRateReview } from "react-icons/md";

const Profile = () => {
  const auth = useSelector((state) => state.auth);

  if (auth.isUser) return <p>Access denied. Not a User!</p>;

  return (
    <Container fluid className="d-flex align-items-start justify-content-start border-top border-bottom">
       {!auth.isRider && !auth.isAdmin && 
      <Nav className="col-12">
        <Nav.Item>
          <NavLink
            className="nav-link"
            to="/user/order"
          ><BsCardChecklist size={24} />
            <span className="m-3"> Orders</span>
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink
            className="nav-link"
            to="/user/history"
          ><MdOutlineHistory size={26} />
            <span className="m-3">Purchase History</span>
          </NavLink>
        </Nav.Item>
        
        <Nav.Item>
          <NavLink
            className="nav-link border-bottom"
            to="/user/toRate"
          ><MdOutlineRateReview size={26} />
            <span className="m-3">Rate Product</span>
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink
            className="nav-link"
            to="/user/userBooking"
          ><IoMdBook size={26} />
            <span className="m-3">Booking</span>
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink
            className="nav-link"
            to="/user/bookingHistory"
          ><MdOutlineHistory size={26} />
            <span className="m-3">Booking History</span>
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink
            className="nav-link"
            to="/user/rateRider"
          ><MdOutlineRateReview size={26} />
            <span className="m-3">Rate Rider</span>
          </NavLink>
        </Nav.Item>
      </Nav>}
    </Container>
  );
};

export default Profile;
