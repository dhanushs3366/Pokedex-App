import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import PokeUpload from "./routes/PokeUpload";
import PokeScan from "./routes/PokeScan";
import PokeGuess from "./routes/PokeGuess";
import Navbar from "./Components/Navbar";
import "./css/global.css";
import Temp from "./routes/temp";
import PokeDetails from "./routes/PokeDetails";
function App() {
  return (
    <HashRouter>
      <Navbar />
      <div className="relative w-full  flex mx-auto">
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<PokeUpload />} path="/upload" />
          <Route element={<PokeScan />} path="/scan" />
          <Route element={<PokeGuess />} path="/guess" />
          <Route element={<Temp />} path="/temp" />
          <Route element={<PokeDetails />} path="/details" />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
