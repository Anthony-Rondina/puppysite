import { Link } from "react-router-dom"
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'
const Header = () => {
    return (
        <>
            <Nav style={{ backgroundColor: "black" }} variant="tabs" defaultActiveKey="/home">
                <Nav.Item>
                    <Nav.Link style={{ color: "white" }} href="/">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link style={{ color: "white" }} href="/litters" eventKey="link-1">Litters</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link style={{ color: "white" }} href="/parents" eventKey="link-2" >
                        Parents
                    </Nav.Link>
                </Nav.Item>
            </Nav>
            {/* <nav>
                <Link to="/"><h2>Home</h2></Link>
                <Link to="/litters"><h2>Litters</h2></Link>
                <Link to="/parents"><h2>Parents</h2></Link>
            </nav> */}
        </>
    )
}
export default Header