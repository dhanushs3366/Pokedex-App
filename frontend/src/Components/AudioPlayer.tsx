import React from 'react';

interface AudioPlayerProps {
    audioSrc: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioSrc }) => {
    return (
        <div className="AudioPlayer">
            <h2>Play Wav Audio</h2>
            <audio src={audioSrc} controls ></audio>
        </div>
    );
};

export default AudioPlayer;
