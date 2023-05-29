import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../slices/authSlice";
import { toast } from "react-toastify";
import { Nav, Navbar, Offcanvas, Form } from "react-bootstrap";
import { BiLogOut, BiUserCircle, BiHomeAlt2 } from "react-icons/bi"
import { IoMdBook, IoMdNotificationsOutline } from 'react-icons/io';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaShippingFast } from 'react-icons/fa';
import ProfileNav from "./user/ProfileNav";
import { BiArrowToTop } from "react-icons/bi";
import { useState, useEffect } from "react";
import { RiMoonFoggyLine } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import io from 'socket.io-client';
import { server, url } from "../slices/api";
import axios from "axios";

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

    const showNavBar = ['/login', '/register'].includes(location.pathname);

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
        navigate('/')
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
            background: 'rgb(250,81,48)',
            background: 'linear-gradient(90deg, rgba(250,81,48,1) 0%, rgba(198,198,198,1) 50%, rgba(250,81,48,1) 96%)'
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
                    {!auth.isAdmin && !auth.isRider && (
                        <>
                            <div>
                                {location.pathname === '/' ?
                                    <Nav.Link as={Link} to="/booking/services" ><RiMoonFoggyLine size={35} /></Nav.Link>
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
                                <div style={{ position: 'relative', width: '100%' }}>
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
                            <Nav.Link as={Link} to="/notification" className="d-flex">
                                <div className="col-6">
                                    <IoMdNotificationsOutline size={38} />
                                </div>
                                <div className="col-6">
                                    <div className={readNotification.length > 0 ? 'cart-quantity' : 'cart-empty-quantity'}>{readNotification.length}</div>
                                </div>
                            </Nav.Link>
                            <Nav.Link as={Link} to="/cart" className="d-flex">
                                <div className="col-6">
                                    <AiOutlineShoppingCart size={37} />
                                </div>
                                <div className="col-6">
                                    <div className={cartTotalQuantity > 0 ? 'cart-quantity' : 'cart-empty-quantity'}>{cartTotalQuantity}</div>
                                </div>
                            </Nav.Link>

                            <Nav.Link as={Link} to="/user/userBooking">
                                <IoMdBook size={35} />
                            </Nav.Link>
                        </>)}
                    {auth._id ? (<div> {auth.isAdmin && auth.isRider === true ? (
                        <div>
                            <Nav.Link as={Link} to="/system">
                                <div className="system">
                                    <BiUserCircle size={24} />System
                                </div>
                            </Nav.Link>
                        </div>
                    ) : (auth.isAdmin ? (
                        <div>
                            <Nav.Link as={Link} to="/admin/summary">
                                <div className="profile">
                                    Moon Delivery | Admin
                                </div>
                            </Nav.Link>
                        </div>
                    ) : (auth.isRider ? (
                        <div>
                            <Nav.Link as={Link} to="/rider">
                                <div className="profile">
                                    <FaShippingFast size={28} />
                                    {auth.name}
                                </div>
                            </Nav.Link>
                        </div>
                    ) : null))}
                    </div>
                    ) : (
                        <>
                            <Nav.Link className="m-3" as={Link} to="/login">Login</Nav.Link>
                            <Nav.Link className="m-3" as={Link} to="register">Register</Nav.Link>
                        </>
                    )
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
                                            <BiUserCircle size={24} />{auth.name}
                                        </Nav.Link>
                                        {auth.isAdmin | auth.isRider ? null : <ProfileNav />}
                                        <div onClick={() => {
                                            dispatch(logoutUser(null))
                                            toast.warning("Logged out!", { position: "bottom-left" });
                                            window.location.href = "/login";
                                        }}>
                                            <Nav.Link as={Link} to="" className="d-flex align-items-center">
                                                <BiLogOut size={24} />Logout
                                            </Nav.Link>
                                        </div>
                                    </Nav>}
                            </Navbar.Offcanvas>
                        </Navbar.Collapse>
                    </Navbar.Toggle>
                    <Form className="d-flex d-block d-md-none col-10 justify-content-center" onSubmit={(e) => { e.preventDefault(); handleSearch() }}>
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
                    </Form>
                </Navbar>}
        </div>

    );
};

export default NavBar;

