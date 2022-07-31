import { useState, useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
const ViewLitters = () => {
    const { id } = useParams()
    const [loading, setLoading] = useState(false)
    const [litter, setLitter] = useState({})
    useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                const response = await axios.get(`/api/litters/${id}`)
                console.log("response is", response.data)
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
                <h1>{litter.name}</h1>
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
export default ViewLitters