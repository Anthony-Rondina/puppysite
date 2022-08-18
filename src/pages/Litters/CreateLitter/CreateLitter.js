import { useNavigate } from "react-router-dom"
import { useEffect, useState, useRef } from "react"
import axios from "axios"
import { uploadImage } from "../../../utilities/image-upload"
import { Form, Button, Container, InputGroup, FormGroup, Image } from "react-bootstrap";

const CreateLitter = () => {
    const [heroImage, setHeroImage] = useState("")
    const [body, setBody] = useState({ img: '' })
    const [files, setFiles] = useState([])
    const navigate = useNavigate()
    const name = useRef()
    const [submitButton, setSubmitButton] = useState(false)
    const father = useRef()
    const mother = useRef()
    const bio = useRef()
    const splashImg = useRef()
    const imgs = useRef()
    const videos = useRef()
    const [parents, setParents] = useState([])
    const [loading, setLoading] = useState(true)
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (submitButton) {
                const response = await axios.post(`/api/litters/${mother.current.value}/${father.current.value}`, {
                    name: name.current.value, bio: bio.current.value, splashImg: heroImage ? heroImage : "", imgs: imgs.current.value, videos: videos.current.value
                })
                navigate("/litters")
            } else {
                alert("You must upload an Image")
            }
        } catch (err) {
            console.log(err)
        }
    }
    const handleFiles = (evt) => {
        setFiles(evt.target.files)
    }
    const upload = async () => {
        const formData = new FormData()
        formData.append('file', files[0])
        formData.append('upload_preset', 'ohtzeh46')
        const response = await uploadImage(formData)
        setBody({ img: response })
        setHeroImage(response)
        setSubmitButton(true)
    }
    useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                const response = await axios.get(`/api/parents/`)
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

                <Container style={{
                    maxWidth: "800px", display: "flex", flexDirection: "column", justifyContent: 'center', alignItems: 'center',
                    height: "100%",
                    overflow: 'hidden',
                    backgroundColor: "tan"
                }}>
                    <img style={{ width: "100%", borderTop: "5px black solid", borderBottom: "5px black solid" }} src="https://www.bubblypet.com/wp-content/uploads/2021/05/Four-black-and-tan-Doberman-puppies-for-sale.jpg" alt="" />
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: 'space-around', alignItems: 'center' }}>

                        <h1 className="mt-5">Create New Litter</h1>
                        <a href={`/litters/`}><Button className="mb-3" variant="secondary">Back to Litters</Button></a>
                    </div>
                    <div>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Enter Name of Litter</Form.Label>
                                <Form.Control type="text" placeholder="Enter Name" ref={name}
                                    required />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formChooseMother">
                                <Form.Label>Mother:</Form.Label>
                                <Form.Select aria-label="Default select example" ref={father}
                                    required
                                >

                                    {parents.map((parent) => {
                                        return (

                                            !parent.gender ?
                                                <option value={parent._id} > {parent.name}</option> : ""

                                        )
                                    })}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formChooseFather">
                                <Form.Label>Father:</Form.Label>
                                <Form.Select aria-label="Default select example" ref={father}
                                    required>
                                    {parents.map((parent) => {
                                        return (

                                            parent.gender ?
                                                <option value={parent._id} > {parent.name}</option> : ""

                                        )
                                    })}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Enter Bio of Litter</Form.Label>
                                <Form.Control placeholder="Enter Bio" ref={bio} as="textarea" rows={3} />
                            </Form.Group>
                            <Form.Label>Upload Splash Image</Form.Label>
                            <Form.Group style={{ display: 'flex' }} className="mb-3" controlId="exampleForm.fileUpload">
                                <Form.Control
                                    type="file"
                                    required
                                    name="file"
                                    onChange={handleFiles}
                                    ref={splashImg}
                                />
                                <Button variant={!submitButton ? "warning" : "success"} style={{ cursor: "pointer", }} type='button' onClick={upload}>{body.img ? "Image Uploaded" : "Upload Image"}</Button>
                            </Form.Group>
                            <Form.Text className="text-muted">
                                You must submit a photo.
                            </Form.Text>
                            <Form.Group>
                                <Button variant="success" type="submit">
                                    Create New Litter
                                </Button>
                            </Form.Group>

                        </Form>
                    </div>
                    <img className="mt-5" style={{ width: "100%", borderTop: "5px black solid", borderBottom: "5px black solid" }} src="https://yolopooch.com/wp-content/uploads/2022/05/Do-Dobermans-Come-in-Different-Colors-2-1.jpg" alt="" />
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

export default CreateLitter