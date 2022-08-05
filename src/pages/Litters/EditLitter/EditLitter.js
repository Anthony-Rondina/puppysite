import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState, useRef } from "react"
import axios from "axios"
const EditLitter = () => {
    const { id } = useParams()
    const { mom } = useParams()
    const { dad } = useParams()
    const navigate = useNavigate()
    const name = useRef()
    const father = useRef()
    const mother = useRef()
    const bio = useRef()
    const splashImg = useRef()
    const imgs = useRef()
    const videos = useRef()
    const [litter, setLitter] = useState({})
    const [parents, setParents] = useState([])
    const [loading, setLoading] = useState(true)


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
            const response = await axios.delete(`/api/litters/${id}`, {
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
                <h1>Edit {litter.name}</h1>
                <a href={`/litter/${litter._id}/${litter.mother._id}/${litter.father._id}`}><button>{`Back to ${litter.name}`}</button></a>
                <form onSubmit={handleSubmit}>
                    <p>Enter name of the Litter</p>
                    <input defaultValue={litter.name} placeholder='Enter name' type="text" ref={name} />
                    <p>Father:</p>
                    <select
                        ref={father}
                    >
                        <option value={litter.father} >{litter.father.name}</option>
                        {parents.map((parent) => {
                            return (
                                parent.name == litter.father.name ? "" :
                                    parent.gender ?
                                        <option value={parent._id} > {parent.name}</option> : ""

                            )
                        })}
                    </select>
                    <p>Mother:</p>
                    <select
                        ref={mother}
                    >
                        <option value={litter.mother} >{litter.mother.name}</option>
                        {parents.map((parent) => {
                            return (
                                parent.name == litter.mother.name ? "" :

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
                <button onClick={() => { handleDelete(litter._id) }}>Delete {litter.name}</button>
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