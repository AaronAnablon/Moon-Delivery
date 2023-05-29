import { NavLink } from "react-router-dom";
import {
    FcDeployment,
    FcShop,
    FcReadingEbook,
    FcHome,
    FcDown
} from "react-icons/fc";

const PakuhaFlow = () => {
  return (
    <>
      <div className="col-12 d-flex p-2 align-items-center">
    <div className="col-6 d-flex justify-content-center">
        <NavLink className="nav-link col-6" to="/booking/pakuhaPadala">
            <FcDeployment className="col-12" size={100} />
            <div className="col-12 d-flex justify-content-center">
                Pakuha/Padala
            </div>
        </NavLink>
    </div>
    <div className="col-6 col-md-3">
        <FcReadingEbook size={40} />
        Book in the Pakuha/Padala Page
        <FcDown size={20} className="col-12" />
        <FcShop size={40} />
        Pick up by the rider
        <FcDown size={20} className="col-12" />
        <FcHome size={40} />
        Delivers to your house
    </div>
</div>
    </>
  )
}

export default PakuhaFlow
