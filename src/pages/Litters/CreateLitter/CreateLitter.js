import { useNavigate } from "react-router-dom"
import { useEffect, useState, useRef } from "react"
import axios from "axios"
import { uploadImage } from "../../../utilities/image-upload"
const CreateLitter = () => {
    const [heroImage, setHeroImage] = useState("")
    const [body, setBody] = useState({ img: '' })
    const [files, setFiles] = useState([])
    const navigate = useNavigate()
    const name = useRef()
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

            console.log("heroImage is", heroImage)
            const response = await axios.post(`/api/litters/${mother.current.value}/${father.current.value}`, {
                name: name.current.value, bio: bio.current.value, splashImg: heroImage ? heroImage : "", imgs: imgs.current.value, videos: videos.current.value
            })
            navigate("/litters")
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
                <h1>Create New Litter</h1>
                <a href="/parents"><button>Back to Parents</button></a>
                <form onSubmit={handleSubmit}>
                    <p>Enter name of the Litter</p>
                    <input placeholder='Enter name' type="text" ref={name} />
                    <p>Father:</p>
                    <select
                        ref={father}
                    >
                        <option value="0" >Choose A Father</option>
                        {parents.map((parent) => {
                            return (

                                parent.gender ?
                                    <option value={parent._id} > {parent.name}</option> : ""

                            )
                        })}
                    </select>
                    <p>Mother:</p>
                    <select
                        ref={mother}
                    >
                        <option value="0" >Choose A Mother</option>
                        {parents.map((parent) => {
                            return (

                                !parent.gender ?
                                    <option value={parent._id} > {parent.name}</option> : ""

                            )
                        })}
                    </select>
                    <p>Enter bio of the Litter</p>
                    <textarea placeholder='Enter bio' type="text" ref={bio} />
                    <p>Enter splash image Link</p>
                    <div className='image-upload-buttons'>
                        <label className='file-upload'>
                            <input className='file-input' type='file' name='img' onChange={handleFiles} />
                        </label>
                        <button type='button' className='upload-img' onClick={upload}>{body.img ? "Image Uploaded" : "Upload Image"}</button>
                    </div>
                    <p>Enter other images</p>
                    <input placeholder='Enter image links' type="text" ref={imgs} />
                    <p>Enter video of the Litter</p>
                    <input placeholder='Enter video link' type="text" ref={videos} />
                    <input type="submit" value="Create New Litter" />
                </form>
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