import React, { useState, useEffect } from 'react';
import { GetOptions, GetPokemonNameForGuess } from '../../wailsjs/go/main/App';
import "../css/PokeGuess.css"


function PokeGuess() {
    const MIN_POKEMON_ID = 1;
    const MAX_POKEMON_ID = 151;

    const pickPokemonId = (): number => {
        return Math.floor(Math.random() * (MAX_POKEMON_ID - MIN_POKEMON_ID + 1)) + MIN_POKEMON_ID;
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
    const question = "Who is that pokemon?";

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
            setImgSrc(`${POKEMON_IMG_PATH}/${pokemonId}.jpg`);
        }
    }, [hasPassed, pokemonId]);

    const handleOptionSelect = (option: string) => {
        setSelectedOption(option);
    };

    const handleSubmit = () => {
        if (selectedOption === null) {
            setFeedback('Please select an option.');
            return;
        }

        setAttempted(true);

        if (selectedOption === correctOption) {
            setHasPassed(true);
            setFeedback('Correct!');
        } else {
            setFeedback('Incorrect.');
        }
    };

    const handleRetakeQuiz = () => {
        initializeQuiz();
        setAttempted(false);
    };

    return (
        <div>
            <h1>{question}</h1>
            <div className="images">
                <div className="masked-img">
                    {maskedSrc && <img src={maskedSrc} alt="" />}
                </div>
                <div className="pokemon-img">
                    {imgSrc && hasPassed && <img src={imgSrc} alt="Pokemon" />}
                </div>
            </div>
            <ul>
                {options.map((option, index) => (
                    <li key={index}>
                        <label>
                            <input
                                type="radio"
                                value={option}
                                checked={selectedOption === option}
                                onChange={() => handleOptionSelect(option)}
                            />
                            {option}
                        </label>
                    </li>
                ))}
            </ul>
            <div className="buttons">
                <button onClick={handleSubmit}>Submit</button>
                <button onClick={handleRetakeQuiz}>{attempted ? 'Retake Quiz' : 'Refresh'}</button>
            </div>
            {feedback && <p className="feedback">{feedback}</p>}
        </div>
    );
}

export default PokeGuess;
