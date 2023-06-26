import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import {
    FcPaid,
    FcDeployment,
    FcShop,
    FcAutomotive
} from "react-icons/fc";
import Flow from "./Flow";
import Blog from "../Blog";

const Services = () => {
    return (
        <div className="container-fluid mt-3">
            <Nav>
                <div className="col-12 d-flex mb-5 mt-5">
                    <div className="col-6 d-md-flex">
                        <div className="col-12 p-3 col-md-6 d-flex align-items-center justify-content-center">
                            <NavLink style={{background: 'linear-gradient(45deg, rgba(255,255,255,1) 71%, rgba(244,61,0,1) 71%)'}} className="nav-link col-11 m-2 shadow-sm border" to="/shoppingPage">
                                <FcShop className="col-6" size={70} />
                                <div className="col-12 d-flex justify-content-center">
                                    Shopping Page
                                </div>
                            </NavLink>
                        </div>
                        <div className="col-12 p-3 col-md-6 d-flex align-items-center justify-content-center">
                            <NavLink style={{background: 'linear-gradient(45deg, rgba(255,255,255,1) 71%, rgba(244,61,0,1) 71%)'}} className="nav-link col-11 m-2 shadow-sm border" to="/booking/pabili">
                                <FcPaid className="col-6" size={70} />
                                <div className="col-12 d-flex justify-content-center">
                                    Pabili
                                </div>
                            </NavLink>
                        </div>
                    </div>
                    <div className="col-6 d-md-flex">
                        <div className="col-12 p-3 col-md-6 d-flex align-items-center justify-content-center">
                            <NavLink style={{background: 'linear-gradient(45deg, rgba(255,255,255,1) 71%, rgba(244,61,0,1) 71%)'}} className="nav-link col-11 m-2 shadow-sm border" to="/booking/pakuhaPadala">
                                <FcDeployment className="col-6" size={70} />
                                <div className="col-12 d-flex justify-content-center">
                                    Pakuha/Padala
                                </div>
                            </NavLink>
                        </div>
                        <div className="col-12 p-3 col-md-6 d-flex align-items-center justify-content-center">
                            <NavLink style={{background: 'linear-gradient(45deg, rgba(255,255,255,1) 71%, rgba(244,61,0,1) 71%)'}} className="nav-link col-11 m-2 shadow-sm border" to="/booking/pahatidSundo">
                                <FcAutomotive className="col-6" size={70} />
                                <div className="col-12 d-flex justify-content-center">
                                    Book a Ride
                                </div>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </Nav>
            <Blog />
            <Flow />
        </div>
    )
}
export default Services;
