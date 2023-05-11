import {Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {logoutUser} from "../slices/authSlice";
import {toast} from "react-toastify";
import { Nav, NavDropdown, Navbar } from "react-bootstrap";
import {BiLogOut, BiUserCircle} from "react-icons/bi"
import { IoIosCart } from 'react-icons/io';
import {FaShippingFast}  from 'react-icons/fa';
import ProfileNav from "./user/ProfileNav";

const NavBar = () => {
    const dispatch = useDispatch();
    const {cartTotalQuantity} = useSelector((state) => state.cart);
    const auth = useSelector((state) => state.auth);

   return (
        <div class="mx-auto" style={{maxWidth: '1200px', fixed: 'top'}}>
      <Navbar bg="dark" variant="dark" expand="md" className="py-3 text-light flex-lg-row justify-content-evenly">
        {! auth.isAdmin && ! auth.isRider && (
        <>
        <Navbar.Brand href="/">MD</Navbar.Brand>
        <Nav.Link  className="d-sm-block d-md-none" as={Link} to="/cart"> 
           <div className="nav-bag">
            <IoIosCart size={32} />
            <span className="cart-quantity">
            <span>{cartTotalQuantity}</span>
            </span></div>
        </Nav.Link>
        </>)}
             {auth._id ? (<div> { auth.isAdmin && auth.isRider === true ? (
                    <div>
                        <Nav.Link as={Link} to="/system">
                            <div className="system">
                            <BiUserCircle size={24}/>System
                            </div>
                        </Nav.Link>
                    </div>
                ) : (auth.isAdmin ? (
                    <div>
                       <Nav.Link as={Link} to="/admin">
                            <div className="profile">
                            Moon Delivery | Admin
                            |<BiUserCircle size={24}/>{auth.name}
                            </div>
                        </Nav.Link>
                        </div>
                ) : (auth.isRider ? (
                    <div>
                        <Nav.Link as={Link} to="/rider">
                            <div className="profile">
                                <FaShippingFast size={28}/>
                                {auth.name}
                            </div>
                        </Nav.Link>
                    </div>
                ) : null ))}
                

                    </div>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="register">Register</Nav.Link>
              </>
            )
        }
               <Navbar.Toggle aria-controls="sidebar"/>
                    <Navbar.Collapse className="sidebar justify-content-end">
                    {! auth.isAdmin && ! auth.isRider && (
                    <>
                    <Nav.Link className="d-lg-block d-none" as={Link} to="/cart">
                        <div className="nav-bag">
                        <IoIosCart size={32} />
                        <span className="cart-quantity">
                        <span>{cartTotalQuantity}</span>
                        </span></div>
                    </Nav.Link></>)}
                    <Nav className="flex-column flex-md-row flex-lg-row px-5 ">
                        <Nav.Link as={Link} to="/user/userSettings" className="d-flex  align-items-center">
                        <BiUserCircle size={24}/>{auth.name}
                        </Nav.Link>
                        <ProfileNav />
                        <div onClick={() => {dispatch(logoutUser(null));
                        toast.warning("Logged out!", {position: "bottom-left"});
                        window.location.href = "/login";
                        }}>
                        <Nav.Link as={Link} to="" className="d-flex align-items-center">
                            <BiLogOut size={24}/>Logout
                        </Nav.Link>
                    </div>
                     </Nav>
                    </Navbar.Collapse>
                </Navbar>
         </div>
    );
};

export default NavBar;

