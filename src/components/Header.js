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
                            {user ?
                                <>
                                    <Nav.Link>{`Welcome ${user.name}!`}</Nav.Link>
                                    <Nav.Link className="logoutButton" onClick={handleLogOut}>Log Out</Nav.Link>
                                </>
                                :
                                ""}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Offcanvas placement="end" show={show} onHide={handleClose} responsive="lg">
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
                            {console.log(showLogin)}
                            {showLogin ? <LoginForm setUser={setUser} /> : <SignUpForm setUser={setUser} />}
                        </div>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}
export default Header