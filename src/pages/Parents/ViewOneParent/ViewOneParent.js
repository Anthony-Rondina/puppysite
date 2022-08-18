import { useState, useEffect } from "react"
import axios from "axios"
import { Link, useParams } from "react-router-dom"
import { Container, Row, Col, Carousel, Image, Spinner, Button } from 'react-bootstrap'
import LitterSlide from "../../../components/LitterSlide"
import ParentCreateButton from "../../../components/ParentCreateButton"
import styles from "./viewOneParent.module.css"
const ViewOneParent = ({ chosenParent, setChosenParent }) => {
    const { id } = useParams()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                const response = await axios.get(`/api/parents/${id}`)
                setChosenParent(response.data)
                setLoading(false)

            } catch (err) {
                console.log(err)
            }
        })()
    }, [])
    const loaded = () => {
        return (
            <>
                <div className={styles.outerWrapper} style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexDirection: 'column', }} >
                    <Container className={styles.parentBackground2}>
                        <div>
                            <Container className={styles.parentName} fluid style={{ backgroundColor: "tan", display: "flex", justifyContent: "center", alignItems: "center", height: "5vh" }}>
                                <h1>{chosenParent.name}</h1>
                            </Container>

                            <Container className={styles.parentButtons} style={{ display: 'flex', justifyContent: 'space-around' }}>
                                <Link to={`/parents`}><Button variant="secondary">Back to All Parents</Button></Link>
                                <Link to={`/editparent/${id}`}><Button>{`Edit ${chosenParent.name}`}</Button></Link>
                            </Container>
                        </div>

                        <Container className={styles.parentBackground} >
                            <Image style={{ maxHeight: "600px" }} fluid src={chosenParent.splashImg}></Image>
                        </Container>

                        <Container className={styles.litterBox} style={{ backgroundColor: "tan", display: "flex", justifyContent: "center" }}>
                            <Row style={{ width: "80%", display: "flex", justifyContent: "center" }} >
                                <Container style={{ display: "flex", justifyContent: "center" }}>
                                    <h1>{`${chosenParent.name}'s Litters`}</h1>
                                </Container>
                                <Col style={{ display: "flex", alignItems: "center", justifyContent: "space-around", flexWrap: "wrap" }}>
                                    {chosenParent.litters.length ?
                                        chosenParent.litters.map((litter, idx) => {
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
                                        : <h4>None yet, check back soon!</h4>}
                                </Col>
                            </Row>
                        </Container>
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
export default ViewOneParent