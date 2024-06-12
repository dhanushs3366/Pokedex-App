import { HashRouter,Routes,Route } from 'react-router-dom';
import Home from './routes/Home';
import PokeUpload from './routes/PokeUpload';
import PokeScan from './routes/PokeScan';
import PokeGuess from './routes/PokeGuess';
function App(){
    return (
        <div>
            <HashRouter>
                <Routes>
                    <Route element={<Home/>} path="/"/>
                    <Route  element={<PokeUpload/>} path="/upload"/>
                    <Route element={<PokeScan/>} path='/scan'/>
                    <Route element={<PokeGuess/>} path='/guess'/>
                </Routes>
            </HashRouter>
        </div>
    )
}


export default App;