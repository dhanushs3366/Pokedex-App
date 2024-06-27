import React from "react";
import PokemonTypes from "../enums/PokemonTypes";
import hexToRgb from "../utils/Color";

interface PokemonViewerProps {
  imgSrc: string;
  canRender: boolean;
  primaryPokemonType: PokemonTypes;
}

// fire->#ff9c54

function applyOpacity(hexColor:string){
  const [r,g,b]=hexToRgb(hexColor)
  const gradientStyle = {
    background: `linear-gradient(to bottom, rgba(${r},${g},${b}, 0) 0%, rgba(${r},${g},${b}, 0.4) 50%, rgba(${r},${g},${b}, 1) 100%)`,
  };
  return gradientStyle
}

const PokemonViewer: React.FC<PokemonViewerProps> = ({ imgSrc, canRender }) => {
  if (!canRender) {
    return null;
  }
  

  return (
    <div className="img-header relative w-full h-full bg-white flex justify-center items-center  rounded-t-2xl overflow-hidden">
      <div className="img-type-bg absolute bottom-[45%]  w-[110%] h-[110%] bg-[#ff9c54] rounded-full flex justify-center items-center overflow-hidden">
        <div className="img-type-holder absolute size-[40%] top-[55%] rounded-full z-20" style={applyOpacity("#ff9c54")}> 
        </div>
        {/* if the above div position changed change the image position too so it stacks on top of each other */}
        <img className="absolute poke-guess-img z-10 top-[55%]" src="frontend/src/assets/images/pokemon-types/FIRE.png"  alt="" />
      </div>
    </div>
  );
};

export default PokemonViewer;
