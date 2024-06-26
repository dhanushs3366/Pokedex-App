import React from "react";
import PokemonTypes from "../enums/PokemonTypes";


interface PokemonViewerProps {
  imgSrc: string;
  canRender: boolean;
  primaryPokemonType: PokemonTypes;
}

const PokemonViewer: React.FC<PokemonViewerProps> = ({ imgSrc, canRender }) => {
  if (!canRender) {
    return null;
  }

  return (
    
    <div className="absolute img-container bg-white w-full h-full  rounded-xl flex flex-col items-center overflow-hidden">
      <div className="pokemon-type-header absolute right bottom-[100px] rounded-full size-poke-guess-header bg-[#ff9c54] overflow-hidden">
  <div className="relative">
    <img className="absolute size-[150px] top-[150px] left-[75px] bg-gradient-to-r from-[#ff9c54] to-transparent" src="frontend/src/assets/images/pokemon-types/FIRE.png" alt="" />
  </div>
</div>

      {/* <img
          className="absolute top-[80px] h-[150px] w-auto guess-images mx-auto"
          src={imgSrc}
          alt="Pokemon"
        /> */}
      
    </div>
  );
};

export default PokemonViewer;
