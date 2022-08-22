import { useState, useEffect } from "react"
import axios from "axios"
import { Link, useParams } from "react-router-dom"
import { Container, Row, Col, Carousel, Image, Spinner, Button } from 'react-bootstrap'
import LitterSlide from "../../../components/LitterSlide"
import ParentCreateButton from "../../../components/ParentCreateButton"
import styles from "./viewPuppy.module.css"
export default function ViewPuppy() {
    const { id } = useParams()
    const [chosenPuppy, setChosenPuppy] = useState({})

    const [loading, setLoading] = useState(true)
    useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                const response = await axios.get(`/api/puppies/${id}`)
                setChosenPuppy(response.data)
                console.log("data is", response.data)
                setLoading(false)

            } catch (err) {
                console.log(err)
            }
        })()
    }, [])
    const loaded = () => {
        return (
            <>
                <div className={styles.outerWrapper} style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexDirection: 'column' }} >
                    <Container className={styles.parentBackground2}>
                        <div>
                            <Container className={styles.parentName} fluid style={{ backgroundColor: "tan", display: "flex", justifyContent: "center", alignItems: "center", height: "5vh" }}>
                                <h1>{chosenPuppy.name}</h1>
                            </Container>

                            <Container className={styles.parentButtons} style={{ display: 'flex', justifyContent: 'space-around' }}>
                                <Link to={`/litter/${chosenPuppy.litter._id}/${chosenPuppy.mother}/${chosenPuppy.father}`}><Button variant="secondary">{`Back to ${chosenPuppy.name}'s Litter`}</Button></Link>
                                <Link to={`/editparent/${id}`}><Button>{`Edit ${chosenPuppy.name}`}</Button></Link>
                            </Container>
                        </div>

                        <Container className={styles.parentBackground} >
                            <Image style={{ maxHeight: "600px" }} fluid src={chosenPuppy.splashImg}></Image>
                        </Container>

                        <Container className={styles.litterBox} style={{ backgroundColor: "tan", display: "flex", justifyContent: "center" }}>
                            <Row style={{ width: "80%", display: "flex", justifyContent: "center" }} >
                                <Container style={{ display: "flex", justifyContent: "center" }}>
                                    <h1>{`${chosenPuppy.name}'s Litters`}</h1>
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
        !loading && chosenPuppy.name ? loaded() : waiting()
    )
}