import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import PlayPauseButton from "./PlayPauseButton";

test("renders Play when not playing", () => {
  const { getByText } = render(
    <PlayPauseButton isPlaying={false} toggle={() => {}} />
  );
  expect(getByText("Play")).toBeInTheDocument();
});

test("renders Pause when playing", () => {
  const { getByText } = render(
    <PlayPauseButton isPlaying={true} toggle={() => {}} />
  );
  expect(getByText("Pause")).toBeInTheDocument();
});

test("calls toggle when clicked", () => {
  const toggle = jest.fn();
  const { getByTestId } = render(
    <PlayPauseButton isPlaying={false} toggle={toggle} />
  );

  fireEvent.click(getByTestId("playpause"));
  expect(toggle).toHaveBeenCalledTimes(1);
});
