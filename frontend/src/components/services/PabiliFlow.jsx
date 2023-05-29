import { NavLink } from "react-router-dom";
import {
    FcPaid,
    FcReadingEbook,
    FcInTransit,
    FcHome,
    FcDownRight,
    FcAssistant,
    FcDown
} from "react-icons/fc";

const PabiliFlow = () => {
  return (
    <>
      <div className="col-12 d-flex p-2 align-items-center">
    <div className="col-6 d-flex justify-content-center">
        <NavLink className="nav-link col-6" to="/booking/pabili">
            <FcPaid className="col-12" size={100} />
            <div className="col-12 d-flex justify-content-center">
                Pabili
            </div>
        </NavLink>
    </div>
    <div className="col-6 col-md-4">
        <FcReadingEbook size={40} /> Book in the Pabili Page. Add items for the rider to buy
        <FcDown size={20} className="col-12" />
        <FcAssistant size={40} /> Calls you to confirm total price
        <FcDown size={20} className="col-12" />
        <FcInTransit size={40} /> Ships the items
        <FcDown size={20} className="col-12" />
        <FcHome size={40} /> Delivers to your house
    </div>
</div>
    </>
  )
}

export default PabiliFlow
