import { HashRouter,Routes,Route } from 'react-router-dom';
import Home from './routes/Home';
import PokeUpload from './routes/PokeUpload';
import PokeScan from './routes/PokeScan';
import PokeGuess from './routes/PokeGuess';
import Navbar from './Components/Navbar';
import "./css/global.css"
import Temp from './routes/temp';
function App(){
    return (
        <div className='relative px-3 bg-gray-400 h-full flex flex-col items-center'>
           
            <HashRouter>
            <Navbar/>
            <div className='relative flex-1 mx-auto z-10'>
                <Routes>
                    <Route element={<Home/>} path="/"/>
                    <Route  element={<PokeUpload/>} path="/upload"/>
                    <Route element={<PokeScan/>} path='/scan'/>
                    <Route element={<PokeGuess/>} path='/guess'/>
                    <Route element={ <Temp/>} path="/temp"/>
                </Routes>
            </div>
            <div className="absolute w-full h-[400%] rounded-full bottom-[20%] bg-orange-400 z-0"></div>
            </HashRouter>
        </div>
    )
}


export default App;