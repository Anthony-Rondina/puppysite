import axios from "axios"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react"
import { uploadImage } from "../../../utilities/image-upload"
import ImageUploads from "../../../components/upload_image";
const CreateParent = () => {
    const [parentImage, setParentImage] = useState("")
    const [body, setBody] = useState({ img: '' })
    const [files, setFiles] = useState([])
    const navigate = useNavigate()
    const name = useRef()
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
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post("/api/parents/", {
                name: name.current.value, bio: bio.current.value, splashImg: parentImage ? parentImage : "", imgs: imgs.current.value, videos: videos.current.value, retired: retired.current.checked, gender: gender.current.value == "true" ? true : false
            })
            navigate("/parents")
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <>
            <h1>Create New Parent</h1>
            <a href="/parents"><button>Back to Parents</button></a>
            <form onSubmit={handleSubmit}>
                <p>Enter name of the Parent</p>
                <input placeholder='Enter name' type="text" ref={name} />
                <p>Gender:</p>
                <select
                    ref={gender}
                >
                    <option value="true">Male</option>
                    <option value="false">Female</option>
                </select>
                <p>Enter bio of the Parent</p>
                <textarea placeholder='Enter bio' type="text" ref={bio} />
                <p>Enter splash image Link</p>
                <ImageUploads />
                <p>Enter other images</p>
                <input placeholder='Enter image links' type="text" ref={imgs} />
                <p>Enter video of the Parent</p>
                <input placeholder='Enter video link' type="text" ref={videos} />
                <p>Is this parent retired?</p>
                <input type="checkbox" ref={retired} />
                <input type="submit" value="Create New Parent" />
            </form>
        </>
    )
}
export default CreateParent