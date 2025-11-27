export type UseAudioPlayerReturn = {
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
  selectedTrack: string | null;
  isPlaying: boolean;
  togglePlay: () => void;
  selectTrack: (track: string) => void;
};
