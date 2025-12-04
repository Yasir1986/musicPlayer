import * as React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Player from "./Player";

// Mock functions for the required props
const mockTogglePlay = jest.fn();
const mockChangeVolume = jest.fn();
const mockToggleMute = jest.fn();

test("renders audio element", () => {
  const audioRef = React.createRef<HTMLAudioElement>();
  
  const { getByTestId } = render(
    <Player 
      audioRef={audioRef}
      selectedTrack={null}
      isPlaying={false}
      togglePlay={mockTogglePlay}
      volume={0.7}
      changeVolume={mockChangeVolume}
      isMuted={false}
      toggleMute={mockToggleMute}
    />
  );
  
  expect(getByTestId("audio-element")).toBeInTheDocument();
});

// Additional tests you might want:
test("shows 'No Track Selected' when no track is selected", () => {
  const audioRef = React.createRef<HTMLAudioElement>();
  
  const { getByText } = render(
    <Player 
      audioRef={audioRef}
      selectedTrack={null}
      isPlaying={false}
      togglePlay={mockTogglePlay}
      volume={0.7}
      changeVolume={mockChangeVolume}
      isMuted={false}
      toggleMute={mockToggleMute}
    />
  );
  
  expect(getByText("No Track Selected")).toBeInTheDocument();
});

test("shows track name when track is selected", () => {
  const audioRef = React.createRef<HTMLAudioElement>();
  
  const { getByText } = render(
    <Player 
      audioRef={audioRef}
      selectedTrack="/path/to/song.mp3"
      isPlaying={false}
      togglePlay={mockTogglePlay}
      volume={0.7}
      changeVolume={mockChangeVolume}
      isMuted={false}
      toggleMute={mockToggleMute}
    />
  );
  
  expect(getByText("song.mp3")).toBeInTheDocument();
});

test("play button is disabled when no track is selected", () => {
  const audioRef = React.createRef<HTMLAudioElement>();
  
  const { getByText } = render(
    <Player 
      audioRef={audioRef}
      selectedTrack={null}
      isPlaying={false}
      togglePlay={mockTogglePlay}
      volume={0.7}
      changeVolume={mockChangeVolume}
      isMuted={false}
      toggleMute={mockToggleMute}
    />
  );
  
  const playButton = getByText("▶️ Play");
  expect(playButton).toBeDisabled();
});

test("mute button is disabled when no track is selected", () => {
  const audioRef = React.createRef<HTMLAudioElement>();
  
  const { getByText } = render(
    <Player 
      audioRef={audioRef}
      selectedTrack={null}
      isPlaying={false}
      togglePlay={mockTogglePlay}
      volume={0.7}
      changeVolume={mockChangeVolume}
      isMuted={false}
      toggleMute={mockToggleMute}
    />
  );
  
  const muteButton = getByText("🔊");
  expect(muteButton).toBeDisabled();
});