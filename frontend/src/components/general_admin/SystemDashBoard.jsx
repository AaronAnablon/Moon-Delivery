import styled from "styled-components";
import { Outlet, NavLink } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

const SystemDashboard = () => {
  const auth = useSelector((state) => state.auth);
  const [showSideNav, setShowSideNav] = useState(true);

  if (!auth.isAdmin) return <p>Access denied. Not an Admin!</p>;

  return (
    <StyledDashboard>
      <SideNav showSideNav={showSideNav}>
      <ToggleNavButton onClick={() => setShowSideNav(!showSideNav)}>
        {showSideNav ? "<" : "☰"}
      </ToggleNavButton>
        <h3>Admin Panel</h3>
        <NavLink
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to="/admin/summary"
        >
          Summary
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to="/admin/products"
        >
          Products
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to="/admin/orders"
        >
          Orders
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to="/admin/users"
        >
          Users
        </NavLink>
      </SideNav>
      <Content showSideNav={showSideNav}>
        <Outlet />
      </Content>
    </StyledDashboard>
  );
};

export default SystemDashboard;

const StyledDashboard = styled.div`
  display: flex;
  height: 100vh;
 
`;

const ToggleNavButton = styled.button`
  display: block;
  position: fixed;
  top: -.3rem;
  left: 5rem;
  z-index: 9999999;
  width: clamp(30px, 2vw, 24px);
  background: #4b70e2;
  color: #f9f9f9;
`;

const SideNav = styled.div`
  height: calc(100vh - 70px);
  position: fixed;
  overflow-y: auto;
  width: 30%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  transition: transform 0.3s ease-in-out;
  transform: ${({ showSideNav }) =>
    showSideNav ? "translateX(0)" : "translateX(-20%)"};

  h3 {
    margin: 1.5rem 0 1rem 0;
    padding: 0;
    text-transform: uppercase;
    font-size: ${({ showSideNav }) =>
    showSideNav ? "clamp(14px, 2vw, 28px);" : "0px"};
  }

  a {
    text-decoration: none;
    margin-bottom: 1rem;
    font-size: ${({ showSideNav }) =>
    showSideNav ? "clamp(12px, 2vw, 24px);" : "0px"};
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-left: ${({ showSideNav }) => (showSideNav ? "34vw" : "10vw")};
  width: 80%;
  transition: margin-left 0.3s ease-in-out;
`;
