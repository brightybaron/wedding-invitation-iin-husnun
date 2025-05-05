import { useState, useRef, useEffect } from "react";
import { IconDisc, IconPause } from "@components/Icon";
import audioFile from "@assets/audio/Calum Scott - You Are The Reason Piano Cover with Strings.mp3";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.volume = 0.4;
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    // Initialize audio element
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
    }

    // Listen for the modalOpened event
    const handleModalOpened = () => {
      if (audioRef.current) {
        audioRef.current.volume = 0.4;
        audioRef.current.play().catch((error) => {
          console.log("Audio play was prevented:", error);
          // Modern browsers require user interaction before playing audio
        });
        setIsPlaying(true);
      }
    };

    // Add event listener for the custom event
    document.addEventListener("modalOpened", handleModalOpened);

    // Clean up the event listener when component unmounts
    return () => {
      document.removeEventListener("modalOpened", handleModalOpened);
    };
  }, []);

  return (
    <div id="audio-container">
      <audio id="song" ref={audioRef} loop>
        <source src={audioFile} type="audio/mp3" />
      </audio>

      <div
        onClick={togglePlay}
        className={`fixed bottom-10 left-6 flex justify-center items-center cursor-pointer text-gray-600 mix-blend-difference w-16 h-16 text-base z-[1001] ${
          isPlaying ? "animate-spin" : "animate-spin"
        }`}
        style={{
          animationDuration: "4s",
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
        }}
      >
        {isPlaying ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-12 h-12"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M6 12c0-1.7.7-3.2 1.8-4.2"></path>
            <circle cx="12" cy="12" r="2"></circle>
            <path d="M18 12c0 1.7-.7 3.2-1.8 4.2"></path>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-8 h-8"
          >
            <rect x="14" y="4" width="4" height="16" rx="1" />
            <rect x="6" y="4" width="4" height="16" rx="1" />
          </svg>
        )}
      </div>
    </div>
  );
}
