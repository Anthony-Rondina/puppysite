import { useState, useEffect } from "react"
import axios from "axios"
import { Link, useParams } from "react-router-dom"
import { Container, Row, Col, Carousel, Image, Spinner, Button } from 'react-bootstrap'
import styles from './viewLitters.module.css'
const ViewLitter = ({ setLitter, litter }) => {
    const { id } = useParams()
    const { mom } = useParams()
    const { dad } = useParams()
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                const response = await axios.get(`/api/litters/${id}`)
                setLitter(response.data)
                setLoading(false)
            } catch (err) {
                console.log(err)
            }
        })()
    }, [])
    const loaded = () => {
        return (
            <>
                {console.log(litter.mother.splashImg)}
                <div className={styles.outerWrapper} style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexDirection: 'column', }} >
                    <Container className={styles.parentBackground2}>
                        <div>
                            <Container className={styles.parentName} fluid style={{ backgroundColor: "tan", display: "flex", justifyContent: "center", alignItems: "center", height: "5vh" }}>
                                <h1>{litter.name}</h1>
                            </Container>

                            <Container className={styles.parentButtons} style={{ display: 'flex', justifyContent: 'space-around' }}>
                                <Link to={`/parents`}><Button variant="secondary">Back to All Litters</Button></Link>
                                <Link to={`/editparent/${id}`}><Button>{`Edit ${litter.name}`}</Button></Link>
                            </Container>
                        </div>

                        <Container className={styles.parentBackground} style={{ padding: "0" }} >
                            <Image style={{ maxHeight: "600px" }} fluid src={litter.splashImg}></Image>
                        </Container>

                        <Container className={styles.litterBox} style={{ backgroundColor: "tan", display: "flex", justifyContent: "center" }}>
                            <Row style={{ width: "80%", display: "flex", justifyContent: "center" }} >
                                <Container style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: 'center' }}>
                                    <h1>{`${litter.name}'s Parents`}</h1>
                                    <hr />
                                    <Container className={styles.litterParent}>
                                        <div>
                                            <h2>Mother</h2>
                                            <Link to={`/parent/${mom}`}>
                                                <div className="mb-3 card" style={{ width: "18rem" }}>
                                                    <img className="card-img-top" src={litter.mother.splashImg} alt="Card image cap" />
                                                    <div className="card-body">
                                                        <p className="card-text">{litter.mother.name}</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                        <div>
                                            <h2>Father</h2>
                                            <Link to={`/parent/${mom}`}>
                                                <div className="mb-3 card" style={{ width: "18rem" }}>
                                                    <img className="card-img-top" src={litter.father.splashImg} alt="Card image cap" />
                                                    <div className="card-body">
                                                        <p className="card-text">{litter.father.name}</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </Container>

                                </Container>
                                <Container fluid className={styles.backgroundSeparation}></Container>
                                <Container style={{ display: "flex", justifyContent: "center", flexDirection: 'column', alignItems: 'center' }}>
                                    <h1 >{`${litter.name}'s Puppies`}</h1>
                                    <hr />
                                </Container>
                                <Col style={{ display: "flex", alignItems: "center", justifyContent: "space-around", flexWrap: "wrap" }}>

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
        !loading && litter.mother ? loaded() : waiting()
    )
}
export default ViewLitter