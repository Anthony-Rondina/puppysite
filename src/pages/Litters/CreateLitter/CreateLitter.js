import { useNavigate } from "react-router-dom"
import { useEffect, useState, useRef } from "react"
import axios from "axios"
const CreateLitter = () => {
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
            const response = await axios.post(`/api/litters/${mother.current.value}/${father.current.value}`, {
                name: name.current.value, bio: bio.current.value, splashImg: splashImg.current.value, imgs: imgs.current.checked, videos: videos.current.value
            })
            navigate("/litters")
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                const response = await axios.get(`/api/parents/`)
                console.log("response is", response.data)
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
                {
                    console.log("parents are", parents)}
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
                    <input placeholder='Enter image link' type="text" ref={splashImg} />
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