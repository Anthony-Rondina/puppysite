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
                {console.log('test')}
                <div className={styles.outerWrapper} style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexDirection: 'column', height: '80vh' }} >
                    <Container className={styles.parentBackground2}>
                        <div className={styles.innerContainer}>
                            <Container className={styles.parentName} fluid style={{ backgroundColor: "tan", display: "flex", justifyContent: "center", alignItems: "center", height: "5vh", borderBottom: `10px solid ${chosenPuppy.collar}` }}>
                                {console.log(chosenPuppy.name)}
                                {chosenPuppy.name ? <h1>{chosenPuppy.name}</h1>
                                    :
                                    <h1>{`${chosenPuppy.collar} collar Puppy`}</h1>}
                            </Container>

                            <Container className={styles.parentButtons} style={{ display: 'flex', justifyContent: 'space-around' }}>
                                <Link to={`/litter/${chosenPuppy.litter._id}/${chosenPuppy.mother}/${chosenPuppy.father}`}><Button variant="secondary">{`Back to ${chosenPuppy.name}'s Litter`}</Button></Link>
                                <Link to={`/editpuppy/${id}`}><Button>{`Edit ${chosenPuppy.name ? chosenPuppy.name : 'this puppy'}`}</Button></Link>
                            </Container>
                        </div>

                        <Container className={styles.parentBackground} >
                            <Image style={{ maxHeight: "600px", border: `8px solid ${chosenPuppy.collar}` }} fluid src={chosenPuppy.splashImg}></Image>
                        </Container>
                        <Container>
                            <a className={styles.emailMeButton} href={`mailto:${"puppyparadecontactusquestions@ymail.com"}?subject=${encodeURIComponent(`Requesting info for your ${chosenPuppy.collar} collar Puppy`) || ''}&body=${encodeURIComponent("") ||
                                `Hello! %0D%0A%0D%0A I am requesting information regarding your ${chosenPuppy.collar} collar ${chosenPuppy.gender ? "Male" : "Female"} puppy from the litter "${chosenPuppy.litter.name}". If you could please let me know if this puppy is still available I would greatlly appreciate it. %0D%0A%0D%0A Thanks, %0D%0A%0D%0A`
                                }`}><h2 style={{ textAlign: 'center', cursor: "pointer" }}>Contact us about this puppy!</h2></a>
                            <hr />
                        </Container>
                        <Container className={styles.litterBox} style={{ backgroundColor: "tan", display: "flex", justifyContent: "center" }}>
                            <Row style={{ width: "80%", display: "flex", justifyContent: "center" }} >
                                <Container style={{ display: "flex", justifyContent: "center" }}>
                                    <h2>{``}</h2>
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
        !loading ? loaded() : waiting()
    )
}