import * as React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Player from "./Player";

test("renders audio element", () => {
  const audioRef = React.createRef<HTMLAudioElement>();
  const { getByTestId } = render(<Player audioRef={audioRef} selectedTrack={null} />);
  expect(getByTestId("audio-element")).toBeInTheDocument();
});