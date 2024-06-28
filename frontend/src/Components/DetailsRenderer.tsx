import { GetPokemonDetails } from "../../wailsjs/go/main/App";
import { backend } from "../../wailsjs/go/models";
import PokemonTypes from "../enums/PokemonTypes";
import PrimaryColour from "../enums/PrimaryColour";
import { getPrimaryColour } from "../utils/Colour";
import PokemonViewer from "./PokemonViewer";
import React from "react";
import { useRef, useState, useEffect } from "react";

function DetailsRenderer() {
  const parentPokemonViewerDiv = useRef<HTMLDivElement>(null);
  const pokemonViewerDiv = useRef<HTMLDivElement>(null);
  const siblingPokemonViewerDiv = useRef<HTMLDivElement>(null);
  const [parentHeight, setParentHeight] = useState<number>(0);
  const [pokemonDetail, setPokemonDetail] =
    useState<backend.PokemonDescription | null>(null);

  const primaryType = PokemonTypes.GRASS;
  const primaryColour = getPrimaryColour(primaryType);
  const pokemonID = 1; //placeholder
  const IMAGE_SRC_PLACE_HOLDER = `frontend/src/assets/images/pokemon_images/${pokemonID}.png`;

  useEffect(() => {
    if (pokemonViewerDiv.current && siblingPokemonViewerDiv.current) {
      const height1 = pokemonViewerDiv.current.getBoundingClientRect().height;
      const height2 =
        siblingPokemonViewerDiv.current.getBoundingClientRect().height;
      const width =
        siblingPokemonViewerDiv.current.getBoundingClientRect().width;
      setParentHeight(height1 + height2 - 10 + 0.06 * width);
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
      className="relative details-renderer w-poke-viewer h-poke-guess-frame rounded-xl"
      style={{ backgroundColor: primaryColour }}
      ref={parentPokemonViewerDiv}
    >
      <div
        className="absolute  w-poke-viewer h-poke-viewer rounded-xl overflow-hidden "
        ref={pokemonViewerDiv}
      >
        <PokemonViewer
          imgSrc={IMAGE_SRC_PLACE_HOLDER}
          canRender={true}
          primaryPokemonType={primaryType}
        />
      </div>
      <div className="absolute mt-2 px-2 w-full h-auto  flex justify-between items-baseline z-50 ">
        <span className="font-8bit-bold text-lg font-bold text-white">
          {pokemonDetail?.name}
        </span>
        <span className="font-8bit-bold text-lg font-normal text-white">{`#${pokemonDetail?.id}`}</span>
      </div>

      <div
        className="detail-section relative w-poke-viewer py-1 h-auto top-poke-guess rounded-xl"
        style={{ backgroundColor: primaryColour }}
      >
        <div
          className="relative w-[95%] h-auto pb-2 mb-1  bg-white  mx-auto rounded-lg shadow-inner"
          ref={siblingPokemonViewerDiv}
        >
          {/* poke-guess=poke-viewer */}
          {/* this place is for type details of a pokemon */}
          <div className="relative flex justify-center pt-9 h-auto ">
            {pokemonDetail != null &&
              pokemonDetail.types.map((type, index) => {
                const bgColour = getPrimaryColour(
                  type.toUpperCase() as PokemonTypes
                );
                return (
                  <span
                    key={index}
                    className="px-3 mx-1  mb-1 rounded-full text-lg font-sans text-white"
                    style={{ backgroundColor: bgColour }}
                  >
                    {type}
                  </span>
                );
              })}
          </div>
          {/* <div className="poke-detail-about flex justify-center ">
            <span
              className="text-xl font-bold "
              style={{
                color: primaryColour,
              }}
            >
              About
            </span>
          </div> */}

          {/* Profile place */}
          {/* <div className="flex justify-center gap-4 mx-3 items-center">
            {(() => {
              const about = [
                pokemonDetail?.profile.weight,
                pokemonDetail?.profile.height,
              ];
              const svgPaths = [
                "src/assets/images/svgs/weight.svg",
                "src/assets/images/svgs/ruler.svg",
              ];
              const props = ["Weight", "Height"];

              return about.map((ele, index) => {

                let colour;
                if (pokemonDetail?.types && pokemonDetail.types.length>1){
                  colour=getPrimaryColour((pokemonDetail.types[1].toUpperCase()) as PokemonTypes)
                }else{
                  colour=primaryColour
                }
                return (
                  <React.Fragment key={index}>
                    <div className="flex flex-col items-center py-2">
                      <div className="flex justify-center items-center rounded-full " style={{backgroundColor:colour }}>
                        
                        <span className="px-3 mx-1  mb-3 rounded-full text-lg font-sans text-white">
                          {ele}
                        </span>
                      </div>
                      
                    </div>
                    
                  </React.Fragment>
                );
              });
            })()}
          </div> */}

          {/* Moves place */}

          <div className="flex justify-center gap-2 place-items-baseline ">
            {pokemonDetail &&
              (() => {
                const moves = pokemonDetail.abilities;

                return moves.map((move, index) => {
                  return (
                    <React.Fragment>
                      {index !== 0 && (
                        <div className="border-r border-gray-500 h-2 "></div>
                      )}

                      <div className="">
                        <span
                          className="font-semibold text-gray-400 text-xs uppercase tracking-wide"
                          style={{ fontSize: "10px" }}
                        >
                          {move}
                        </span>
                      </div>
                    </React.Fragment>
                  );
                });
              })()}
          </div>
          <div className="move-title flex justify-center">
            <span className="mx-auto text-gray-500 font-bold text-normal">
              Moves
            </span>
          </div>

          {/* Description */}
          <div className="description w-full px-3 mb-1 ">
            <div className="description-title text-normal text-gray-500 font-bold mb-1">
              Description
            </div>
            <span
              className="text-gray-400 font-bold leading-tight"
              style={{
                fontSize: "10px",
                display: "block",
                whiteSpace: "wrap",
              }}
            >
              {pokemonDetail?.description}
            </span>
          </div>

          {/* Gender ratio */}
          <div className=" w-full h-auto px-3">
            {pokemonDetail &&
              (() => {
                const genderStr = pokemonDetail.profile.gender;
                const genderRatio = genderStr
                  .split(":")
                  .map((ratio) => parseFloat(ratio));
                if (genderStr === "Genderless") {
                  return null;
                }
                return (
                  <div className="w-full h-auto rounded-full">
                    <div
                      className=" bg-blue-700 h-2 inline-block rounded-l-full"
                      style={{ width: `${genderRatio[0]}%` }}
                    ></div>
                    <div
                      className="bg-pink-500 h-2 inline-block rounded-r-full"
                      style={{ width: `${100 - genderRatio[0]}%` }}
                    ></div>

                    <div className=" flex w-full justify-between   left-0 right-0 px-1">
                      <div className="male h-auto w-auto">
                        <img
                          src="src/assets/images/svgs/male.svg"
                          className="inline  h-auto thick-svg"
                          alt="Male"
                          style={{width:"11px",height:"auto"}}
                        />
                        <span
                          className="inline px-1 text-gray-900 leading-tight"
                          style={{ fontSize: "12px" }}
                        >
                          {genderRatio[0]}%
                        </span>
                      </div>
                      <div className="female h-auto w-auto">
                        <img
                          src="src/assets/images/svgs/female.svg"
                          className="w-3 h-3 inline"
                          alt="Female"
                          style={{width:"11px",height:"auto"}}
                        />
                        <span
                          className="inline px-1 text-gray-900 leading-tight"
                          style={{ fontSize: "12px" }}
                        >
                          {genderRatio[1]}%
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })()}
          </div>
        </div>
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
