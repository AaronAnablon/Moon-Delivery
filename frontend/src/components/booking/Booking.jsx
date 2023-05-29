import TopProducts from "../products/TopProducts";
import Services from "../services/Services";
import Products from "../products/Products"
import { Outlet } from "react-router-dom";

const Booking = () => {
  return (
      <div className="col-12 d-flex">    
        <div className="col-lg-6 d-none d-lg-block">
            <TopProducts />
            <Products />
          </div>
        <div className="col-lg-6 col-12">
          <Services />
          <Outlet />
        </div>
      </div>
  );
};

export default Booking;
