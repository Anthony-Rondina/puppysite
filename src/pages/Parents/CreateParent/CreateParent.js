import axios from "axios"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react"
import { uploadImage } from "../../../utilities/image-upload"
import ImageUploads from "../../../components/upload_image";
import { Form, Button, Container, InputGroup } from "react-bootstrap";
const CreateParent = () => {
    const [parentImage, setParentImage] = useState("")
    const [body, setBody] = useState({ img: '' })
    const [files, setFiles] = useState([])
    const navigate = useNavigate()
    const name = useRef()
    const [submitButton, setSubmitButton] = useState(false)
    const image = useRef()
    const bio = useRef()
    const imgs = useRef()
    const videos = useRef()
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
                    splashImg: parentImage ? parentImage : "", imgs: imgs.current.value,
                    videos: videos.current.value,
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
            <Container style={{ maxWidth: "600px", display: "flex", flexDirection: "column", justifyContent: 'center', alignItems: 'center' }}>

                <h1 className="mt-5">Create New Parent</h1>
                <a href="/parents"><Button className="mb-3" variant="secondary">Back to Parents</Button></a>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Enter Name of Parent</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" ref={name} />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Gender:</Form.Label>
                        <Form.Select aria-label="Default select example" ref={gender}>
                            <option value="true">Male</option>
                            <option value="false">Female</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Enter Bio of Parent</Form.Label>
                        <Form.Control ref={bio} as="textarea" rows={3} />
                    </Form.Group>

                    <div style={{ display: "flex" }}>
                        <div>
                            <Form.Label></Form.Label>
                            <Form.Control
                                type="file"
                                required
                                name="file"
                                onChange={handleFiles}
                                ref={image}
                            />
                        </div>
                        <Button variant={!submitButton ? "warning" : "success"} style={{ cursor: "pointer", }} type='button' onClick={upload}>{body.img ? "Image Uploaded" : "Upload Image"}</Button>
                    </div>
                    <Button variant="success" type="submit">
                        Submit
                    </Button>
                </Form>
            </Container>

            <form onSubmit={handleSubmit}>


                <p>Enter splash image Link</p>

                <p>Enter other images</p>
                <input placeholder='Enter image links' type="text" ref={imgs} />
                <p>Enter video of the Parent</p>
                <input placeholder='Enter video link' type="text" ref={videos} />
                <br />
                <span>Is this parent retired?</span>
                <input type="checkbox" ref={retired} />
                <br />
                <input type="submit" value="Create New Parent" />
            </form>
        </>
    )
}
export default CreateParent