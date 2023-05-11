import { Outlet, NavLink } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const GeneralAdmin = () => {
  const auth = useSelector((state) => state.auth);
  const [expanded, setExpanded] = useState(false);

  if (!auth.isAdmin) return <p>Access denied. Not an Admin!</p>;

  return (
    <Container fluid>
      <Row>
        <Col sm={2} className="bg-light sidebar">
          <Nav
            defaultActiveKey="/system/systemDashboard"
            className="flex-column"
            activeKey={window.location.pathname}
            onSelect={(selectedKey) => {
              window.location.pathname = selectedKey;
              setExpanded(false);
            }}
            expanded={expanded}
          >
            <Nav.Item>
              <NavLink to="/system/systemDashboard" className="nav-link">
                Dashboard
              </NavLink>
            </Nav.Item>
            <NavDropdown title="System" id="nav-dropdown">
              <NavDropdown.Item>
                <NavLink to="/system/systemStores" className="dropdown-link">
                  Stores
                </NavLink>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <NavLink to="/system/systemRiders" className="dropdown-link">
                  Riders
                </NavLink>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <NavLink to="/system/systemProfile" className="dropdown-link">
                  Profiles
                </NavLink>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Col>
        <Col sm={10}>
          <button
            type="button"
            className="btn btn-link d-md-none"
            onClick={() => setExpanded(!expanded)}
          >
            <i className="bi bi-list"></i>
          </button>
          <div className="d-none d-md-block">
            <h3>General Admin</h3>
          </div>
          <div>
            <Outlet />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default GeneralAdmin;
