import { BiUserCircle } from "react-icons/bi"
import { Link } from "react-router-dom"
import { Nav } from "react-bootstrap"

const NavBarEmployee = ({ empType, linkTo, authName }) => {
    return (
        <>
            <div>
                <Nav.Link as={Link} to={linkTo}>
                    <img style={{ width: '2.34rem' }} src="/logo192.png" alt="logo"></img>
                   Moon Delivery | {empType}
                </Nav.Link>
            </div>
        </>
    )
}
export default NavBarEmployee
