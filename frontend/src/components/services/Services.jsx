import { NavLink, Outlet } from "react-router-dom";
import { Nav, Card, Col, Row, Container } from "react-bootstrap";
import { GiFullMotorcycleHelmet } from "react-icons/gi";

const Services = () => {
    return (
        <Nav>
            <div className="col-12 d-flex">
                <div className="col-6">
                    <div className="col-12 d-flex align-items-center justify-content-center">
                        <NavLink className="nav-link col-6 justify-content-center align-items-center" to="/">
                            <GiFullMotorcycleHelmet size={50} />
                            Shopping
                        </NavLink>
                    </div>
                    <div className="col-12">
                        <NavLink className="nav-link" to="/booking/pabili">
                            <GiFullMotorcycleHelmet size={50} />
                            Pabili
                        </NavLink>
                    </div>
                </div>
                <div className="col-6 align-items-center">
                    <div className="col-6">
                        <NavLink className="nav-link" to="/booking/pakuhaPadala">
                            <GiFullMotorcycleHelmet size={50} />
                            Pakuha/Padala
                        </NavLink>
                    </div>
                    <div className="col-6">
                        <NavLink className="nav-link" to="/booking/pahatidSundo">
                            <GiFullMotorcycleHelmet size={50} />
                            Book Ride
                        </NavLink>
                    </div>
                </div>
            </div>
        </Nav>
    )
}
export default Services;
