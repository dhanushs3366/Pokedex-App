import React from "react";
import PokemonTypes from "../enums/PokemonTypes";
import  {hexToRgb,getPrimaryColour} from "../utils/Colour";
import PrimaryColour from "../enums/PrimaryColour";

interface PokemonViewerProps {
  imgSrc: string;
  canRender: boolean;
  primaryPokemonType: PokemonTypes;
}

// fire->#ff9c54

function applyOpacity(hexColour: string) {
  const [r, g, b] = hexToRgb(hexColour);
  const gradientStyle = {
    background: `linear-gradient(to bottom, rgba(${r},${g},${b}, 0.4) 0%, rgba(${r},${g},${b}, 0.7) 50%, rgba(${r},${g},${b}, 1) 100%)`,
  };
  return gradientStyle;
}

function setPrimaryColour(primaryColour:PrimaryColour){
  return {
    backgroundColor:primaryColour,

  }
}

const PokemonViewer: React.FC<PokemonViewerProps> = ({
  imgSrc,
  canRender,
  primaryPokemonType,
}) => {
  if (!canRender) {
    return null;
  }
  const primaryColour=getPrimaryColour(primaryPokemonType)
  return (
    <div className="img-header absolute w-full h-full bg-white flex justify-center items-center  rounded-2xl overflow-hidden">
      <div className="img-type-bg absolute bottom-[30%]  w-[110%] h-[120%]  rounded-full flex justify-center items-center overflow-hidden" style={setPrimaryColour(primaryColour)}>
        <div
          className="img-type-holder absolute size-[50%] top-[45%] rounded-full z-20"
          style={applyOpacity(primaryColour)}
        ></div>
        {/* if the above div position changed change the image position too so it stacks on top of each other z-ind(div)> z-ind(img)*/}
        <img
          className="absolute w-[60%] h-auto poke-guess-img z-10 top-[45%]"
          src={`frontend/src/assets/images/pokemon-types/${primaryPokemonType}.png`}
          alt=""
        />
      </div>
      <div className="img absolute w-full h-full z-30 flex justify-center  items-end pb-3 pl-3">
        <img
          src={imgSrc}
          className="absolute bottom-[10%]  w-auto h-[55%]"
          alt=""
        />
        {/* if u change anything here change PokeGuess.tsx under the this component usage, using unmasked image as a cover there both need to have same position to overlap correctly */}
      </div>
    </div>
  );
};

export default PokemonViewer;
