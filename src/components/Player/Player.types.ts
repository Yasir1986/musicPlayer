export interface PlayerProps {
  audioRef: React.RefObject<HTMLAudioElement>;
  selectedTrack: string | null;
  isPlaying: boolean;
  togglePlay: () => void;
  volume: number;
  changeVolume: (value: number) => void;
  isMuted: boolean;
  toggleMute: () => void;
}