import { Link } from "react-router-dom"

function Home(){
    return (
    <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/upload">Upload Pokemon image</Link></li>
        <li><Link to="/scan">Scan Pokemon</Link></li>
        <li><Link to="/guess">Guess the pokemon</Link></li>
    </ul>)
}

export default Home