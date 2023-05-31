import { NavLink } from "react-router-dom";
import { Nav } from 'react-bootstrap';
import { FcComboChart, FcExport, FcFinePrint, FcSettings } from "react-icons/fc";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminNav = () => {
  const auth = useSelector((state) => state.auth);

  if (!auth.isAdmin) return <p>Access denied. Not an Admin!</p>;
  return (
    <div className="container-fluid d-lg-flex ">
        <div style={{top: '108px' }} className="d-flex bg-light flex-row sticky-top 
        col-lg-3 shadow flex-lg-column flex-nowrap overflow-auto">
          <NavLink
            className="nav-link m-2"
            to="/admin/summary"
          >
            <FcComboChart size={40}/>
            Summary
          </NavLink>
          <NavLink
            className="nav-link m-2"

            to="/admin/products"
          >
            <FcFinePrint size={40}/>
            Products
          </NavLink>
          <NavLink
            className="nav-link m-2"

            to="/admin/orders"
          >
            <FcExport size={40}/>
            Orders
          </NavLink>
          <NavLink
            className="nav-link m-2"

            to="/admin/users"
          ><FcSettings size={40}/>
            Settings
          </NavLink>
        </div>

      <div className="col-12 col-lg-9">
         <Outlet />
      </div>
    </div>
  );
};

export default AdminNav;
