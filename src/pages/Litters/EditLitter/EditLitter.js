import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState, useRef } from "react"
import axios from "axios"
import { Form, Button, Container, InputGroup, FormGroup, Image } from "react-bootstrap";
import { uploadImage } from "../../../utilities/image-upload";
const EditLitter = () => {
    const { id } = useParams()
    const { mom } = useParams()
    const [submitButton, setSubmitButton] = useState(false)
    const [heroImage, setHeroImage] = useState("")
    const [body, setBody] = useState({ img: '' })
    const [files, setFiles] = useState([])
    const { dad } = useParams()
    const navigate = useNavigate()
    const [imgToggle, setImgToggle] = useState(false)
    const name = useRef()
    const father = useRef()
    const mother = useRef()
    const bio = useRef()
    const image = useRef()
    const splashImg = useRef()
    const imgs = useRef()
    const videos = useRef()
    const [litter, setLitter] = useState({})
    const [parents, setParents] = useState([])
    const [loading, setLoading] = useState(true)
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
                const response = await axios.get(`/api/litters/${id}`)
                const response2 = await axios.get(`/api/parents/`)
                setParents(response2.data)
                setLitter(response.data)
                setLoading(false)
            } catch (err) {
                console.log(err)
            }
        })()
    }, [])


    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await axios.put(`/api/litters/${mom}/${dad}/${mother.current.value}/${father.current.value}/${id}`, {
                name: name.current.value, bio: bio.current.value, splashImg: splashImg.current.value, imgs: imgs.current.value, videos: videos.current.value
            })
            console.log(`put finished`)
            navigate(`/litters`)
        } catch (err) {
            console.log(err)
        }
    }
    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`/api/litters/${id}/${mom}/${dad}`, {
            })
            if (response.status === 200) {
                navigate("/litters")
            }

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
                    <img style={{ width: "100%", borderTop: "5px black solid", borderBottom: "5px black solid" }} src="https://www.bubblypet.com/wp-content/uploads/2021/05/Four-black-and-tan-Doberman-puppies-for-sale.jpg" alt="" />
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: 'space-around', alignItems: 'center' }}>

                        <h1 className="mt-5">{`Edit ${litter.name}`}</h1>
                        <a href={`/litter/${id}/${mom}/${dad}`}><Button className="mb-3" variant="secondary">{`Back to ${litter.name}`}</Button></a>
                    </div>
                    <div>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Enter Name of Litter</Form.Label>
                                <Form.Control defaultValue={litter.name} type="text" placeholder="Enter Name" ref={name}
                                    required />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formChooseMother">
                                <Form.Label>Mother:</Form.Label>
                                <Form.Select aria-label="Default select example" ref={father}
                                    required
                                >
                                    <option value={litter.mother._id}>{litter.mother.name}</option>
                                    {parents.map((parent) => {
                                        return (

                                            !parent.gender ? parent.name !== litter.mother.name ?
                                                <>
                                                    <option value={parent._id}> {parent.name}</option>
                                                </> : "" : ""

                                        )
                                    })}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formChooseFather">
                                <Form.Label>Father:</Form.Label>
                                <Form.Select aria-label="Default select example" ref={father}
                                    required>
                                    <option value={litter.father._id}>{litter.father.name}</option>
                                    {parents.map((parent) => {
                                        return (

                                            parent.gender ? parent.name !== litter.father.name ?
                                                <>
                                                    <option value={parent._id}> {parent.name}</option>
                                                </> : "" : ""

                                        )
                                    })}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Enter Bio of Litter</Form.Label>
                                <Form.Control placeholder="Enter Bio" ref={bio} as="textarea" rows={3} />
                            </Form.Group>
                            {!imgToggle ?
                                <Button onClick={() => { setImgToggle(true) }}> {`Want To Change ${litter.name}'s Image?`}</Button>
                                :
                                <>
                                    <Button onClick={() => { setImgToggle(false) }}>{`Don't Want To Change ${litter.name}'s Image?`}</Button>
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

                            <Form.Group>
                                <br />
                                <Button variant="success" type="submit">
                                    {`Update ${litter.name}`}
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
export default EditLitter