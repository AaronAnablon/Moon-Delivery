import TopProducts from "../products/TopProducts";
import Services from "../services/Services";
import Products from "../products/Products"
import { Outlet } from "react-router-dom";

const Booking = () => {
  return (
      <div className="col-12 d-flex">    
        <div className="col-lg-4 d-none d-lg-block border">
            <TopProducts />
            <Products />
          </div>
        <div className="col-lg-8 col-12">
          <Outlet />
        </div>
      </div>
  );
};

export default Booking;
