import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { Container, Row, Col, Carousel, Spinner, Button } from 'react-bootstrap'
import LitterSlide from "../../../components/LitterSlide"
import LitterCreateButton from "../../../components/LitterCreateButton"
import styles from './viewAllLitters.module.css'
const ViewAllLitters = ({ user }) => {
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
                <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexDirection: 'column' }} >
                    <LitterSlide />

                    {user ? user.admin ?
                        <LitterCreateButton />
                        :
                        <br />
                        : ""}
                    <Container style={{ backgroundColor: "tan", display: "flex", justifyContent: "center" }}>
                        <Row style={{ width: "80%", display: "flex", justifyContent: "center" }} >
                            <Container style={{ display: "flex", justifyContent: "center" }}>
                                <h1>Check out our Litters!</h1>
                            </Container>
                            <Col style={{ display: "flex", alignItems: "center", justifyContent: "space-around", flexWrap: "wrap" }}>
                                {litters.length ?
                                    litters.map((litter, idx) => {
                                        return (
                                            <Link key={idx} to={`/litter/${litter._id}/${litter.mother._id}/${litter.father._id}`}>
                                                <div className="mb-3 card" style={{ width: "18rem" }}>
                                                    <img className="card-img-top" src={litter.splashImg} alt="Card image cap" />
                                                    <div className="card-body">
                                                        <p className={styles.cardText}>{litter.name}</p>
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
export default ViewAllLitters