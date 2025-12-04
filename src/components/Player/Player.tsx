import { PlayerProps } from "./Player.types";
import { useEffect, useState } from "react";
import "./Player.css";

const Player = ({
  audioRef,
  selectedTrack,
  isPlaying,
  togglePlay,
  volume,
  changeVolume,
  isMuted = false,
  toggleMute,
}: PlayerProps) => {
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Update progress and time
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
    audio.addEventListener("ended", () => {
      setProgress(0);
      setCurrentTime(0);
    });

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", resetProgress);
      audio.removeEventListener("ended", () => {
        setProgress(0);
        setCurrentTime(0);
      });
    };
  }, [audioRef, selectedTrack]);

  // Format time MM:SS
  const formatTime = (time: number) => {
    if (!time || time < 0 || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Handle seeking on progress bar
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;

    const progressContainer = e.currentTarget;
    const rect = progressContainer.getBoundingClientRect();
    const clickPosition = (e.clientX - rect.left) / rect.width;
    const seekTime = clickPosition * audio.duration;
    
    audio.currentTime = seekTime;
    setProgress(clickPosition * 100);
    setCurrentTime(seekTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      changeVolume(value);
    }
  };

  return (
    <div className="player-container">
      {/* Track Name */}
      <div className="track-name">
        {selectedTrack ? selectedTrack.split("/").pop() : "No Track Selected"}
      </div>

      {/* Progress Bar */}
      <div className="progress-wrapper">
        <span className="time">{formatTime(currentTime)}</span>
        <div className="progress-container" onClick={handleSeek}>
          <div className="progress" style={{ width: `${progress}%` }} />
        </div>
        <span className="time">{formatTime(duration)}</span>
      </div>

      {/* Controls */}
      <div className="controls">
        {/* Play/Pause Button */}
        <button 
          onClick={togglePlay} 
          className="play-pause-btn"
          disabled={!selectedTrack}
        >
          {isPlaying ? "⏸️ Pause" : "▶️ Play"}
        </button>
        
        {/* Volume Control */}
        <div className="volume-control">
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
          />
          <button onClick={toggleMute} disabled={!selectedTrack}>
            {isMuted ? "🔇 Muted" : "🔊"}
          </button>
          <span className="volume-percentage">
            {Math.round((isMuted ? 0 : volume) * 100)}%
          </span>
        </div>
      </div>
      
      {/* Audio Element */}
      <audio ref={audioRef} data-testid="audio-element" />
    </div>
  );
};

export default Player;