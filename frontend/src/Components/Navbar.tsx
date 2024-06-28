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
    <nav className="relative p-3 w-full flex h-auto justify-between  items-center z-50">
      <Link to="/" className="flex gap-2 items-center">
        <img
          src="frontend/src/assets/images/home/pokeball.png"
          className="object-cover w-4 h-auto"
          alt=""
        />
        <span className="text-base font-semibold ">To Home</span>
      </Link>

      <Link to="/guess" className="flex gap-2 items-center">
        <img
          src="frontend/src/assets/images/home/pokeball.png"
          alt=""
          className="object-cover w-4 h-auto"
        />
        <span className="text-base font-semibold ">Guess</span>
      </Link>
    </nav>
  );
}
export default Navbar;
