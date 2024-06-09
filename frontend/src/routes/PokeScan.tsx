import { useEffect, useRef, useState } from "react"
import {TakePic} from "../../wailsjs/go/main/App.js"
import {imageToTensor,predict} from "../predict"
import { GetPokemonName,TTS } from "../../wailsjs/go/main/App.js"
import  AudioPlayer from "../Components/AudioPlayer"


function PokeScan(){
    const [pokemonName,setPokemonName]=useState<string>("")
    const [imgSrc,setImgSrc]=useState<string>("") //some loading image
    const [hasPhoto,setHasPhoto]=useState<boolean>(false)
    const [TTSStatus,setTTSStatus]=useState<boolean>(false)

    const getPredictions=async function(){
        if(!hasPhoto){
            // do sumn w it and return
        }
        const img=document.querySelector("#camera-feed") as HTMLImageElement
        const pokemonTensor=await imageToTensor(img)
        const pokemonId=await predict(pokemonTensor,"frontend/src/pokedex_js/model.json")
        const pokemonName=await GetPokemonName(pokemonId,"frontend/src/assets/pokemons/pokemon_labels.txt")
        console.log(`Pokemon:${pokemonName}\n`)

        const hasTTS=await GetTTS(pokemonName)
        console.log("TTS:\n"+hasTTS)
        setTTSStatus(hasTTS)
        setPokemonName(pokemonName)

    }

    const GetTTS=async function(pokemonName:string):Promise<boolean>{
        const result=await TTS(pokemonName)
        return result
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
            <h2>TTS: {TTSStatus}</h2>
           </div>
           <div className="TTS">
                <AudioPlayer audioSrc="frontend/src/assets/pokemons/output.wav"/>
           </div>
        </div>
    )
}

export default PokeScan