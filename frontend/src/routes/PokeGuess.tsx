import React, { useState, useEffect } from "react";
import { GetOptions, GetPokemonNameForGuess } from "../../wailsjs/go/main/App";
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

  const [options, setOptions] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [correctOption, setCorrectOption] = useState<string>("");
  const [pokemonId, setPokemonId] = useState<number>(-1);
  const [maskedSrc, setMaskedSrc] = useState<string | null>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [hasPassed, setHasPassed] = useState<boolean>(false);
  const [attempted, setAttempted] = useState<boolean>(false);

  const MASKED_IMG_PATH = "frontend/src/assets/images/masked_pokemons";
  const POKEMON_IMG_PATH = "frontend/src/assets/images/pokemon_images";

  const initializeQuiz = async () => {
    const id = pickPokemonId();
    const name = await getPokemonName(id);
    setMaskedSrc(`${MASKED_IMG_PATH}/${id}.png`);
    setPokemonId(id);
    setCorrectOption(name);
    await getOptions(id);
    setFeedback(null);
    setSelectedOption(null);
    setImgSrc(null);
    setHasPassed(false);
  };

  const getOptions = async (id: number): Promise<void> => {
    const fetchedOptions = await GetOptions(id);
    if (fetchedOptions) {
      setOptions(fetchedOptions);
    }
  };

  useEffect(() => {
    initializeQuiz();
  }, []);

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
      setFeedback("Please select an option.");
      return;
    }

    setAttempted(true);

    if (selectedOption === correctOption) {
      setHasPassed(true);
      setFeedback("Correct!");
    } else {
      setFeedback("Incorrect.");
    }
  };

  const handleRetakeQuiz = () => {
    initializeQuiz();
    setAttempted(false);
  };

  return (
    <div className="mx-auto w-poke-guess-frame h-auto  bg-white rounded-xl">
      <div className="relative w-full h-poke-guess-frame  ">
        {maskedSrc && <PokemonViewer canRender={true} imgSrc={maskedSrc} primaryPokemonType={PokemonTypes.FIRE}/>}
        {imgSrc && <PokemonViewer canRender={true} imgSrc={imgSrc} primaryPokemonType={PokemonTypes.FIRE}/>}
      </div>

      <div className="mt-3">
        {options.map((option, index) => (
          <div
            key={index}
            className="w-full rounded-lg border-solid border-2 border-sky-500 px-3 py-1 mb-3 hover:shadow-lg hover:cursor-pointer text-center"
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
      <div className="buttons flex justify-between items-center ">
        <button
          className="text-white bg-main hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mx-auto"
          onClick={handleRetakeQuiz}
        >
          {attempted ? "Retake Quiz" : "Refresh"}
        </button>
      </div>
    </div>
  );
}

export default PokeGuess;
