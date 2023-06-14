import { NavLink } from "react-router-dom";
import { FcComboChart, FcExport, FcFinePrint, FcSettings } from "react-icons/fc";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Col } from "react-bootstrap";

const AdminNav = () => {
  const auth = useSelector((state) => state.auth);

  const Navigation = () => {
    return (
      <>
        <NavLink
          className="nav-link m-2"
          to="/admin/summary"
        >
          <FcComboChart size={40} />
          Summary
        </NavLink>
        <NavLink
          className="nav-link m-2"

          to="/admin/products"
        >
          <FcFinePrint size={40} />
          Products
        </NavLink>
        <NavLink
          className="nav-link m-2"

          to="/admin/orders"
        >
          <FcExport size={40} />
          Orders
        </NavLink>
        <NavLink
          className="nav-link m-2"

          to="/user/userSettings"
        ><FcSettings size={40} />
          Settings
        </NavLink>
      </>
    )
  }



  if (!auth.isAdmin) return <p>Access denied. Not an Admin!</p>;
  return (
    <div className="container-fluid d-lg-flex ">
      <div className="col-lg-3 d-none d-md-block position-relative">
        <Col className="position-sticky" style={{ top: '80px' }}>
          <Navigation />
        </Col>
      </div>
      <div style={{ top: '70px' }} className="d-flex bg-light flex-row sticky-top 
        d-block d-md-none flex-nowrap overflow-auto container-fluid">
        <Navigation />
      </div>
      <div className="col-12 col-lg-9">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminNav;
