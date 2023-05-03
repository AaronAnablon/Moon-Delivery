import { NavLink, Outlet } from "react-router-dom";

const Booking = () => {
  return (
    <div className="home-container">
     <ul>
      <li>  <NavLink
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to= "/booking/pabili"
        >
          Pabili
        </NavLink></li>
      <li>   <NavLink
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to="/booking/pakuhaPadala"
        >
          Pakuha/Padala
        </NavLink></li>
      <li><NavLink
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to="/booking/pahatidSundo"
        >
          Pahatid/Sundo
        </NavLink> </li>
     </ul>
    
     <Outlet />
        
    </div>
  );
};

export default Booking;
