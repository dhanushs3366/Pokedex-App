import { useState } from "react";
// import {GetPokemonImage,GetPokemonName} from "../wailsjs/go/main/App.js"
import {GetPokemonName} from "../wailsjs/go/main/App.js"
import { predict , imageToTensor} from "./predict.js";
function App(){

    const [temp,setTemp]=useState<string>("");
    const [img,setImg]=useState<string>("frontend/src/assets/pokemons/pokemon.png");//in future use a default pokemon logo asset

    async function loadImage(formTag:string):Promise<any>{
        const form=document.querySelector(formTag);
        form?.addEventListener("submit",async function(e){
            e.preventDefault()
            const pokemonFile=document.querySelector("#pokemon-file") as HTMLInputElement;
            const file=pokemonFile.files? pokemonFile.files[0]:null

            if(!file){
                
            }
            const reader=new FileReader()
            reader.onload = function(e) {
                const img = document.getElementById('pokemon-img') as HTMLImageElement;
                img.src = e.target?.result as string;
                img.style.display = 'block';
            }
            if(file){
                reader.readAsDataURL(file)
            }
        })

    }

    const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        console.log("Form submitted");
        
        await loadImage("#pokemon-form")
        const filePath="frontend/src/assets/pokemons/pokemon_labels.txt"

        const pokemonImgElement=document.querySelector("#pokemon-img") as HTMLImageElement;
        const tensor=await imageToTensor(pokemonImgElement)
        const pokemonId=await predict(tensor,"frontend/src/pokedex_js/model.json");
        console.log("pokemonId:\n\n",pokemonId)
        const pokemonName=await GetPokemonName(pokemonId,filePath)
        console.log("pokemonName:\n\n",pokemonName)
        

    }

    const readFile=(file:File):Promise<ArrayBuffer>=>{
        const reader=new FileReader();

        return new Promise((resolve,reject)=>{
            reader.onload=()=>{
                resolve(reader.result as ArrayBuffer);
            };
            reader.onerror=()=>{
                console.log(reader.error);
                reject(reader.error);
            };
            reader.readAsArrayBuffer(file);
        });
    }
    return(
        <div className="App">
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
                    <img src={img} id="pokemon-img"alt="" />
                </div>

            </div>
        </div>
    );
}


export default App;