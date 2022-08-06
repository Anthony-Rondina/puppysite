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
                console.log(response.data)
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
                <Link to={`/parents/${litter.mother._id}`}><h2>{`Mother is ${litter.mother.name}`}</h2></Link>
                <Link to={`/parents/${litter.father._id}`}><h2>{`Father is ${litter.father.name}`}</h2></Link>
                <h2>{`${litter.name} Puppies:`}</h2>
                {litter.puppies.length ?
                    litter.puppies.map((puppy) => {
                        // console.log(puppy.name)
                        return (
                            <Link to={`/viewpuppy/${puppy._id}`}><h4>{puppy.name}</h4></Link>
                        )
                    })
                    :
                    <h4>TBD</h4>
                }
                <Link to={`/createpuppy/${litter._id}`}><button>Create Puppies for this Litter</button></Link>
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