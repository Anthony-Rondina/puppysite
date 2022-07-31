import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
const ViewAllLitters = () => {
    const [litters, setLitters] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                const response = await axios.get(`/api/litters/`)
                // console.log("response is", response.data)
                setLitters(response.data)
                setLoading(false)
            } catch (err) {
                console.log(err)
            }
        })()
    }, [])
    const loaded = () => {
        return (
            <>
                {litters.map((litter, idx) => {
                    return (
                        <Link key={idx} to={`/viewlitter/${litter._id}`}><h2>{litter.name}</h2></Link>
                    )
                })}
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
export default ViewAllLitters