import { GetPokemonDetails } from "../../wailsjs/go/main/App";
import { backend } from "../../wailsjs/go/models";
import PokemonTypes from "../enums/PokemonTypes";
import PrimaryColour from "../enums/PrimaryColour";
import { getPrimaryColour } from "../utils/Colour";
import PokemonViewer from "./PokemonViewer";
import { useRef, useState, useEffect } from "react";

function DetailsRenderer() {
  const parentPokemonViewerDiv = useRef<HTMLDivElement>(null);
  const pokemonViewerDiv = useRef<HTMLDivElement>(null);
  const siblingPokemonViewerDiv = useRef<HTMLDivElement>(null);
  const [parentHeight, setParentHeight] = useState<number>(0);
  const [pokemonDetail, setPokemonDetail] =
    useState<backend.PokemonDescription | null>(null);

  const IMAGE_SRC_PLACE_HOLDER =
    "frontend/src/assets/images/pokemon_images/3.png";

  const primaryType = PokemonTypes.WATER;
  const primaryColour = getPrimaryColour(primaryType);
  const pokemonID = 1; //placeholder

  useEffect(() => {
    if (pokemonViewerDiv.current && siblingPokemonViewerDiv.current) {
      const height1 = pokemonViewerDiv.current.getBoundingClientRect().height;
      const height2 =
        siblingPokemonViewerDiv.current.getBoundingClientRect().height;
        const width=siblingPokemonViewerDiv.current.getBoundingClientRect().width
      setParentHeight(height1 + height2-50+0.025*width);
    }
  }, []);

  async function getPokemonDetails(
    pokemonID: number
  ): Promise<backend.PokemonDescription> {
    const pokemonDetails = await GetPokemonDetails(pokemonID);
    return pokemonDetails;
  }

  useEffect(() => {
    const fetchDetails = async () => {
      const details = await getPokemonDetails(pokemonID);
      if (details.id > 0) {
        // if 0 it is an empty struct
        setPokemonDetail(details);
      }
    };
    fetchDetails();
  }, []);

  return (
    <div
      className="relative details-renderer w-poke-viewer  "
      style={{ backgroundColor: primaryColour, height: `${parentHeight}px` }}
      ref={parentPokemonViewerDiv}
    >
      <div
        className="absolute  w-poke-viewer h-poke-viewer overflow-hidden "
        ref={pokemonViewerDiv}
      >
        <PokemonViewer
          imgSrc={IMAGE_SRC_PLACE_HOLDER}
          canRender={true}
          primaryPokemonType={primaryType}
        />
      </div>
      <div className="absolute mt-2 px-1 w-full h-auto  flex justify-between z-50">
        <span>Pokemon Name</span>
        <span>Pokemon ID</span>
      </div>

      <div
        className="relative w-[95%] h-auto top-poke-guess mb-2  bg-white  mx-auto rounded-sm"
        ref={siblingPokemonViewerDiv}
      >
        {/* poke-guess=poke-viewer */}
        <div className="flex justify-center pt-6 h-auto ">
          {pokemonDetail != null &&
            pokemonDetail.types.map((type, index) => {
                const bgColour=getPrimaryColour(type.toUpperCase() as PokemonTypes)
              return (
                <span
                  key={index}
                  className="px-3 mx-1  mb-2 rounded-full text-lg font-sans text-white"
                  style={{ backgroundColor: bgColour }}
                >
                  {type}
                </span>
              );
            })}
        </div>
        <div className="poke-detail-about text-xl font-bold" style={{
            color:PrimaryColour.GRASS
        }}></div>
      </div>
    </div>
  );
}

export default DetailsRenderer;

/*
<div className="flex justify-center border-black border-2">
    {
        pokemonDetail && pokemonDetail.types.map((type, index) => {
            const bgColour = getPrimaryColour(type.toUpperCase() as PokemonTypes); // Assuming getPrimaryColour returns a valid CSS color value

            return (
                
            );
        })
    }
</div>

*/
