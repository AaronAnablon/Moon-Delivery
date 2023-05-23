import { NavLink } from "react-router-dom";
const NavCategories = ({handleSortByBrand}) => {
  return (
    <div className="d-flex flex-row justify-content-center">
    <nav className="sub-nav">
      <ul className="sub-nav-ul">
        <li >
          <NavLink onClick={() => handleSortByBrand("")}>
            All
          </NavLink>
        </li>
        <li>
          <NavLink onClick={() => handleSortByBrand("Accesories")}>
            Accesories
          </NavLink>
        </li>
        <li>
          <NavLink onClick={() => handleSortByBrand("Cosmetics")}>
            Cosmetics
          </NavLink>
        </li>
        <li>
          <NavLink onClick={() => handleSortByBrand("Food")}>
            Food
          </NavLink>
        </li>
        <li>
          <NavLink onClick={() => handleSortByBrand("Other")}>
            Other
          </NavLink>
        </li>
        <li>
          <NavLink className="nav-link" to="/booking/pabili" >
            Services
          </NavLink>
        </li>
      </ul>
    </nav>
  </div>
  )
}

export default NavCategories
