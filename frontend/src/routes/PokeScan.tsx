import { useEffect, useRef, useState } from "react"
import {TakePic} from "../../wailsjs/go/main/App.js"
import {imageToTensor,predict} from "../predict"
import { GetPokemonName } from "../../wailsjs/go/main/App.js"

function PokeScan(){
    const [pokemonName,setPokemonName]=useState<string>("")
    const [imgSrc,setImgSrc]=useState<string>("") //some loading image
    const [hasPhoto,setHasPhoto]=useState<boolean>(false)


    const getPredictions=async function(){
        if(!hasPhoto){
            // do sumn w it and return
        }
        const img=document.querySelector("#camera-feed") as HTMLImageElement
        const pokemonTensor=await imageToTensor(img)
        const pokemonId=await predict(pokemonTensor,"frontend/src/pokedex_js/model.json")
        const pokemon=await GetPokemonName(pokemonId,"frontend/src/assets/pokemons/pokemon_labels.txt")
        console.log(`Pokemon:${pokemon}\n`)
        setPokemonName(pokemon)

    }

    
    const changeImage=async function(){
        const img=document.querySelector("#camera-feed") as HTMLImageElement
        const timestamp=new Date().getTime()
        
        const src=`frontend/src/assets/images/camera-feed/pokemon.jpg?time=${timestamp}`
        console.log(src)
        setImgSrc(src)
        setHasPhoto(true)        
        const result=await TakePic()
        console.log(result)

    }
    return(
        
        <div className="camera" id="camera">
            
            <div className="video">
               <div className="img">
                    <img id="camera-feed" src={imgSrc}></img>
                </div>
                <button onClick={()=>{
                    changeImage()
                }}>SNAP</button><span>     </span><button onClick={getPredictions}>OK</button> 
            </div>
           <div className="output">
            <h1>Pokemon: {pokemonName}</h1>
           </div>
        </div>
    )
}

export default PokeScan