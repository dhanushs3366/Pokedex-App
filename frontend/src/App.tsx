import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import PokeUpload from "./routes/PokeUpload";
import PokeScan from "./routes/PokeScan";
import PokeGuess from "./routes/PokeGuess";
import Navbar from "./Components/Navbar";
import "./css/global.css";
import Temp from "./routes/temp";
import PokeDetails from "./routes/PokeDetails"; 
import PokeList from "./routes/PokeList";
import DetailsRenderer from "./Components/DetailsRenderer";
import { GetAllPokemonIDs } from "./utils/Pokemons";

function App() {
  return (
    <HashRouter>
      <Navbar />
      <div className="relative w-full  flex justify-center gap-3">
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<PokeUpload />} path="/upload" />
          <Route element={<PokeScan />} path="/scan" />
          <Route element={<PokeGuess />} path="/guess" />
          <Route element={<PokeList items={GetAllPokemonIDs()}/>} path="/view" />
          <Route element={<DetailsRenderer />} path="/view/:id" />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
