import React, { useState, useEffect } from "react";
import {
  GetOptions,
  GetPokemonNameForGuess,
  GetPokemonTypes,
} from "../../wailsjs/go/main/App";
import "../css/global.css";
import PokemonViewer from "../Components/PokemonViewer";
import PokemonTypes from "../enums/PokemonTypes";

function PokeGuess() {
  const MIN_POKEMON_ID = 1;
  const MAX_POKEMON_ID = 151;

  const pickPokemonId = (): number => {
    return (
      Math.floor(Math.random() * (MAX_POKEMON_ID - MIN_POKEMON_ID + 1)) +
      MIN_POKEMON_ID
    );
  };

  const getPokemonName = async (id: number): Promise<string> => {
    const pokemonName = await GetPokemonNameForGuess(id);
    return pokemonName;
  };

  async function getPrimaryType(pokemonID: number): Promise<PokemonTypes> {
    const types = await GetPokemonTypes(pokemonID);
    if (!types) {
      return PokemonTypes.NORMAL;
    }

    return types[0].toUpperCase() as PokemonTypes;
  }

  const [options, setOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [correctOption, setCorrectOption] = useState<string>("");
  const [pokemonId, setPokemonId] = useState<number>(-1);
  const [maskedSrc, setMaskedSrc] = useState<string | null>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [hasPassed, setHasPassed] = useState<boolean>(false);
  const [attempted, setAttempted] = useState<boolean>(false);
  const [primaryType, setPrimaryType] = useState<PokemonTypes>(
    PokemonTypes.NORMAL
  );

  const MASKED_IMG_PATH = "frontend/src/assets/images/masked_pokemons";
  const POKEMON_IMG_PATH = "frontend/src/assets/images/pokemon_images";

  const initializeQuiz = async () => {
    const id = pickPokemonId();
    const name = await getPokemonName(id);
    setMaskedSrc(`${MASKED_IMG_PATH}/${id}.png`);
    setPokemonId(id);
    setCorrectOption(name);
    await getOptions(id);
    setSelectedOption(null);
    setImgSrc(null);
    setHasPassed(false);
    
  };

  const fetchType=async ()=>{
    const type = await getPrimaryType(pokemonId);
    setPrimaryType(type);
  }

  const getOptions = async (id: number): Promise<void> => {
    const fetchedOptions = await GetOptions(id);
    if (fetchedOptions) {
      setOptions(fetchedOptions);
    }
  };

  useEffect(() => {
    initializeQuiz();
  }, []);

  useEffect(()=>{
    fetchType();
  },[pokemonId])
  useEffect(() => {
    if (hasPassed) {
      setImgSrc(`${POKEMON_IMG_PATH}/${pokemonId}.png`);
    }
  }, [hasPassed, pokemonId]);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    handleSubmit();
  }, [selectedOption]);

  const handleSubmit = () => {
    if (selectedOption === null) {
      return;
    }

    setAttempted(true);

    if (selectedOption === correctOption) {
      setHasPassed(true);
    }
  };

  const handleRetakeQuiz = () => {
    initializeQuiz();
    setAttempted(false);
  };

  return (
    <div className="relative mx-auto w-poke-guess-frame h-auto  rounded-3xl quiz flex flex-col items-end bg-white ">
      <div className="relative w-poke-guess-frame h-poke-guess-frame  quiz-picture-frame">
        {maskedSrc && (
          <PokemonViewer
            canRender={true}
            imgSrc={maskedSrc}
            primaryPokemonType={primaryType}
          />
        )}
        {imgSrc && (
          <div className="img absolute w-full h-full z-30 flex justify-center  items-end pb-3 pl-3">
            <img
              src={imgSrc}
              className="absolute bottom-[10%]   w-auto h-[55%]"
              alt=""
            />
            {/* not using pokemonviewer component cuz the fading header will overlap with causing less fading so i just copy pasted the image to overcome that */}
          </div>
        )}
      </div>

      <div className="relative mt-3 w-full">
        {options.map((option, index) => (
          <div
            key={index}
            className="w-full rounded-lg block px-3 py-1 mb-3 hover:shadow-lg hover:cursor-pointer text-center"
            onClick={() => {
              handleOptionSelect(option);
            }}
          >
            <span
              className="guess-option text-xl font-8bit-bold "
              id="guess-option"
            >
              {option}
            </span>
          </div>
        ))}
      </div>
      <div className="relative buttons block  ">
        <button
          className="text-white bg-main hover:bg-slate-600  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mx-auto"
          onClick={handleRetakeQuiz}
        >
          {attempted ? "Retake Quiz" : "Refresh"}
        </button>
      </div>
    </div>
  );
}

export default PokeGuess;
