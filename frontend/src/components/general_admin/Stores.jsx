import { Nav, NavDropdown, Navbar } from "react-bootstrap";

function SideNavbar() {
  return (
    <>
      <Navbar bg="light" variant="light" expand="md">
        <Navbar.Brand href="#">Navbar scroll </Navbar.Brand>
        <Navbar.Toggle aria-controls="sidebar" />
        <Navbar.Collapse id="sidebar">
        <Nav className="flex-column flex-lg-row">
            <Nav.Link href="#action1">Home</Nav.Link>
            <Nav.Link href="#action2">Link</Nav.Link>
            <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" disabled>
              Link
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

     </>
  );
}

export default SideNavbar;
