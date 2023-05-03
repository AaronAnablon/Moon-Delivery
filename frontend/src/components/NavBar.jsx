import {Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import styled from "styled-components";
import {logoutUser} from "../slices/authSlice";
import {toast} from "react-toastify";

const NavBar = () => {
    const dispatch = useDispatch();
    const {cartTotalQuantity} = useSelector((state) => state.cart);
    const auth = useSelector((state) => state.auth);

    const icon = <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
        <path d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"/>
    </svg>
    const riderIcon = <svg xmlns="http://www.w3.org/2000/svg" width="24"
        style={
            {fill: 'white'}
        }
        height="24"
        id="Layer_1"
        data-name="Layer 1"
        viewBox="0 0 24 24"><path d="M4.5,14A4.5,4.5,0,1,0,9,18.5,4.505,4.505,0,0,0,4.5,14Zm0,6A1.5,1.5,0,1,1,6,18.5,1.5,1.5,0,0,1,4.5,20Zm15-6A4.5,4.5,0,1,0,24,18.5,4.505,4.505,0,0,0,19.5,14Zm0,6A1.5,1.5,0,1,1,21,18.5,1.5,1.5,0,0,1,19.5,20ZM14,3.5A2.5,2.5,0,1,1,16.5,6,2.5,2.5,0,0,1,14,3.5Zm-3.858,8.325,3.358,2.4V20h-3V15.771L8.22,14.132A3.449,3.449,0,0,1,7.4,9.9,1.994,1.994,0,0,1,6,8C6,6,8.818,5,9.923,5a6.4,6.4,0,0,1,3.922,1.372c.068.049,5.217,4.5,5.217,4.5l-1.969,2.262-4.369-3.8-2.607,1.826a.5.5,0,0,0-.117.329A.487.487,0,0,0,10.142,11.825Z"/></svg>

    return (
        <nav className="nav-bar">
            {
            ! auth.isAdmin && ! auth.isRider && (
                <>
                    <Link to="/">
                        <h2>Moon Delivery</h2>
                    </Link>
                    <Link to="/cart">
                        <div className="nav-bag">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-handbag-fill" viewBox="0 0 16 16">
                                <path d="M8 1a2 2 0 0 0-2 2v2H5V3a3 3 0 1 1 6 0v2h-1V3a2 2 0 0 0-2-2zM5 5H3.36a1.5 1.5 0 0 0-1.483 1.277L.85 13.13A2.5 2.5 0 0 0 3.322 16h9.355a2.5 2.5 0 0 0 2.473-2.87l-1.028-6.853A1.5 1.5 0 0 0 12.64 5H11v1.5a.5.5 0 0 1-1 0V5H6v1.5a.5.5 0 0 1-1 0V5z"/>
                            </svg>
                            <span className="bag-quantity">
                                <span>{cartTotalQuantity}</span>
                            </span>
                        </div>
                    </Link>
                </>
            )
        }
            {
            auth._id ? (
                <Links> {
                    auth.isAdmin ? (
                        <div>
                            <Link to="/admin">
                                <div className="profile">
                                    {icon}Admin
                                </div>
                            </Link>
                        </div>
                    ) : (auth.isRider ? (
                        <div>
                            <Link to="/rider">
                                <div className="profile">
                                    {riderIcon}
                                    {
                                    auth.name
                                } </div>
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <Link to="/user/order">
                                <div className="profile">
                                    {icon}
                                    {
                                    auth.name
                                } </div>
                            </Link>
                        </div>
                    ))
                }

                    <div className="profile"
                        onClick={
                            () => {
                                dispatch(logoutUser(null));
                                toast.warning("Logged out!", {position: "bottom-left"});
                                window.location.href = "/login";
                            }
                    }>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="30" height="30" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                            <path d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"/>
                        </svg>
                        Logout
                    </div>
                </Links>
            ) : (
                <AuthLinks>
                    <div className="profile">
                        <Link to="/login">Login</Link>
                        <Link to="register">Register</Link>
                    </div>
                </AuthLinks>
            )
        } </nav>
    );
};

export default NavBar;

const AuthLinks = styled.div `
  a {
    &:last-child {
      margin-left: 2rem;
    }
  }
`;

const Links = styled.div `
  color: white;
  display: flex;

  div {
    cursor: pointer;

    &:last-child {
      margin-left: 2rem;
    }
  }
`;
