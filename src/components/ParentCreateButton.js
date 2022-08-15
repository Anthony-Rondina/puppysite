import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
const ParentCreateButton = () => {
    return (
        <Container fluid style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "20px", marginBottom: "20px" }}>
            <Row>
                <Col>
                    <Link to="/createparent"><Button variant="success">Create New Parent</Button></Link>
                </Col>
            </Row>
        </Container>
    )
}
export default ParentCreateButton