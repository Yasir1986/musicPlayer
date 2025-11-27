import Track from "../Track/Track";
import { TrackListProps } from "./TrackListtypes";

const tracks = [
  { name: "Battle of the Dragons", file: "/battle-of-the-dragons.mp3" },
  { name: "Forest Lullaby", file: "/forest-lullaby.mp3" },
  { name: "Sedative", file: "/sedative.mp3" },
];

const TrackList = ({ selected, onTrackSelect }: TrackListProps) => (
  <div>
    {tracks.map((t) => (
      <Track
        key={t.file}
        name={t.name}
        isSelected={selected === t.file}
        onSelect={() => onTrackSelect(t.file)}
      />
    ))}
  </div>
);

export default TrackList;
