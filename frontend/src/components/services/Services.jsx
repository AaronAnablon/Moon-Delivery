import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import {
    FcPaid,
    FcDeployment,
    FcShop,
    FcAutomotive
} from "react-icons/fc";
import Flow from "./Flow";

const Services = () => {
    return (
        <div className="container-fluid">
            <Nav>
                <div className="col-12 d-flex border mb-5">
                    <div className="col-6 d-md-flex">
                        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                            <NavLink className="nav-link" to="/">
                                <FcShop className="col-12" size={50} />
                                <div className="col-12 d-flex justify-content-center">
                                    Shopping Page
                                </div>
                            </NavLink>
                        </div>
                        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                            <NavLink className="nav-link" to="/booking/pabili">
                                <FcPaid className="col-12" size={50} />
                                <div className="col-12 d-flex justify-content-center">
                                    Pabili
                                </div>
                            </NavLink>
                        </div>
                    </div>
                    <div className="col-6 d-md-flex">
                        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                            <NavLink className="nav-link " to="/booking/pakuhaPadala">
                                <FcDeployment className="col-12" size={50} />
                                <div className="col-12 d-flex justify-content-center">
                                    Pakuha/Padala
                                </div>
                            </NavLink>
                        </div>
                        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                            <NavLink className="nav-link" to="/booking/pahatidSundo">
                                <FcAutomotive className="col-12" size={50} />
                                <div className="col-12 d-flex justify-content-center">
                                    Book a Ride
                                </div>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </Nav>
            <Flow />
        </div>
    )
}
export default Services;
