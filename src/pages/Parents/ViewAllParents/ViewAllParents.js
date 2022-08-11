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
                                <Link to={`/parents/${dog._id}`}>
                                    {dog.gender ?
                                        <div className="mb-3 card" style={{ width: "18rem" }}>
                                            <img className="card-img-top" src={dog.splashImg} alt="Card image cap" />
                                            <div className="card-body">
                                                <p className="card-text">{dog.name}</p>
                                            </div>
                                        </div>
                                        : ""}
                                </Link>
                            </>
                        )
                    })}
                    <h2>Females</h2>
                    {parents.map((dog) => {
                        return (
                            <><Link to={`/parents/${dog._id}`}>
                                {!dog.gender ?
                                    <div className="mb-3 card" style={{ width: "18rem" }}>
                                        <img className="card-img-top" src={dog.splashImg} alt="Card image cap" />
                                        <div className="card-body">
                                            <p className="card-text">{dog.name}</p>
                                        </div>
                                    </div>
                                    : ""}
                            </Link>

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