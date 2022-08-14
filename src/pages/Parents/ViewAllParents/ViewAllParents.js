import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { Spinner, Carousel, Button, Container, Row, Col, Image } from "react-bootstrap"
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
                <div style={{ display: 'flex', justifyContent: 'cener', alignItems: 'center', flexDirection: 'column' }}>
                    <Carousel style={{ maxWidth: "1250px" }}>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://bullymake.com/wp-content/uploads/2015/10/278774-dogs-dobermans-scaled.jpg"
                                alt="First slide"
                            />
                            <Carousel.Caption>
                                <h3>Loki and Marlow</h3>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F47%2F2021%2F09%2F10%2Fdoberman-mama-adopts-stray-kitten-2000.jpg"
                                alt="Second slide"
                            />

                            <Carousel.Caption>
                                <h3>Koda</h3>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://www.bil-jac.com/media/iivhvgbm/doberman-pinscher-1089555870.jpg"
                                alt="Third slide"
                            />

                            <Carousel.Caption>
                                <h3>Harley</h3>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
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
                                <h2>Moms</h2>
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
                            <Col style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                                <h2>Dads</h2>
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
                        </Row>
                    </Container>
                </div>
            </>
        )
    }
    const waiting = () => {
        return (
            <div className="spinnerBox">
                <Spinner variant="primary" animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        )
    }

    return (
        !loading ? loaded() : waiting()
    )
}
export default ViewAllParents