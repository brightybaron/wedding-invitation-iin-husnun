import { useState, useRef, useEffect } from "react";
import { IconDisc, IconPause } from "@components/Icon";
import audioFile from "@assets/audio/Your Love - Yung Logos.mp3";
export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.volume = 0.2;
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    // Initialize audio element
    if (audioRef.current) {
      audioRef.current.volume = 0.2;
    }
  }, []);

  return (
    <div id="audio-container">
      <audio id="song" ref={audioRef} loop>
        <source src={audioFile} type="audio/mp3" />
      </audio>

      <div
        onClick={togglePlay}
        className={`fixed bottom-10 left-6 flex justify-center items-center cursor-pointer text-gray-600 mix-blend-difference w-16 h-16 text-base ${
          isPlaying ? "animate-spin" : ""
        }`}
        style={{
          animationDuration: "4s",
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
        }}
      >
        {isPlaying ? <IconDisc /> : <IconPause />}
      </div>
    </div>
  );
}
