import { useParams } from "react-router-dom"
import { useEffect } from "react"
import axios from "axios"
import { useState } from "react"
const EditParent = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const name = useRef()
    const bio = useRef()
    const SplashImg = useRef()
    const imgs = useRef()
    const videos = useRef()
    const retired = useRef()
    const [parent, setParent] = useState({})
    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`api/parents/${id}`)
                setParent(response)
            } catch (err) {
                console.log(err)
            }
        })()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.put(`/api/parents/${id}`, {
                name: name.current.value, bio: bio.current.value, SplashImg: SplashImg.current.value, imgs: imgs.current.value, videos: videos.current.value, retired: retired.current.checked,
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
                <input defaultValue={chosenParent.name} placeholder='Enter name' type="text" ref={name} />
                <p>Enter bio of the Parent</p>
                <textarea defaultValue={chosenParent.bio} placeholder='Enter bio' type="text" ref={bio} />
                <p>Enter splash image Link</p>
                <input defaultValue={chosenParent.SplashImg} placeholder='Enter image link' type="text" ref={SplashImg} />
                <p>Enter other images</p>
                <input defaultValue={chosenParent.imgs} placeholder='Enter image links' type="text" ref={imgs} />
                <p>Enter video of the Parent</p>
                <input defaultValue={c.videos} placeholder='Enter video link' type="text" ref={videos} />
                <p>Is this parent retired?</p>
                {chosenParent.retired ? <input className="largeCheckBox" placeholder='Enter death' type="checkbox" ref={retired} defaultChecked /> : <input className="largeCheckBox" placeholder='Enter death' type="checkbox" ref={retired} />}
                <input type="submit" value="Create New Parent" />
            </form>
        </>
    )
}

export default EditParent