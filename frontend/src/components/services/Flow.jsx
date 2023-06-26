import { NavLink, Link } from "react-router-dom";
import {
    FcPaid,
    FcDeployment,
    FcShop,
    FcAutomotive,
    FcReadingEbook,
    FcOnlineSupport,
    FcInTransit,
    FcHome,
    FcAssistant,
    FcDown
} from "react-icons/fc";
import { Accordion } from "react-bootstrap";
import { FaArrowAltCircleRight } from "react-icons/fa";

const Flow = () => {
    return (
        <>
            <div className="col-12 d-flex justify-content-center">
                <h2>How does it work</h2>
            </div>
            <Accordion>
                <Accordion.Item eventKey="0" className="mt-3 border-top">
                    <Accordion.Header>
                        <div className="col-6">
                            <FcShop size={35} /> Shopping
                        </div>
                        <div className="col-5">
                            <FcReadingEbook size={40} /> Order in the Shopping Page
                        </div>
                    </Accordion.Header>
                    <Accordion.Body className="mb-5">
                        <div className="col-12 d-flex mb-5 align-items-center">
                            <div className="col-6 d-flex justify-content-center">
                                <NavLink className="nav-link col-6" to="/shoppingPage">
                                    <FcShop className="col-12" size={100} />
                                    <div className="col-12 d-flex justify-content-center">
                                        Shopping
                                    </div>
                                </NavLink>
                            </div>
                            <div className="col-6 col-md-3">

                                <FcDown size={20} className="col-12" />
                                <FcShop size={40} /> Prepare by the Seller
                                <FcDown size={20} className="col-12" />
                                <FcInTransit size={40} /> To be shipped
                                <FcDown size={20} className="col-12" />
                                <FcHome size={40} /> Delivers to your house
                            </div>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1" className="mt-3 border-top">
                    <Accordion.Header>
                        <div className="col-6">
                            <FcPaid size={35} /> Pabili
                        </div>
                        <div className="col-5">
                            <FcReadingEbook size={40} />  Book in the Pabili Page. Add items for the rider to buy
                        </div>
                    </Accordion.Header>
                    <Accordion.Body className="mb-5">
                        <div className="col-12 d-flex mb-5 align-items-center">
                            <div className="col-6 d-flex justify-content-center">
                                <NavLink className="nav-link col-6" to="/booking/pabili">
                                    <FcPaid className="col-12" size={100} />
                                    <div className="col-12 d-flex justify-content-center">
                                        Pabili
                                    </div>
                                </NavLink>
                            </div>
                            <div className="col-6 col-md-3">
                                <FcDown size={20} className="col-12" />
                                <FcAssistant size={40} /> Calls you to confirm total price
                                <FcDown size={20} className="col-12" />
                                <FcInTransit size={40} /> Ships the items
                                <FcDown size={20} className="col-12" />
                                <FcHome size={40} /> Delivers to your house
                            </div>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2" className="mt-3 border-top">
                    <Accordion.Header>
                        <div className="col-6">
                            <FcDeployment size={35} /> Pakuha
                        </div>
                        <div className="col-5">
                            <FcReadingEbook size={40} />  Book in the Pakuha/Padala Page
                        </div>
                    </Accordion.Header>
                    <Accordion.Body className="mb-5">
                        <div className="col-12 d-flex mb-5 align-items-center">
                            <div className="col-6 d-flex justify-content-center">
                                <NavLink className="nav-link col-6" to="/booking/pakuhaPadala">
                                    <FcDeployment className="col-12" size={100} />
                                    <div className="col-12 d-flex justify-content-center">
                                        Pakuha/Padala
                                    </div>
                                </NavLink>
                            </div>
                            <div className="col-6 col-md-3">
                                <FcDown size={20} className="col-12" />
                                <FcShop size={40} />
                                Pick up by the rider
                                <FcDown size={20} className="col-12" />
                                <FcHome size={40} />
                                Delivers to your house
                            </div>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3" className="mt-3 mb-5 border-top">
                    <Accordion.Header>
                        <div className="col-6">
                            <FcAutomotive size={35} />    Book a Ride
                        </div>
                        <div className="col-5">
                            <FcReadingEbook size={40} />  Book in the Book a Ride Page
                        </div>
                    </Accordion.Header>
                    <Accordion.Body className="mb-5">
                        <div className="col-12 d-flex mb-5 align-items-center">
                            <div className="col-6 d-flex justify-content-center">
                                <Link className="nav-link col-6" to="/booking/pahatidSundo">
                                    <FcAutomotive className="col-12" size={100} />
                                    <div className="col-12 d-flex justify-content-center">
                                        Book a Ride
                                    </div>
                                </Link>
                            </div>
                            <div className="col-6 col-md-3">
                                <FcReadingEbook size={40} /> Book in the Book a Ride Page
                                <FcDown size={20} className="col-12" />
                                <FcOnlineSupport size={40} /> Notify rider
                                <FcDown size={20} className="col-12" />
                                <FcInTransit size={40} /> Send you notification for pick up
                                <FcDown size={20} className="col-12" />
                                <FcHome size={40} /> Ride to your destination
                            </div>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
                <div className="mb-5" style={{ fontSize: '1.5rem' }}>
                    <Link to={'https://sites.google.com/view/moon-delivery/home'} target="_blank">More <FaArrowAltCircleRight /></Link>
                </div>
            </Accordion>

        </>
    )
}

export default Flow
