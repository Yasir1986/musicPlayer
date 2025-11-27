import { TrackProps } from "./Track.types";
import "./Track.css";

const Track = ({ name, isSelected, onSelect }: TrackProps) => (
  <div
    className={`track-item ${isSelected ? "selected" : ""}`}
    onClick={onSelect}
    data-testid="track"
  >
    {name}
  </div>
);

export default Track;
