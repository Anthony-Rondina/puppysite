import { Link } from "react-router-dom"
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
const Header = () => {


    return (
        <>
            <Navbar style={{ borderBottom: "10px lightGray solid" }} collapseOnSelect expand="md" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Triple Cross Ranch</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/parents">Parents</Nav.Link>
                            <Nav.Link href="/litters">Litters</Nav.Link>
                            <Nav.Link href="/">Mission Statement</Nav.Link>
                            <Nav.Link href="/">Important Info</Nav.Link>
                            <Nav.Link href="/">Contact Us</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {/* <nav>
                <Link to="/"><h2>Home</h2></Link>
                <Link to="/litters"><h2>Litters</h2></Link>
                <Link to="/parents"><h2>Parents</h2></Link>
            </nav> */}
        </>
    )
}
export default Header