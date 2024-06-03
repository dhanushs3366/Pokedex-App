// icons on a grid for finding pokemon and guess the pokemon or on a carousel
import {HashRouter,Routes,Route} from "react-router-dom"
import Home from "./Home"
import PokeUpload from "./PokeUpload"
function Index(){
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<PokeUpload/>} />
                <Route path="/upload" element={<Home/>}/>
            </Routes>
        </HashRouter>)
}

export default Index