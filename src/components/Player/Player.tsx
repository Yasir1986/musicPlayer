import { PlayerProps } from "./Player.types";
import { useEffect, useState } from "react";
import "./Player.css";

const Player = ({ audioRef, selectedTrack }: PlayerProps) => {
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration || 0);
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const resetProgress = () => {
      setProgress(0);
      setCurrentTime(0);
      setDuration(audio.duration || 0);
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", resetProgress);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", resetProgress);
    };
  }, [audioRef, selectedTrack]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="player-container">
      <div className="track-name">
        {selectedTrack ? selectedTrack.split("/").pop() : "No Track Selected"}
      </div>

      <div className="progress-wrapper">
        <span className="time">{formatTime(currentTime)}</span>
        <div className="progress-container">
          <div className="progress" style={{ width: `${progress}%` }} />
        </div>
        <span className="time">{formatTime(duration)}</span>
      </div>

      <audio ref={audioRef} data-testid="audio-element" />
    </div>
  );
};

export default Player;
