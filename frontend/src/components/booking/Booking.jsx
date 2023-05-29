import { Outlet } from "react-router-dom";

const Booking = () => {
  return (
      <div className="col-12 d-flex">    
          <Outlet />
        </div>
  );
};

export default Booking;
