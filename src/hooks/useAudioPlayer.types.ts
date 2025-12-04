export interface AudioPlayerReturn {
  audioRef: React.RefObject<HTMLAudioElement>;
  selectedTrack: string | null;
  isPlaying: boolean;
  togglePlay: () => void;
  selectTrack: (track: string) => void;
  volume: number;
  changeVolume: (value: number) => void;
  isMuted: boolean;
  toggleMute: () => void;
}