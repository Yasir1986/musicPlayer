import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TrackList from "./TrackList";

test("renders all tracks", () => {
  const { getAllByTestId } = render(
    <TrackList selected={null} onTrackSelect={() => {}} />
  );

  expect(getAllByTestId("track").length).toBe(3);
});

test("selects a track when clicked", () => {
  const onTrackSelect = jest.fn();
  const { getAllByTestId } = render(
    <TrackList selected={null} onTrackSelect={onTrackSelect} />
  );

  fireEvent.click(getAllByTestId("track")[0]);
  expect(onTrackSelect).toHaveBeenCalledTimes(1);
});
