import { ReactNode, useEffect, useState } from "react";
import { GetPokemonName, TTS } from "../../wailsjs/go/main/App.js";
import { predict, imageToTensor } from "../predict.js";
import AudioPlayer from "../Components/AudioPlayer.js";
function PokeUpload() {
  const [temp, setTemp] = useState<string>("");
  const [img, setImg] = useState<string>(""); //in future use a default pokemon logo asset
  const [hasTTS, setHasTTS] = useState<boolean>(false);
  const [TTSStatus, setStatus] = useState<string>("no tts available");
  const [audioSrc, setAudioSrc] = useState<string | null>(null);

  async function loadImage(formTag: string): Promise<any> {
    const form = document.querySelector(formTag);
    form?.addEventListener("submit", async function (e) {
      e.preventDefault();
      const pokemonFile = document.querySelector(
        "#pokemon-file"
      ) as HTMLInputElement;
      const file = pokemonFile.files ? pokemonFile.files[0] : null;

      if (!file) {
      }
      const reader = new FileReader();
      reader.onload = function (e) {
        const img = document.getElementById("pokemon-img") as HTMLImageElement;
        img.src = e.target?.result as string;
        img.style.display = "block";
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    });
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");

    await loadImage("#pokemon-form");
    const filePath = "frontend/src/assets/pokemons/pokemon_labels.txt";

    const pokemonImgElement = document.querySelector(
      "#pokemon-img"
    ) as HTMLImageElement;
    const tensor = await imageToTensor(pokemonImgElement);
    const pokemonId = await predict(
      tensor,
      "frontend/src/pokedex_js/model.json"
    );
    console.log("pokemonId:\n\n", pokemonId);
    const pokemonName = await GetPokemonName(pokemonId, filePath);
    console.log("pokemonName:\n\n", pokemonName);
    const TTSStaus = await TTS(pokemonName);
    
    setHasTTS(TTSStaus);
    console.log("TTS:\n"+hasTTS)
    setTemp(pokemonName);
  };

  useEffect(() => {
    if (hasTTS) {
      setStatus("TTS is available");
      setAudioSrc("frontend/src/assets/pokemons/output.wav")
    }
  }, [hasTTS]);

  const readFile = (file: File): Promise<ArrayBuffer> => {
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.onload = () => {
        resolve(reader.result as ArrayBuffer);
      };
      reader.onerror = () => {
        console.log(reader.error);
        reject(reader.error);
      };
      reader.readAsArrayBuffer(file);
    });
  };
  return (
    <div className="PokeUpload">
      <div className="container">
        <form action="" onSubmit={handleSubmit} id="pokemon-form">
          <label htmlFor="pokemon-img">Upload Pokemon image</label>
          <input type="file" name="pokemon-img" id="pokemon-file" />
          <button>Submit</button>
        </form>
        <div className="Result">
          <h1>Here pokemon name</h1>
          <p>{temp}</p>
        </div>

        <div>
          <img src={img} id="pokemon-img" alt="" />
          <p>
            <h2>TTS Status:{TTSStatus}</h2>
          </p>
          {((): ReactNode => {
            if (audioSrc) {
              return <AudioPlayer audioSrc={audioSrc} />;
            }
            return null;
          })()}
        </div>
      </div>
    </div>
  );
}

export default PokeUpload;
