import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { Container, Row, Col, Carousel, Spinner } from 'react-bootstrap'
const ViewAllLitters = () => {
    const [litters, setLitters] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                const response = await axios.get(`/api/litters/`)
                // console.log("response is", response.data)
                setLitters(response.data)
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
                                src="https://i2-prod.irishmirror.ie/incoming/article5037461.ece/ALTERNATES/s1200b/puppies-main.jpg"
                                alt="First slide"
                            />
                            <Carousel.Caption>
                                <h3>Spring 2021 Litter</h3>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://nebula.wsimg.com/ca7a93ae5cb5a52d6657e5ee205f6849?AccessKeyId=3927BCA0D8471111AFC3&disposition=0&alloworigin=1"
                                alt="Second slide"
                            />

                            <Carousel.Caption>
                                <h3>Summer 2021 Litter</h3>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://images.squarespace-cdn.com/content/v1/5d4cff87cba6000001952085/1565712359608-AT3EHEAZIWCNT58FCJ9X/processed_20190218_171233.jpg"
                                alt="Third slide"
                            />

                            <Carousel.Caption>
                                <h3>Winter 2021 Litter</h3>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                    <Container fluid style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "20px", marginBottom: "20px" }}>
                        <Row>
                            <Col>
                                <Link to="/createlitter"><button className="btn btn-secondary">Create New Litter</button></Link>
                            </Col>
                        </Row>
                    </Container>

                    <Container style={{ backgroundColor: "tan", display: "flex", justifyContent: "center" }}>
                        <Row style={{ width: "80%", display: "flex", justifyContent: "center" }} >
                            <Container style={{ display: "flex", justifyContent: "center" }}>
                                <h1>Check out our Litters!</h1>
                            </Container>
                            <Col style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                                <h2>Litters</h2>
                                {litters.length ?
                                    litters.map((litter, idx) => {
                                        return (
                                            <Link key={idx} to={`/litter/${litter._id}/${litter.mother._id}/${litter.father._id}`}>
                                                <div className="mb-3 card" style={{ width: "18rem" }}>
                                                    <img className="card-img-top" src={litter.splashImg} alt="Card image cap" />
                                                    <div className="card-body">
                                                        <p className="card-text">{litter.name}</p>
                                                    </div>
                                                </div>

                                            </Link>
                                        )
                                    })
                                    : ""}
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
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        )
    }

    return (
        !loading ? loaded() : waiting()
    )
}
export default ViewAllLitters