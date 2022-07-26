import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useRef } from "react"

const CreateParent = () => {
    const [parents, setParents] = useState({})
    useEffect(() => {
        (async () => {
            try {

                setLoading(true)
                const response = await axios.get(`/api/cards/`)
                setParents(response.data)
                setLoading(false)

            } catch (err) {
                console.log(`err`)
            }
        })()
    }, [])

    return (
        <div>CreateParent</div>
    )
}
export default CreateParent