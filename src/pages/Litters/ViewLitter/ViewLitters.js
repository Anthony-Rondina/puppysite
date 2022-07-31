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
                console.log(`test 1`)
                setLoading(true)
                console.log(`test 2`)
                const response = await axios.get(`/api/litters/${id}`)
                console.log(`test 3`)
                setLitter(response.data)
                console.log(`test 4`)
                setLoading(false)
                console.log(`test 5`)
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