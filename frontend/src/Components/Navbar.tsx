import { Link } from "react-router-dom";
import "../css/global.css";

// function Navbar(){
//     return (<ul>
//         <li><Link to="/">Home</Link></li>
//         <li><Link to="/upload">Upload Pokemon image</Link></li>
//         <li><Link to="/scan">Scan Pokemon</Link></li>
//         <li><Link to="/guess">Guess the pokemon</Link></li>
//     </ul>)
// }

function Navbar() {
  return (
    <nav className="p-3 flex justify-between items-center">
      <Link to="/" className="flex gap-2 items-center">
        <img
          src="frontend/src/assets/images/home/pokeball.png"
          className="object-cover max-w-12 max-h-12"
          alt=""
        />
        <span className="text-lg font-medium font-sans">To Home</span>
      </Link>

      <Link to="/guess" className="flex gap-2 items-center">
        <img
          src="frontend/src/assets/images/home/pokeball.png"
          alt=""
          className="object-cover max-w-12 max-h-12"
        />
        <span className="text-lg font-medium font-sans">Guess</span>
      </Link>
    </nav>
  );
}
export default Navbar;
