import React from 'react';
import { PlayTTS } from '../../wailsjs/go/main/App';

interface AudioPlayerProps {
    audioSrc: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioSrc }) => {
    const handleSubmit=async function(audioSrc:string){
        const error=await PlayTTS()
        if(error!==""){
            console.log(`Error:${error}`)
        }
    }
    return (
        <div className="AudioPlayer">
            <h2>Play Wav Audio</h2>
            <button onClick={()=>{
                handleSubmit(audioSrc)
            }}>Play</button>
        </div>
    );
};

export default AudioPlayer;

