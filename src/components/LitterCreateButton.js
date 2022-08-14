import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
const LitterCreateButton = () => {
    return (
        <Container fluid style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "20px", marginBottom: "20px" }}>
            <Row>
                <Col>
                    <Link to="/createlitter"><Button variant="success">Create New Litter</Button></Link>
                </Col>
            </Row>
        </Container>
    )
}
export default LitterCreateButton