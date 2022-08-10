import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
const ViewAllParents = () => {
    const [parents, setParents] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                const response = await axios.get(`/api/parents/`)
                // console.log("response is", response.data)
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
                <div>
                    <Link to="/createparent"><button>Create New Parent</button></Link>
                    <h2>Males</h2>
                    {parents.map((dog) => {
                        return (
                            <>
                                {dog.splashImg ? <img style={{ width: 200 }} src={dog.splashImg} /> : ""}
                                {dog.gender ? <Link to={`/parents/${dog._id}`}><h4>{dog.name}</h4></Link> : ""}

                            </>
                        )
                    })}
                    <h2>Females</h2>
                    {parents.map((dog) => {
                        return (
                            <>
                                {!dog.gender ? <Link to={`/parents/${dog._id}`}><h4>{dog.name}</h4></Link> : ""}

                            </>
                        )
                    })}
                </div>
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
export default ViewAllParents