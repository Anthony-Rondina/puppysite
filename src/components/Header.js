import { Link } from "react-router-dom"
import { useState } from "react";
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { logout } from "../utilities/users-service";
import Offcanvas from 'react-bootstrap/Offcanvas';
import LoginForm from '../components/LoginForm/LoginForm'
import SignUpForm from "../components/SignUpForm"
import NavDropdown from 'react-bootstrap/NavDropdown';
import styles from './Components.css'
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
                            {!user ?
                                <Nav.Link onClick={handleShow}>User Login</Nav.Link>
                                :
                                ""
                            }
                            {user ?
                                <>
                                    <NavDropdown title={`Welcome ${user.name}!`} id="basic-nav-dropdown">
                                        <NavDropdown.Item href="#action/3.3">
                                            <Link className={styles.linkName} to='/editprofile'>Edit Profile
                                            </Link>
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.2" onClick={handleLogOut}>Log Out
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </>
                                :
                                ""}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Offcanvas placement="end" show={show} onHide={handleClose} >
                {showLogin ?
                    <>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Need an Account? <Button variant="success" onClick={() => { setShowLogin(!showLogin) }}> Sign Up!</Button></Offcanvas.Title>
                        </Offcanvas.Header>
                    </>
                    :
                    <>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Already Have an Account? <Button variant="success" onClick={() => { setShowLogin(!showLogin) }}> Log In!</Button></Offcanvas.Title>
                        </Offcanvas.Header>
                    </>
                }

                <Offcanvas.Body>
                    <div className='signInBlock' >
                        <div className='innerSignIn'>
                            {showLogin ? <LoginForm setUser={setUser} show={show} setShow={setShow} /> : <SignUpForm setUser={setUser} show={show} setShow={setShow} />}
                        </div>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}
export default Header