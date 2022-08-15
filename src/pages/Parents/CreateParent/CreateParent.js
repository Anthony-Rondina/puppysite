import axios from "axios"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react"
import { uploadImage } from "../../../utilities/image-upload"
import { Form, Button, Container, InputGroup, FormGroup, Image } from "react-bootstrap";
const CreateParent = () => {
    const [parentImage, setParentImage] = useState("")
    const [body, setBody] = useState({ img: '' })
    const [files, setFiles] = useState([])
    const navigate = useNavigate()
    const name = useRef()
    const [submitButton, setSubmitButton] = useState(false)
    const image = useRef()
    const bio = useRef()
    // const imgs = useRef()
    // const videos = useRef()
    const retired = useRef()
    const gender = useRef()
    const handleFiles = (evt) => {
        setFiles(evt.target.files)
    }
    const upload = async () => {
        const formData = new FormData()
        formData.append('file', files[0])
        formData.append('upload_preset', 'ohtzeh46')
        const response = await uploadImage(formData)
        setBody({ img: response })
        setParentImage(response)
        setSubmitButton(true)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (submitButton) {
                const response = await axios.post("/api/parents/", {
                    name: name.current.value,
                    bio: bio.current.value,
                    splashImg: parentImage ? parentImage : "",
                    // imgs: imgs.current.value,
                    // videos: videos.current.value,
                    retired: retired.current.checked,
                    gender: gender.current.value == "true" ? true : false
                })
                navigate("/parents")
            } else {
                alert("You must upload an Image")
            }
        } catch (err) {
            console.log(err)
        }
    }
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

                    <h1 className="mt-5">Create New Parent</h1>
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
                                <option value="true">Male</option>
                                <option value="false">Female</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Enter Bio of Parent</Form.Label>
                            <Form.Control placeholder="Enter Bio" ref={bio} as="textarea" rows={3} />
                        </Form.Group>
                        <Form.Label>Upload Splash Image</Form.Label>
                        <Form.Group style={{ display: 'flex' }} className="mb-3" controlId="exampleForm.fileUpload">
                            <Form.Control
                                type="file"
                                required
                                name="file"
                                onChange={handleFiles}
                                ref={image}
                            />
                            <Button variant={!submitButton ? "warning" : "success"} style={{ cursor: "pointer", }} type='button' onClick={upload}>{body.img ? "Image Uploaded" : "Upload Image"}</Button>
                        </Form.Group>


                        <Form.Text className="text-muted">
                            You must submit a photo.
                        </Form.Text>
                        <Form.Group className="mb-3 mt-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Is this Parent Retired?" ref={retired} />
                        </Form.Group>
                        <Button variant="success" type="submit">
                            Create New Parent
                        </Button>
                    </Form>
                </div>
            </Container>
        </>
    )
}
export default CreateParent