import { useAudioPlayer } from "./hooks/useAudioPlayer";
import TrackList from "./components/TrackList/TrackList";
import Player from "./components/Player/Player";
import "./App.css";

const App = () => {
  const audioPlayer = useAudioPlayer();

  return (
    <div className="app-container">
      <aside className="tracklist-container">
        <h2>Tracks</h2>
        <TrackList 
          selected={audioPlayer.selectedTrack} 
          onTrackSelect={audioPlayer.selectTrack} 
        />
      </aside>

      <main className="player-area">
        <Player {...audioPlayer} />
      </main>
    </div>
  );
};

export default App;