import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { Button, Container, Row, Col } from "react-bootstrap"
import "./viewAllParents.css"
const ViewAllParents = () => {
    const [parents, setParents] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                const response = await axios.get(`/api/parents/`)
                // console.log("response is", response.data)
                setParents(response.data)
                setLoading(false)
            } catch (err) {
                console.log(err)
            }
        })()
    }, [])
    const loaded = () => {
        return (
            <>
                <div>
                    <Container fluid style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "20px", marginBottom: "20px" }}>
                        <Row>
                            <Col>
                                <Link to="/createparent"><Button variant="success">Create New Parent</Button></Link>
                            </Col>
                        </Row>
                    </Container>

                    <Container style={{ backgroundColor: "tan", display: "flex", justifyContent: "center" }}>
                        <Row style={{ width: "80%", display: "flex", justifyContent: "center" }} >
                            <Container style={{ display: "flex", justifyContent: "center" }}>
                                <h1>Our Awesome Parents!</h1>
                            </Container>
                            <Col style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                                <h2>Males</h2>
                                {parents.map((dog) => {
                                    return (
                                        <>
                                            <Link to={`/parents/${dog._id}`}>
                                                {dog.gender ?
                                                    <div className="mb-3 card" style={{ width: "18rem" }}>
                                                        <img className="card-img-top" src={dog.splashImg} alt="Card image cap" />
                                                        <div className="card-body">
                                                            <p className="parentName card-text">{dog.name}</p>
                                                        </div>
                                                    </div>
                                                    : ""}
                                            </Link>
                                        </>
                                    )
                                })}
                            </Col>
                            <Col style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                                <h2>Females</h2>
                                {parents.map((dog) => {
                                    return (
                                        <><Link to={`/parents/${dog._id}`}>
                                            {!dog.gender ?
                                                <div className="mb-3 card" style={{ width: "18rem" }}>
                                                    <img className="card-img-top" src={dog.splashImg} alt="Card image cap" />
                                                    <div className="card-body">
                                                        <p className=" parentName card-text">{dog.name}</p>
                                                    </div>
                                                </div>
                                                : ""}
                                        </Link>
                                        </>
                                    )
                                })}
                            </Col>

                        </Row>
                    </Container>
                </div>
            </>
        )
    }
    const waiting = () => {
        return <h1>Loading</h1>
    }

    return (
        !loading ? loaded() : waiting()
    )
}
export default ViewAllParents