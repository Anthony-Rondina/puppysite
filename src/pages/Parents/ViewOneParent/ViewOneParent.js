import { useState, useEffect } from "react"
import axios from "axios"
import { Link, useParams } from "react-router-dom"

const ViewOneParent = ({ chosenParent, setChosenParent }) => {
    const { id } = useParams()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                const response = await axios.get(`/api/parents/${id}`)
                setChosenParent(response.data)
                setLoading(false)

            } catch (err) {
                console.log(err)
            }
        })()
    }, [])
    const loaded = () => {
        return (
            <>
                <h1>{chosenParent.name}</h1>
                <Link to={`/parents`}><button>Back to All Parents</button></Link>
                <Link to={`/editparent/${id}`}><button>Edit this Parent</button></Link>
                <br />
                {chosenParent.splashImg ? <img style={{ width: 200 }}
                    src={chosenParent.splashImg} alt="splash image for litter" /> : ""}
                <br />

                {chosenParent.litters.length ?
                    chosenParent.litters.map((litter) => {
                        // console.log(puppy.name)
                        return (
                            <Link to={`/viewpuppy/${litter._id}`}>
                                {litter.splashImg ? <img style={{ width: 200 }} src={litter.splashImg} alt="photo of puppy" /> : ""}
                                <br />
                            </Link>
                        )
                    })
                    :
                    <h4>TBD</h4>
                }
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
export default ViewOneParent