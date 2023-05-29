import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import {
    FcPaid,
    FcDeployment,
    FcShop,
    FcAutomotive,
    FcRight,
    FcReadingEbook,
    FcOnlineSupport,
    FcInTransit,
    FcHome,
    FcDownLeft,
    FcLeft,
    FcDownRight,
    FcAssistant
} from "react-icons/fc";

const Services = () => {
    return (
        <div>
            <Nav>
                <div className="col-12 d-flex border mb-5 mb-5">
                    <div className="col-6">
                        <div className="col-12 d-flex align-items-center justify-content-center">
                            <NavLink className="nav-link" to="/">
                                <FcShop className="col-12" size={50} />
                                <div className="col-12 d-flex justify-content-center">
                                    Shopping
                                </div>
                            </NavLink>
                        </div>
                        <div className="col-12 d-flex align-items-center justify-content-center">
                            <NavLink className="nav-link" to="/booking/pabili">
                                <FcPaid className="col-12" size={50} />
                                <div className="col-12 d-flex justify-content-center">
                                    Pabili
                                </div>
                            </NavLink>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="col-12 d-flex align-items-center justify-content-center">
                            <NavLink className="nav-link " to="/booking/pakuhaPadala">
                                <FcDeployment className="col-12" size={50} />
                                <div className="col-12 d-flex justify-content-center">
                                    Pakuha/Padala
                                </div>
                            </NavLink>
                        </div>
                        <div className="col-12 d-flex align-items-center justify-content-center">
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

            <div className="col-12 d-flex justify-content-center">
                <h2>How does it work</h2>
            </div>

            <div className="col-12 d-flex p-2 mt-5">
                <NavLink className="nav-link col-6" to="/">
                    <FcShop className="col-12" size={100} />
                    <div className="col-12 d-flex justify-content-center">
                        Shopping
                    </div>
                </NavLink>
                <div className="col-6">
                    <FcReadingEbook size={40} /> Order in the Shopping Page <FcRight size={40} />
                    <FcShop size={40} /> Prepare by the Seller <FcRight size={40} />
                    <FcInTransit size={40} /> to be shipped <FcRight size={40} />
                    <FcHome size={40}/> Delivers to your house
                </div>
            </div>
            <div className="col-12 d-flex p-2 mt-5">
                <NavLink className="nav-link col-6" to="/booking/pabili">
                    <FcPaid className="col-12" size={100} />
                    <div className="col-12 d-flex justify-content-center">
                        Pabili
                    </div>
                </NavLink>
                <div className="col-6">
                    <FcReadingEbook size={40} /> Book in the pabili Page. Add items for the rider to buy<FcRight size={40} />
                    <FcAssistant size={40} /> Calls you to confirm total price <FcRight size={40} />
                    <FcInTransit size={40} /> Ships the items <FcRight size={40} />
                    <FcHome size={40}/> Delivers to your house
                </div>
            </div>

            <div className="col-12 d-flex p-2 mt-5">
                <NavLink className="nav-link col-6" to="/booking/pakuhaPadala">
                    <FcDeployment className="col-12" size={100} />
                    <div className="col-12 d-flex justify-content-center">
                        Pakuha/Padala
                    </div>
                </NavLink>
                <div className="col-6">
                    <FcReadingEbook size={40} /> Book in the Pakuha/Padala Page <FcRight size={40} />
                    <FcShop size={40} /> Pick up by the rider <FcRight size={40} />
                    <FcHome size={40}/> Delivers to your house
                </div>
            </div>
            <div className="col-12 d-flex p-2 mt-5">
                <NavLink className="nav-link col-6" to="/booking/pahatidSundo">
                    <FcAutomotive className="col-12" size={100} />
                    <div className="col-12 d-flex justify-content-center">
                        Book a Ride
                    </div>
                </NavLink>
                <div className="col-6">
                    <FcReadingEbook size={40} /> Book in the booking Page <FcRight size={40} />
                    <FcOnlineSupport size={40} /> Notify rider <FcRight size={40} />
                    <FcInTransit size={40} /> Send you notification for pick up <FcRight size={40} />
                    <FcHome size={40}/> Ride to your destination
                </div>
            </div>
        </div>
    )
}
export default Services;
