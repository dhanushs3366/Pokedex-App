import React from "react"

interface GuessProps{
  maskedSrc:string
  pokemonSrc:string
  hasPassed:boolean
}

const RenderGuessPictures:React.FC<GuessProps>=function({maskedSrc,pokemonSrc,hasPassed}){
  return(<div className="relative images">
      <div className="absolute masked-img left-200px" >
        {maskedSrc && <img src={maskedSrc} alt="" />}
      </div>
      <div className="absolute pokemon-img left-200px">
        {pokemonSrc && hasPassed && <img src={pokemonSrc} alt="Pokemon" />}
      </div>
    </div>)

}

export default RenderGuessPictures