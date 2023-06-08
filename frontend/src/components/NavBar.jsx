import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../slices/authSlice";
import { toast } from "react-toastify";
import { Nav, Navbar, Offcanvas, Form } from "react-bootstrap";
import { BiLogOut, BiUserCircle, BiHomeAlt2 } from "react-icons/bi"
import { IoMdBook, IoMdNotificationsOutline } from 'react-icons/io';
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileNav from "./user/ProfileNav";
import { BiArrowToTop } from "react-icons/bi";
import { useState, useEffect } from "react";
import { RiMoonFoggyLine } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import io from 'socket.io-client';
import { server, url } from "../slices/api";
import axios from "axios";
import { GiFullMotorcycleHelmet } from "react-icons/gi";
import NavBarEmployee from "./NavBarEmployee";

const NavBar = ({ setSearchData }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { cartTotalQuantity } = useSelector((state) => state.cart);
    const auth = useSelector((state) => state.auth);
    const [scroll, setScroll] = useState(false)
    const [searchInput, setSearchInput] = useState('');
    const [readNotification, setReadNotification] = useState('')
    const [newNotif, setNewNotif] = useState('')

    const location = useLocation();

    const showNavBar = ['/login', '/register',
        '/registerSeller', '/registerRider',
        '/notApproved', '/forgotPassword'].includes(location.pathname);

    useEffect(() => {
        const socket = io.connect(server);
        socket.on('notification', (notification) => {
            console.log('Received Navbar new notification:', notification);
            setNewNotif(notification)
        });
        return () => {
            socket.disconnect();
        };
    }, []);

    const fetchReadNotification = async () => {
        try {
            const response = await axios.get(`${url}/notification/notification/${auth._id}`);
            const notification = response.data;
            console.log('navbar fetch read', notification)
            setReadNotification(notification);
        } catch (error) {
            toast.error("Something went wrong!")
            console.log(error)
        }
    }

    useEffect(() => {
        fetchReadNotification()
    }, [newNotif])


    const handleSearch = () => {
        navigate('/shoppingPage')
        setSearchData(searchInput);
    };

    const handleTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
    useEffect(() => {
        const handleScroll = () => {
            setScroll(window.scrollY > 200);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <div className="bg-light" style={{
            position: 'sticky', top: 0, zIndex: '999',
            background: 'linear-gradient(90deg, rgb(254, 90, 1) 0%, rgb(245, 240, 39) 50%, rgb(254, 90, 1) 96%)'
        }}>
            {scroll && (
                <BiArrowToTop
                    size={32}
                    color="#0d6efd"
                    style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: '999' }}
                    onClick={handleTop}
                />
            )}
            {!showNavBar &&
                <Navbar expand="true" className="py-3 align-items-center justify-content-evenly shadow">
                    {auth.isRider &&
                        <NavBarEmployee empType={"Rider"} linkTo={"/rider/booked"} authName={auth.name} />
                    }
                    {auth.isAdmin &&
                        <NavBarEmployee logo={GiFullMotorcycleHelmet} empType={"Seller"} linkTo={"/admin/summary"} authName={auth.name} />
                    }
                  {auth.isAdmin && auth.isRider === true &&
                        <div>
                            <Nav.Link as={Link} to="/system">
                                <div className="system">
                                    <BiUserCircle size={24} />System
                                </div>
                            </Nav.Link>
                        </div>
                    }
                    {!auth.isAdmin && !auth.isRider && (
                        <>
                            <div>
                                {location.pathname === '/' ?
                                    <Nav.Link as={Link} to="/shoppingPage" ><RiMoonFoggyLine size={35} /></Nav.Link>
                                    : <Nav.Link as={Link} to="/" ><BiHomeAlt2 size={35} /></Nav.Link>
                                }
                            </div>
                            <Form
                                className="d-flex col-7 d-none d-md-block justify-content-center"
                                onSubmit={(e) => {
                                    e.preventDefault()
                                    handleSearch()
                                }}
                            >
                                <div style={{ position: 'relative', width: '100%', borderRadius: '100%' }}>
                                    <Form.Control
                                        id="search"
                                        type="text"
                                        value={searchInput}
                                        onChange={(e) => setSearchInput(e.target.value)}
                                    />
                                    <FaSearch
                                        size={22}
                                        color="#0b5ed7"
                                        onClick={handleSearch}
                                        style={{
                                            position: 'absolute',
                                            top: '50%',
                                            right: '10px',
                                            transform: 'translateY(-50%)',
                                            cursor: 'pointer',
                                        }}
                                    />
                                </div>
                            </Form>
                            {auth._id && <Nav.Link as={Link} to="/notification" className="d-flex">
                                <div className="col-6">
                                    <IoMdNotificationsOutline size={38} />
                                </div>
                                <div className="col-6">
                                    <div className={readNotification.length > 0 ? 'cart-quantity' : 'cart-empty-quantity'}>{readNotification.length}</div>
                                </div>
                            </Nav.Link>}
                            <Nav.Link as={Link} to="/cart" className="d-flex">
                                <div className="col-6">
                                    <AiOutlineShoppingCart size={37} />
                                </div>
                                <div className="col-6">
                                    <div className={cartTotalQuantity > 0 ? 'cart-quantity' : 'cart-empty-quantity'}>{cartTotalQuantity}</div>
                                </div>
                            </Nav.Link>

                            {auth._id && <Nav.Link as={Link} to="/user/userBooking">
                                <IoMdBook size={35} />
                            </Nav.Link>}
                        </>)}
                    {!auth._id &&
                        <>
                            <Nav.Link className="m-3" as={Link} to="/login">Login</Nav.Link>
                            <Nav.Link className="m-3" as={Link} to="register">Register</Nav.Link>
                        </>
                    }
                    <Navbar.Toggle aria-controls="sidebar" className="navbar-toggle ">
                        <span className="navbar-toggler-icon"></span>
                        <Navbar.Collapse id="sidebar" className="navbar-collapse-custom">
                            <Navbar.Offcanvas
                                id="sidebar"
                                aria-labelledby="sidebar"
                                placement="end"
                                style={{ zIndex: '9999' }}
                            >
                                <Offcanvas.Header closeButton>
                                    <Offcanvas.Title id="sidebar" >
                                        Menu
                                    </Offcanvas.Title>
                                </Offcanvas.Header>
                                {auth._id &&
                                    <Nav className="flex-column px-5">
                                        <Nav.Link as={Link} to="/user/userSettings" className="d-flex align-items-center">
                                            <BiUserCircle size={24} />
                                            <div className="px-3">{auth.name}</div>
                                        </Nav.Link>
                                        {!auth.isRider && !auth.isAdmin && <ProfileNav />}

                                        <Nav.Link as={Link} to="/login" className="d-flex align-items-center"
                                            onClick={() => {
                                                dispatch(logoutUser(null))
                                                toast.warning("Logged out!", { position: "bottom-left" });
                                            }}>
                                            <BiLogOut size={24} />
                                            <div className="px-3">Logout</div>
                                        </Nav.Link>

                                    </Nav>}
                            </Navbar.Offcanvas>
                        </Navbar.Collapse>
                    </Navbar.Toggle>
                    {!auth.isRider && !auth.isAdmin &&
                        <Form className="d-flex d-block d-md-none col-10 justify-content-center mt-3" onSubmit={(e) => { e.preventDefault(); handleSearch() }}>
                            <div style={{ position: 'relative', width: '100%' }}>
                                <Form.Control id="search" type="text" value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)} />
                                <FaSearch
                                    size={22}
                                    color="#0b5ed7"
                                    onClick={handleSearch}
                                    style={{
                                        position: 'absolute',
                                        top: '50%',
                                        right: '10px',
                                        transform: 'translateY(-50%)',
                                        cursor: 'pointer',
                                    }}
                                />
                            </div>
                        </Form>}
                </Navbar>}
        </div>

    );
};

export default NavBar;

