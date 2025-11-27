import { useAudioPlayer } from "./hooks/useAudioPlayer";
import TrackList from "./components/TrackList/TrackList";
import Player from "./components/Player/Player";
import PlayPauseButton from "./components/PlayPauseButton/PlayPauseButton";
import "./App.css";

const App = () => {
  const { audioRef, selectedTrack, isPlaying, togglePlay, selectTrack } = useAudioPlayer();

  return (
    <div className="app-container">
      <aside className="tracklist-container">
        <h2>Tracks</h2>
        <TrackList selected={selectedTrack} onTrackSelect={selectTrack} />
      </aside>

      <main className="player-area">
                 
        <Player audioRef={audioRef} selectedTrack={selectedTrack} />
        <div className="controls">
          <PlayPauseButton isPlaying={isPlaying} toggle={togglePlay} />
        </div>
      </main>
    </div>
  );
};

export default App;
