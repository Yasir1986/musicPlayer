import { useRef, useState, useEffect, useCallback } from "react";

export const useAudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState<number>(0.7);
  const [isMuted, setIsMuted] = useState(false);

  // Play/pause and track changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !selectedTrack) return;

    // If track changed, reset src
    if (audio.src !== selectedTrack) {
      audio.src = selectedTrack;
      audio.currentTime = 0;
    }

    if (isPlaying) {
      audio.play().catch((error) => {
        console.error("Error playing audio:", error);
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [selectedTrack, isPlaying]);

  // Handle volume changes
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
  }, [volume]);

  // Handle mute changes
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.muted = isMuted;
  }, [isMuted]);

  const togglePlay = useCallback(() => {
    if (!selectedTrack) {
      console.warn("No track selected");
      return;
    }
    setIsPlaying((prev) => !prev);
  }, [selectedTrack]);

  const selectTrack = useCallback((track: string) => {
    setSelectedTrack(track);
  }, []);

  const changeVolume = useCallback((value: number) => {
    // Ensure value is valid number
    const numValue = Number(value);
    if (isNaN(numValue)) {
      console.error("Invalid volume value:", value);
      return;
    }
    
    // Clamp value between 0 and 1
    const clampedValue = Math.max(0, Math.min(1, numValue));
    setVolume(clampedValue);
    
    // If adjusting volume from zero while muted, unmute
    if (clampedValue > 0 && isMuted) {
      setIsMuted(false);
    }
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  return {
    audioRef,
    selectedTrack,
    isPlaying,
    togglePlay,
    selectTrack,
    volume,
    changeVolume,
    isMuted,
    toggleMute,
  };
};