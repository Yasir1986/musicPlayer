import { useRef, useState, useEffect } from "react";

export const useAudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(new Audio());
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Play/pause or restart audio when selectedTrack or isPlaying changes
  useEffect(() => {
    if (!selectedTrack) return;

    // Update src if new track
    if (audioRef.current.src !== selectedTrack) {
      audioRef.current.src = selectedTrack;
      audioRef.current.currentTime = 0;
    }

    // Play or pause according to state
    if (isPlaying) {
      audioRef.current.play().catch(() => {
        // If play fails, revert to paused state
        setIsPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [selectedTrack, isPlaying]);

  const togglePlay = () => {
    if (!selectedTrack) return;
    setIsPlaying(prev => !prev);
  };

  const selectTrack = (track: string) => {
    const currentlyPlaying = isPlaying;
    setSelectedTrack(track);
    // Maintain play/pause state
    setIsPlaying(currentlyPlaying);
  };

  return {
    audioRef,
    selectedTrack,
    isPlaying,
    togglePlay,
    selectTrack,
  };
};