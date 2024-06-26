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
        <div className='px-3 mt-3'>
           
            <HashRouter>
            <Navbar/>
            <div className='flex-1 mx-auto'>
                <Routes>
                    <Route element={<Home/>} path="/"/>
                    <Route  element={<PokeUpload/>} path="/upload"/>
                    <Route element={<PokeScan/>} path='/scan'/>
                    <Route element={<PokeGuess/>} path='/guess'/>
                    <Route element={ <Temp/>} path="/temp"/>
                </Routes>
            </div>
            </HashRouter>
        </div>
    )
}


export default App;