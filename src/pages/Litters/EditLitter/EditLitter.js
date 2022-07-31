import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState, useRef } from "react"
import axios from "axios"
const EditLitter = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const name = useRef()
    const father = useRef()
    const mother = useRef()
    const bio = useRef()
    const splashImg = useRef()
    const imgs = useRef()
    const videos = useRef()
    const [litter, setLitter] = useState([])
    const [parents, setParents] = useState([])
    const [loading, setLoading] = useState(true)
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.put(`/api/litters/${mother.current.value}/${father.current.value}/${id}`, {
                name: name.current.value, bio: bio.current.value, splashImg: splashImg.current.value, imgs: imgs.current.value, videos: videos.current.value
            })
            navigate(`/litter/${id}`)
        } catch (err) {
            console.log(err)
        }
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
    const loaded = () => {
        return (
            <>
                <h1>Edit {litter.name}</h1>
                <a href="/parents"><button>Back to Parents</button></a>
                <form onSubmit={handleSubmit}>
                    <p>Enter name of the Litter</p>
                    <input defaultValue={litter.name} placeholder='Enter name' type="text" ref={name} />
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
                    <textarea defaultValue={litter.bio} placeholder='Enter bio' type="text" ref={bio} />
                    <p>Enter splash image Link</p>
                    <input defaultValue={litter.splashImg} placeholder='Enter image link' type="text" ref={splashImg} />
                    <p>Enter other images</p>
                    <input defaultValue={litter.imgs} placeholder='Enter image links' type="text" ref={imgs} />
                    <p>Enter video of the Litter</p>
                    <input defaultValue={litter.videos} placeholder='Enter video link' type="text" ref={videos} />
                    <input type="submit" value={`Update ${litter.name}`} />
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
export default EditLitter