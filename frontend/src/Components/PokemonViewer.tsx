
import React from 'react';
import PokemonTypes from '../enums/PokemonTypes';

interface PokemonViewerProps {
  imgSrc: string ;
  canRender: boolean;
  primaryPokemonType:PokemonTypes
}

const PokemonViewer: React.FC<PokemonViewerProps> = ({ imgSrc, canRender }) => {
  if (!canRender) {
    return null;
  }

  return (
    // <div className="absolute top-0 left-0 w-full h-full border-2 border-yellow-500 p-3 rounded-lg">
    //    <img className="h-poke-guess w-auto guess-images mx-auto" src={imgSrc} alt="Pokemon" />
    // </div>
    <div className="relative img-container bg-white w-full h-full z-3 flex flex-col items-center">
        <div className="pokemon-type-header absolute  left-0 bottom-[150px]  rounded-full size-poke-guess-frame bg-[#ff9c54]">
        </div>

    </div>
  );
};

export default PokemonViewer;
