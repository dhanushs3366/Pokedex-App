import { PlayTTS } from "../../wailsjs/go/main/App"
import AudioPlayer from "../Components/AudioPlayer"

function Temp(){
    const handleClick= async function(){
        const error=await PlayTTS()
        console.log(error)
    }
    return (
        <button onClick={handleClick}>Play</button>
    )
}


export default Temp