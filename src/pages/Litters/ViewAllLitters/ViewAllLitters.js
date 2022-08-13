import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { Container, Row, Col } from 'react-bootstrap'
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
                <Link to="/createlitter"><button className="btn btn-secondary">Create New Litter</button></Link>
                <Container fluid style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Row>
                        <Col>
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
export default ViewAllLitters