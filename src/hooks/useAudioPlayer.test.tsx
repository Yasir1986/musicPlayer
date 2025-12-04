import { renderHook, act } from "@testing-library/react";
import { useAudioPlayer } from "./useAudioPlayer";

beforeAll(() => {
  Object.defineProperty(HTMLMediaElement.prototype, "play", {
    configurable: true,
    value: jest.fn().mockImplementation(() => Promise.resolve()),
  });
  Object.defineProperty(HTMLMediaElement.prototype, "pause", {
    configurable: true,
    value: jest.fn(),
  });
});

describe("useAudioPlayer hook", () => {
  test("initial state is correct", () => {
    const { result } = renderHook(() => useAudioPlayer());
    expect(result.current.selectedTrack).toBe(null);
    expect(result.current.isPlaying).toBe(false);
  });

  test("selectTrack updates selectedTrack without auto-play", () => {
    const { result } = renderHook(() => useAudioPlayer());
    act(() => result.current.selectTrack("/track1.mp3"));
    expect(result.current.selectedTrack).toBe("/track1.mp3");
    expect(result.current.isPlaying).toBe(false);
  });

  test("togglePlay starts and stops playback", async () => {
    const { result } = renderHook(() => useAudioPlayer());
    act(() => result.current.selectTrack("/track1.mp3"));

    // Start playing
    await act(async () => result.current.togglePlay());
    expect(result.current.isPlaying).toBe(true);

    // Pause
    act(() => result.current.togglePlay());
    expect(result.current.isPlaying).toBe(false);
  });

  test("selecting a new track while paused does NOT auto-play", () => {
    const { result } = renderHook(() => useAudioPlayer());
    act(() => result.current.selectTrack("/track1.mp3"));
    act(() => result.current.selectTrack("/track2.mp3"));
    expect(result.current.selectedTrack).toBe("/track2.mp3");
    expect(result.current.isPlaying).toBe(false);
  });

  test("selecting a new track while playing auto-plays", async () => {
    const { result } = renderHook(() => useAudioPlayer());
    act(() => result.current.selectTrack("/track1.mp3"));

    // Start playing
    await act(async () => result.current.togglePlay());
    expect(result.current.isPlaying).toBe(true);

    // Switch track
    await act(async () => result.current.selectTrack("/track2.mp3"));
    expect(result.current.selectedTrack).toBe("/track2.mp3");
    expect(result.current.isPlaying).toBe(true);
  });
});
