import { useState, useEffect } from "react"
import axios from "axios"
import { Link, useParams } from "react-router-dom"
import Header from "../../../components/Header"

const ViewLitter = ({ setLitter, litter }) => {
    const { id } = useParams()
    const { mom } = useParams()
    const { dad } = useParams()
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                const response = await axios.get(`/api/litters/${id}`)
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
                <Header />
                <h1>{litter.name}</h1>
                <Link to={`/litters`}><button>Back to All Litters</button></Link>
                <Link to={`/editlitter/${litter._id}/${mom}/${dad}`}><button>Edit this Litter</button></Link>
                <h2>{`Mother is ${litter.mother.name}`}</h2>
                <h2>{`Father is ${litter.father.name}`}</h2>
                <h2>{`${litter.name} Puppies:`}</h2>
                <Link to={`/createpuppy/${litter._id}`}><button>Create Puppies for this Litter</button></Link>
                {litter.puppies.length ?
                    litter.puppies.map((puppy) => {
                        return (
                            <h4>{puppy.name}</h4>
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
        litter.name ? loaded() : waiting()
    )
}
export default ViewLitter