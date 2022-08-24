import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState, useRef } from "react"
import axios from "axios"
import { uploadImage } from "../../../utilities/image-upload"
import ImageUploads from "../../../components/upload_image"
import { Form, Button, Container, InputGroup, FormGroup, Image } from "react-bootstrap";
import OptionData from "../../../components/OptionData"
const EditPuppy = () => {
    const [puppyImage, setPuppyImage] = useState("")
    const [body, setBody] = useState({ img: '' })
    const [files, setFiles] = useState([])
    const { id } = useParams()
    const navigate = useNavigate()
    const collar = useRef()
    const [submitButton, setSubmitButton] = useState(false)
    const price = useRef()
    const sold = useRef()
    const image = useRef()
    const name = useRef()
    const gender = useRef()
    const imgs = useRef()
    const chosenLitter = useRef()
    const bio = useRef()
    const [puppy, setPuppy] = useState({})
    const [loading, setLoading] = useState(true)
    const [imgToggle, setImgToggle] = useState(false)
    const handleFiles = (evt) => {
        setFiles(evt.target.files)
    }
    const upload = async () => {
        const formData = new FormData()
        formData.append('file', files[0])
        formData.append('upload_preset', 'ohtzeh46')
        const response = await uploadImage(formData)
        setBody({ img: response })
        setPuppyImage(response)
        setSubmitButton(true)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (submitButton) {
                const response = await axios.post(`/api/puppies/${id}`, {
                    name: name.current.value, collar: collar.current.value, price: price.current.value, sold: sold.current.value == "available" ? true : false, gender: gender.current.value == "true" ? true : false, splashImg: puppyImage ? puppyImage : "", bio: bio.current.value
                })
                navigate(`/puppy/${id}`)
            } else {
                alert("Must upload an image")
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                // const response = await axios.get(`/api/litters`)
                const response2 = await axios.get(`/api/puppies/${id}`)
                setPuppy(response2.data)
                // setLitters(response.data)
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
                    <img style={{ width: "100%", borderTop: "5px black solid", borderBottom: "5px black solid" }} src="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F47%2F2021%2F03%2F25%2Fdoberman-pinscher-puppy-running-1820158586-2000.jpg" alt="" />
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: 'space-around', alignItems: 'center' }}>
                        {puppy.name ? <h1 className="mt-5">{`Edit ${puppy.name}`}</h1> : <h1 className="mt-5">{`Edit ${puppy.collar} collar puppy`}</h1>}
                    </div>
                    <div>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Name of Puppy</Form.Label>
                                <Form.Control type="text" placeholder="ONLY enter name when puppy is SOLD" defaultValue={puppy.name} ref={name}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formCollarChoice">
                                <Form.Label>Collar Color:</Form.Label>
                                <Form.Select aria-label="Default select example" ref={collar}>
                                    <option value={`${puppy.collar}`} >{puppy.collar}</option>
                                    {OptionData.map((collar) => {
                                        return (
                                            collar !== puppy.collar ? <option value={`${collar}`} >{collar}</option> : ""
                                        )
                                    })
                                    }
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Gender:</Form.Label>
                                <Form.Select aria-label="Default select example" ref={gender}>
                                    <option value="true">Male</option>
                                    <option value="false">Female</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Enter Bio of Puppy</Form.Label>
                                <Form.Control placeholder="Enter Bio" ref={bio} as="textarea" rows={3} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Enter Price of Puppy</Form.Label>
                                <Form.Control type="number" placeholder="Enter Name" ref={price}
                                />
                            </Form.Group>
                            {!imgToggle ?
                                <Button onClick={() => { setImgToggle(true) }}> {`Want To Change ${puppy.name}'s Image?`}</Button>
                                :
                                <>
                                    <Button onClick={() => { setImgToggle(false) }}>{`Don't Want To Change ${puppy.name}'s Image?`}</Button>
                                    <br />
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
                                </>}
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Sold Status:</Form.Label>
                                <Form.Select aria-label="Default select example" ref={sold}>
                                    <option value="false">Available</option>
                                    <option value="true">Sold</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group>
                                <Button variant="success" type="submit">
                                    Create New Puppy
                                </Button>
                            </Form.Group>

                        </Form>
                    </div>
                    <img className="mt-5" style={{ width: "100%", borderTop: "5px black solid", borderBottom: "5px black solid" }} src="https://www.pupvine.com/wp-content/uploads/2022/02/Doberman-puppy-walking-in-woods.jpg.webp" alt="" />
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

export default EditPuppy