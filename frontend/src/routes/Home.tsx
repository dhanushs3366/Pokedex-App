
import { Link } from 'react-router-dom';
import '../css/global.css'; // Make sure to import your global CSS for additional custom styles if needed

const links = [
  { to: "/details", bgColor: "bg-red-500", title: "Random Pokemon", description: "Details about random Pokemon" },
  { to: "/upload", bgColor: "bg-blue-500", title: "Upload Pokemon Image", description: "Upload your Pokemon images here" },
  { to: "/scan", bgColor: "bg-green-500", title: "Scan Pokemon", description: "Scan your Pokemon collection" },
  { to: "/guess", bgColor: "bg-yellow-500", title: "Guess the Pokemon", description: "Try to guess the Pokemon" },
  {to:"/temp",bgColor:"bg-blue-500",title:"Temp", description:"Temp"}
];


function Home() {
  return (
    <div className="HomePage grid grid-cols-1 sm:grid-cols-2 gap-3 w-[80%] mx-auto p-4">
      {links.map((link, index) => (
        <Link 
          key={index} 
          to={link.to} 
          className={`flex flex-col sm:flex-row ${link.bgColor} flex-1 p-4 rounded-md hover:shadow-lg focus:shadow-lg transform transition-transform duration-200 relative z-0 hover:z-10 focus:z-10 hover:scale-102 focus:scale-102`}>
          <img src="./src/assets/images/home/pokeball.png" alt="Pokeball" className="relative w-[50px] sm:w-[100px] h-auto mb-2 sm:mb-0 sm:mr-2" />
          <div className="flex flex-col">
            <div className="text-lg font-bold">{link.title}</div>
            <p className="text-sm">{link.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}


export default Home;