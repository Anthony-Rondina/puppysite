import { Link } from "react-router-dom"
import { useState } from "react";
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { logout } from "../utilities/users-service";
import Offcanvas from 'react-bootstrap/Offcanvas';
const Header = ({ user, setUser, setShowLogin, showLogin }) => {
    function handleLogOut() {
        logout();
        setUser(null);
    }

    const positve = () => {
        setShowLogin(true)
    }

    const negative = () => {
        setShowLogin(false)
    }
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Navbar style={{ borderBottom: "10px lightGray solid" }} collapseOnSelect expand="md" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Puppy Parade</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/parents">Parents</Nav.Link>
                            <Nav.Link href="/litters">Litters</Nav.Link>
                            <Nav.Link href="/mission">Mission Statement</Nav.Link>
                            <Nav.Link onClick={handleShow}>User Accounts</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Offcanvas show={show} onHide={handleClose} responsive="lg">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Responsive offcanvas</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <p className="mb-0">
                        This is content within an <code>.offcanvas-lg</code>.
                    </p>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}
export default Header