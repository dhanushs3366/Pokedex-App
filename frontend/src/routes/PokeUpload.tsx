import { ReactNode, useEffect, useRef, useState } from "react";
import { MdFileUpload } from "react-icons/md";
import {
  GetPokemonDetails,
  GetPokemonId,
  GetPokemonName,
  TTS,
} from "../../wailsjs/go/main/App.js";
import { predict, imageToTensor } from "../predict.js";
import AudioPlayer from "../Components/AudioPlayer.js";
import { IconContext } from "react-icons";
import PokemonViewer from "../Components/PokemonViewer.js";
import PokemonTypes from "../enums/PokemonTypes.js";
import { backend } from "../../wailsjs/go/models.js";
import PokeballLoading from "../Components/Pokeball.loading.js";
import { useNavigate } from "react-router-dom";
function PokeUpload() {
  const IMG_TAG = "uploaded-img";
  const MODEL_PATH = "src/pokemon-model/model.json";
  const LABELS_PATH = "frontend/src/assets/pokemons/pokemon_labels.txt";

  const navigate=useNavigate()

  const [hasImageUploaded, setHasImageUploaded] = useState<boolean>(false);
  const [pokemon, setPokemon] = useState<backend.PokemonDescription>(); //play  loading screen if (hasImageUploaded && !gotResults)
  const [hasErrors, setHasErrors] = useState<boolean>(true);

  const fileRef = useRef<HTMLInputElement>(null);
  const pokeballRef = useRef<HTMLDivElement>(null);

  async function loadImageFromFile(
    destinationTag: string,
    files: FileList
  ): Promise<void> {
    const file = files ? files[0] : null;
    if (!file) {
      return;
    }

    return new Promise<void>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        const img = document.getElementById(destinationTag) as HTMLImageElement;
        if (img && e.target) {
          img.src = e.target.result as string;
          resolve();
        } else {
          reject(new Error("Failed to load image"));
        }
      };

      reader.onerror = (e) => {
        reject(new Error("Error reading file"));
      };

      reader.readAsDataURL(file);
    });
  }

  function fileUpload() {
    if (fileRef.current) {
      fileRef.current.click();
    }
  }

  async function handleFileSubmit(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (files && files.length > 0) {
      loadImageFromFile(IMG_TAG, files)
        .then(() => {
          setHasImageUploaded(true);
        })
        .catch((err) => {
        });
    }
  }

  function playLoadingAnimation() {
    if (!pokeballRef.current) {
      return;
    }

    pokeballRef.current.style.visibility = "visible";
    pokeballRef.current.style.backgroundColor="black"
    pokeballRef.current.classList.add("z-30")
  }

  function stopLoadingAnimation(){
    if(!pokeballRef.current){
      return
    }

    pokeballRef.current.style.visibility="hidden"
    pokeballRef.current.classList.remove("z-30")
  }

  const getPokemonDetails =
    async function (): Promise<backend.PokemonDescription | null> {
      const pokemonImg = document.getElementById(IMG_TAG) as HTMLImageElement;
      const pokemonTensor = await imageToTensor(pokemonImg);
      const result = await predict(pokemonTensor, MODEL_PATH);
      const pokemonName = await GetPokemonName(result, LABELS_PATH);
      const pokemonId = await GetPokemonId(pokemonName);
      const pokemonDetails = await GetPokemonDetails(pokemonId);
      if (pokemonDetails.id > 0) {
        return pokemonDetails;
      }
      return null;
    };

  const submitPokemon = async function () {
    const pokemon = await getPokemonDetails();
    if (!pokemon) {
      return;
    }

    setPokemon(pokemon)
    const ttsErrors = await TTS(pokemon?.name);
    
    if (!ttsErrors) {
      setHasErrors(false);
    };
  };

  useEffect(()=>{
    stopLoadingAnimation();
  },[])

  useEffect(() => {
    if (hasImageUploaded && pokemon && pokemon.id>0 && !hasErrors) {
      navigate(`/view/${pokemon.id}`,{state:{from:"/upload"}})
    } else if (hasImageUploaded && pokemon && pokemon.id>0 && hasErrors) {
      playLoadingAnimation()
    }
  }, [hasImageUploaded, pokemon, hasErrors]);

  return (
    <div className="relative PokeUpload rounded-xl ">
      
      <div className="flex justify-center gap-3 mb-2">

        {/* pokeball loading animation */}
        <div className=" absolute  w-poke-viewer h-[250px] flex justify-center items-center ">
          <div className="w-[30%] aspect-1 " ref={pokeballRef}>
            <PokeballLoading />
          </div>
        </div>

        <div
          className="relative container w-poke-viewer h-[250px] hover:cursor-pointer hover:shadow-lg "
          onClick={fileUpload}
          style={{
            visibility: hasImageUploaded ? "hidden" : "visible",
            position: hasImageUploaded ? "absolute" : "relative",
          }}
        >
          <IconContext.Provider value={{ size: "inherit" }}>
            <MdFileUpload className="text-6xl text-teal-600 shadow-md" />
          </IconContext.Provider>
          <form action="" className="absolute hidden">
            <input type="file" ref={fileRef} onChange={handleFileSubmit} />
          </form>
        </div>
        <div
          className="relative w-poke-viewer h-[250px] rounded-xl overflow-hidden flex justify-center items-center"
          style={{
            visibility: hasImageUploaded ? "visible" : "hidden",
            position: hasImageUploaded ? "relative" : "absolute",
          }}
        >
          <img
            src=""
            alt=""
            id={`${IMG_TAG}`}
            className="w-full h-full object-cover"
          />
        </div>

        
      </div>


      <div
        className=" w-full flex justify-between gap-3 "
        style={{
          visibility: hasImageUploaded ? "visible" : "hidden",
          position: hasImageUploaded ? "relative" : "absolute",
        }}
      >
        <button
          className="bg-red-400 text-white rounded-lg hover:shadow-lg  p-2"
          onClick={() => {
            setHasImageUploaded(false);
            stopLoadingAnimation()
            fileUpload();
          }}
        >
          Retake
        </button>
        <button
          className="bg-green-400 text-white rounded-lg hover:shadow-lg  p-2"
          onClick={()=>{
            submitPokemon()
          }}
        >
          Submit
        </button>
      </div>

     
    </div>
  );
}

export default PokeUpload;
