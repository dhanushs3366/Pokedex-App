import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { backend } from "../../wailsjs/go/models";
import { GetPokemonDetails } from "../../wailsjs/go/main/App";
import { getPrimaryColour } from "../utils/Colour";
import PokemonTypes from "../enums/PokemonTypes";

interface PokeListItemProps {
  ID: number;
}

const PokeListItem: React.FC<PokeListItemProps> = function ({ ID }) {
  const navigate = useNavigate();
  const [pokemonDetail, setPokemonDetail] =
    useState<backend.PokemonDescription | null>(null);
  const POKEMON_IMG_PATH = "src/assets/images/pokemon_images";

  useEffect(() => {
    const fetchDetails = async function () {
      const detail = await GetPokemonDetails(ID);
      if (detail.id > 0) {
        setPokemonDetail(detail);
      }
    };
    fetchDetails();
  }, []);
  if (!pokemonDetail) {
    return null;
  }

  const redirect = function (id: number) {
    const url=`/view/${id}`
    navigate(url)
  };

  const primaryColour=getPrimaryColour(pokemonDetail.types[0].toUpperCase() as PokemonTypes)
  return (
    <div className="w-full h-auto hover:cursor-pointer hover:shadow-xl border-gray-700 border-2 rounded-2xl" onClick={()=>{
        redirect(pokemonDetail.id)
    }} style={{border:`2px solid ${primaryColour}`}}>
      <div className="relative w-full h-auto  flex justify-normal gap-1">
        {/* pokemon image goes here */}
        <img
          src={`${POKEMON_IMG_PATH}/${pokemonDetail.id}.png`}
          alt=""
          className="w-[75%] h-auto  my-2 ml-1"
        />

        {/* Type Icons go here */}
        <div className="relative type-logo   ">
          {pokemonDetail.types.map((type, index) => {
            const TYPE_PATH = "src/assets/images/pokemon-types";
            return (
              <img
                src={`${TYPE_PATH}/${type.toUpperCase()}.png`}
                alt=""
                className="size-6 my-2 rounded-full shadow-lg"
              />
            );
          })}
        </div>
      </div>

      {/* Pokemon Name */}
      <div className="w-full text-center h-auto mb-1 font-bold text-gray-700 ">
        {pokemonDetail.name}
      </div>

      {/* Gender ratio thing */}
      <div className="mx-auto w-[90%] h-1 rounded-full bg-pink-500 mb-3 overflow-hidden ">
        {(() => {
          const gender = pokemonDetail.profile.gender;
          const genderRatio = gender
            .split(":")
            .map((ratio) => Math.ceil(parseFloat(ratio)));
          return (
            <div
              className="male bg-blue-700 h-1 rounded-l-full"
              style={{ width: `${genderRatio[0]}%` }}
            ></div>
          );
        })()}
      </div>
    </div>
  );
};

export default PokeListItem;
