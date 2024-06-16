import { BlockquoteHTMLAttributes, useEffect, useRef, useState } from "react"
import {TakePic} from "../../wailsjs/go/main/App.js"
import {imageToTensor,predict} from "../predict"
import { GetPokemonName,TTS } from "../../wailsjs/go/main/App.js"
import  AudioPlayer from "../Components/AudioPlayer"


function PokeScan(){
    const [pokemonName,setPokemonName]=useState<string>("")
    const [imgSrc,setImgSrc]=useState<string>("") //some loading image
    const [hasPhoto,setHasPhoto]=useState<boolean>(false)
    const [TTSStatus,setTTSStatus]=useState<boolean>(false)
    const [audioSrc,setAudioSrc]=useState<string>("frontend/src/assets/pokemons/output.wav")
    const [playAnimation,setPlayAnimation]=useState<boolean>(false)
    
    
    const [intervalId,setIntervalId]=useState<number | null | NodeJS.Timeout>(null)

    useEffect(()=>{
        if(TTSStatus){
            setPlayAnimation(true)
            //play the audio using the go exec
        }
    },[TTSStatus])

    const getPredictions=async function(){
        if(!hasPhoto){
            // do sumn w it and return
            console.log("\n no photo")
        }
        const img=document.querySelector("#camera-feed") as HTMLImageElement
        const pokemonTensor=await imageToTensor(img)
        const pokemonId=await predict(pokemonTensor,"frontend/src/pokedex_js/model.json")
        const pokemonName=await GetPokemonName(pokemonId,"frontend/src/assets/pokemons/pokemon_labels.txt")
        console.log(`Pokemon:${pokemonName}\n`)

        setPokemonName(pokemonName)
        const hasTTS=await GetTTS(pokemonName)
        console.log("TTS:\n"+hasTTS)
        
        setTTSStatus(hasTTS)        
        const timestamp=new Date().getTime()
        setAudioSrc(`frontend/src/assets/pokemons/output.wav?${timestamp}`) //this doesnt update the audio file use then instead of await
        

    }

    const GetTTS=async function(pokemonName:string):Promise<boolean>{
        const result=await TTS(pokemonName)
        return result
    }

    const cameraOn=async function(){
        if (intervalId===null){
            const id=window.setInterval(changeImage,5000)
            setIntervalId(id)
        }
    };

    const stopCamera=function(){
        if(intervalId!==null){
            clearInterval(intervalId)
            setIntervalId(null);
        }
    }

  


    const changeImage=async function(){
        const img=document.querySelector("#camera-feed") as HTMLImageElement
        const timestamp=new Date().getTime() //use then instead of await
        
        const result=await TakePic()
        console.log(result)
        const src=`frontend/src/assets/images/camera-feed/pokemon.jpg?time=${timestamp}`
        
        setImgSrc(src)
        setHasPhoto(true)        
        

    }


    const cameraOn1=function(){
        if(intervalId===null){
            const id=setTimeout(changeImage,1000)
            setIntervalId(id)
            console.log("id\n"+intervalId)
        }
    }

    const stopCamera1=function(){
        if(intervalId!==null){
            clearInterval(intervalId)

            console.log("id\n"+intervalId)
            setIntervalId(null)

            console.log("id\n"+intervalId)
        }
    }
    return(
        
        <div className="camera" id="camera">
            
            <div className="video">
               <div className="img">
                    <img id="camera-feed" src={imgSrc}></img>
                </div>
                <button onClick={stopCamera1}>SNAP</button><span>     </span><button onClick={getPredictions}>Predict</button> <span>    </span><button onClick={changeImage}>Take Pic</button>
            </div>
           <div className="output">
            <h1>Pokemon: {pokemonName}</h1>
            <h2>TTS: {TTSStatus}</h2>
           </div>
           <div className="TTS">
                <AudioPlayer audioSrc={audioSrc}/>
           </div>
        </div>
    )
}

export default PokeScan