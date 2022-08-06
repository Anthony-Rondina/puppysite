import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState, useRef } from "react"
import axios from "axios"
import Header from "../../../components/Header"
const CreatePuppy = () => {
    const { litterid } = useParams()
    const navigate = useNavigate()
    const collar = useRef()
    const price = useRef()
    const sold = useRef()
    const name = useRef()
    const gender = useRef()
    const HeroImage = useRef()
    const imgs = useRef()
    const chosenLitter = useRef()
    const bio = useRef()
    const videos = useRef()
    const [litter, setLitter] = useState({})
    // const [litters, setLitters] = useState([])
    const [loading, setLoading] = useState(true)
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`/api/puppies/${litterid}`, {
                name: name.current.value, collar: collar.current.value, price: price.current.value, sold: sold.current.value == "available" ? true : false, gender: gender.current.value == "true" ? true : false, HeroImage: HeroImage.current.value, bio: bio.current.value
            })
            navigate(`/litter/${litterid}/${litter.mother._id}/${litter.father._id}`)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                // const response = await axios.get(`/api/litters`)
                const response2 = await axios.get(`/api/litters/${litterid}`)
                setLitter(response2.data)
                // setLitters(response.data)
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
                <h1>Create New Puppy</h1>
                <a href="/litters"><button>Back to Litters</button></a>
                <form onSubmit={handleSubmit}>
                    <p>Enter name of the Puppy</p>
                    <input placeholder='Enter name' type="text" ref={name} />
                    <p>Confirm Litter</p>
                    <select
                        ref={chosenLitter}
                    >
                        <option value={litter._id} >{litter.name}</option>
                    </select>
                    <p>Gender:</p>
                    <select
                        ref={gender}
                    >
                        <option value="true">Male</option>
                        <option value="false">Female</option>
                    </select>
                    <p>Enter Collar of the Puppy</p>
                    <select
                        ref={collar}
                    >
                        <option value="red" >Red</option>
                        <option value="blue" >Blue</option>
                        <option value="black" >Black</option>
                        <option value="green" >Green</option>
                        <option value="pink" >Pink</option>
                        <option value="purple" >Purple</option>
                        <option value="yellow" >Yellow</option>
                    </select>
                    <p>Enter Price for Puppy</p>
                    <input placeholder='Enter price' type="text" ref={price} />
                    <p>Sold Status:</p>
                    <select
                        ref={sold}
                    >
                        <option value="available" >Available</option>
                        <option value="sold" >Sold</option>
                    </select>
                    <p>Enter Main Image of the Puppy</p>
                    <input placeholder='Enter HeroImage' type="text" ref={HeroImage} />
                    <p>Enter video of the Puppy</p>
                    <input placeholder='Enter video link' type="text" ref={imgs} />
                    <p>Enter images of the Puppy</p>
                    <input placeholder='Enter image link' type="text" ref={imgs} />
                    <p>Important Info for Puppy</p>
                    <textarea placeholder='Enter image link' type="text" ref={bio} />
                    <input type="submit" value="Create New Puppy" />
                </form>
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

export default CreatePuppy