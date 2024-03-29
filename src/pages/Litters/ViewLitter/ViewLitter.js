import { useState, useEffect } from "react"
import axios from "axios"
import { Link, useParams } from "react-router-dom"
import { Container, Row, Col, Carousel, Image, Spinner, Button } from 'react-bootstrap'
import styles from './viewLitters.module.css'
const ViewLitter = ({ setLitter, litter, user }) => {
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
                <div className={styles.outerWrapper} style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexDirection: 'column', }} >
                    <Container className={styles.parentBackground2}>
                        <div>
                            <Container className={styles.parentName} fluid style={{ backgroundColor: "tan", display: "flex", justifyContent: "center", alignItems: "center", height: "5vh" }}>
                                <h1>{litter.name}</h1>
                            </Container>

                            <Container className={styles.parentButtons} style={{ display: 'flex', justifyContent: 'space-around' }}>
                                <Link to={`/litters`}><Button variant="secondary">Back to All Litters</Button></Link>
                                {user ? user.admin ? <Link to={`/editlitter/${id}/${litter.mother}/${litter.father}`}><Button variant="warning">{`Edit ${litter.name}`}</Button></Link> : "" : ""}

                            </Container>
                        </div>

                        <Container className={styles.parentBackground} style={{ padding: "0" }} >
                            <Image style={{ maxHeight: "600px" }} fluid src={litter.splashImg}></Image>
                        </Container>

                        <Container className={styles.litterBox} style={{ backgroundColor: "tan", display: "flex", justifyContent: "center" }}>
                            <Row   >
                                <Col style={{ display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: "center" }}  >
                                    <h1>{`${litter.name}'s Parents`}</h1>
                                    <hr />
                                    <Container className={styles.litterParent}>
                                        <Row style={{ width: "80%", display: "flex", justifyContent: "center" }}>
                                            <Col style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                                                <h2>Mother</h2>
                                                <Link to={`/parents/${mom}`}>
                                                    <div className="mb-3 card" style={{ width: "18rem" }}>
                                                        <img className="card-img-top" src={litter.mother.splashImg} alt="Card image cap" />
                                                        <div className="card-body">
                                                            <p style={{ color: 'black', textAlign: 'center', fontSize: '25px', textDecoration: 'none' }} className="card-text">{litter.mother.name}</p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </Col>
                                            <Col style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                                                <h2>Father</h2>
                                                <Link to={`/parents/${dad}`}>
                                                    <div className="mb-3 card" style={{ width: "18rem" }}>
                                                        <img className="card-img-top" src={litter.father.splashImg} alt="Card image cap" />
                                                        <div className="card-body">
                                                            <p style={{ color: 'black', textAlign: 'center', fontSize: '25px', textDecoration: 'none' }} className="card-text">{litter.father.name}</p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </Col>
                                        </Row>
                                    </Container>

                                </Col>
                                <Container className={styles.backgroundSeparation}></Container>
                                <Container style={{ display: "flex", justifyContent: "center", flexDirection: 'column', alignItems: 'center' }}>
                                    <h1 >{`${litter.name}'s Puppies`}</h1>
                                    <hr />
                                    <Container fluid style={{ display: "flex", justifyContent: 'space-around' }}>
                                        <h2>Males</h2>
                                        <h2>Females</h2>
                                    </Container>
                                    {user ? user.admin ? <Link to={`/createpuppy/${litter._id}/${mom}/${dad}`}><Button variant="warning">{`Create Puppy for ${litter.name}`}</Button></Link> : "" : ""}
                                    <Container className="mb-5" >
                                        <Row >
                                            <Col className={styles.puppySort}>
                                                {litter.puppies.length ?

                                                    litter.puppies.map((puppy) => {
                                                        return (
                                                            <>



                                                                {puppy.gender ?

                                                                    <Link to={`/puppy/${puppy._id}`}>
                                                                        <Image style={{ borderColor: puppy.collar }} className={styles.puppyPicture} roundedCircle src={puppy.splashImg}></Image>
                                                                    </Link>
                                                                    :
                                                                    ""}
                                                            </>

                                                        )
                                                    }) : <h1>tbd</h1>}
                                            </Col>
                                            <Col className={styles.puppySort}>
                                                {litter.puppies.length ?
                                                    litter.puppies.map((puppy) => {
                                                        return (
                                                            <>
                                                                {!puppy.gender ?
                                                                    <Link to={`/puppy/${puppy._id}`}>
                                                                        <Image style={{ borderColor: puppy.collar }} className={styles.puppyPicture} roundedCircle src={puppy.splashImg}></Image>
                                                                    </Link>
                                                                    :
                                                                    ""}
                                                            </>

                                                        )
                                                    }) : <h1>tbd</h1>}
                                            </Col>
                                        </Row>
                                    </Container>
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
        !loading && litter.puppies ? loaded() : waiting()
    )
}
export default ViewLitter