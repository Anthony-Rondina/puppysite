import { Link } from "react-router-dom"
const Header = () => {
    return (
        <>
            <div>
                <Link to="/"><h2>Home</h2></Link>
                <Link to="/litters"><h2>Litters</h2></Link>
                <Link to="/parents"><h2>Parents</h2></Link>

            </div>
            <hr />
            <br />
            <br />
            <br />

        </>
    )
}
export default Header