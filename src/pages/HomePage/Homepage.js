import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
const Homepage = () => {
    return (
        <div>
            <Link to="/litters"><h2>Litters</h2></Link>
            <Link to="/parents"><h2>Parents</h2></Link>
            {/* <Link to="/"><h2>Puppies</h2></Link> */}

        </div>
    )
}
export default Homepage