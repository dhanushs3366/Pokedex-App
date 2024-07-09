import { PlayTTS } from "../../wailsjs/go/main/App"
import AudioPlayer from "../Components/AudioPlayer"

function Temp(){
   return (
    <div className="w-full h-[100vh] bg-white flex justify-center items-center">
        <div className="target absolute size-1/4 bg-blue-400 rounded-lg z-20"></div>
        <div className="relative size-1/2 bg-orange-300 rounded-lg z-10"></div>
    </div>
   )
}


export default Temp