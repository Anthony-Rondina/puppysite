import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState, useRef } from "react"
import axios from "axios"
import { Form, Button, Container, InputGroup, FormGroup, Image } from "react-bootstrap";
const EditParent = () => {
    const { id } = useParams()
    const [parentImage, setParentImage] = useState("")
    const [body, setBody] = useState({ img: '' })
    const [files, setFiles] = useState([])
    const [submitButton, setSubmitButton] = useState(false)
    const gender = useRef()
    const image = useRef()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const name = useRef()
    const bio = useRef()
    const SplashImg = useRef()
    const [imgToggle, setImgToggle] = useState(false)
    const imgs = useRef()
    const videos = useRef()
    const retired = useRef()
    const [parent, setParent] = useState({})


    const handleDelete = async (id) => {
        try {
            const deleteRequest = await axios.delete(`/api/parents/${id}`, {
            })

            if (deleteRequest.status === 200) {
                navigate("/parents")
            }

        } catch (err) {
            console.log(err)
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.put(`/api/parents/${id}`, {
                name: name.current.value, bio: bio.current.value, splashImg: parentImage ? parentImage : parent.splashImg, retired: retired.current.checked,
            })
            navigate("/parents")
        } catch (err) {
            console.log(err)
        }
    }
    const loaded = () => {
        return (
            <>

                <Container style={{
                    maxWidth: "800px", display: "flex", flexDirection: "column", justifyContent: 'center', alignItems: 'center',
                    height: "100%",
                    overflow: 'hidden',
                    backgroundColor: "tan"
                }}>
                    <img style={{ width: "100%", borderTop: "5px black solid", borderBottom: "5px black solid" }} src="https://media.kidadl.com/21_Pawfect_Facts_About_The_Doberman_Dog_Kids_Will_Love_d779805fb7.jpg" alt="" />
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: 'space-around', alignItems: 'center' }}>

                        <h1 className="mt-5">Edit Profile</h1>
                        <a href="/parents"><Button className="mb-3" variant="secondary">Back to Parents</Button></a>
                    </div>
                    <div>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Enter Name of Parent</Form.Label>
                                <Form.Control type="text" placeholder="Enter Name" ref={name} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Gender:</Form.Label>
                                <Form.Select aria-label="Default select example" ref={gender}>

                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Enter Bio of Parent</Form.Label>
                                <Form.Control placeholder="Enter Bio" ref={bio} as="textarea" rows={3} />
                                <br />


                            </Form.Group>


                            <Form.Text className="text-muted">
                                You must submit a photo.
                            </Form.Text>
                            <Form.Group className="mb-3 mt-3" controlId="formBasicCheckbox">

                            </Form.Group>
                            <Button variant="success" type="submit">

                            </Button>
                        </Form>
                    </div>
                    <img className="mt-5" style={{ width: "100%", borderTop: "5px black solid", borderBottom: "5px black solid" }} src="https://www.pupvine.com/wp-content/uploads/2021/02/European-Doberman-Breeders-Who-They-Are-And-Where-To-Find-Them.jpg" alt="" />

                </Container>
            </>
        )
    }
    const waiting = () => {
        return <h1>Loading</h1>
    }

    return (
        loaded()
    )
}

export default EditParent