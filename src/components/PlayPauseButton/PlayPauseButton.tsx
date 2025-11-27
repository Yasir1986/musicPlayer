import { PlayPauseButtonProps } from "./PlayPauseButton.types";

const PlayPauseButton = ({ toggle, isPlaying }: PlayPauseButtonProps) => (
  <button onClick={toggle} data-testid="playpause">
    {isPlaying ? "Pause" : "Play"}
  </button>
);

export default PlayPauseButton;
