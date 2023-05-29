import { Link } from "react-router-dom";
import {
    FcAutomotive,
    FcReadingEbook,
    FcOnlineSupport,
    FcInTransit,
    FcHome,
    FcDown
} from "react-icons/fc";

const PahatidSundoFlow = () => {
  return (
    <>
      <div className="col-12 d-flex p-2 mb-5 align-items-center">
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
    </>
  )
}

export default PahatidSundoFlow
