export type PlayerProps = {
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
  selectedTrack: string | null;
};