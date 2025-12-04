import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Track from "./Track";

test("renders track name", () => {
  const { getByText } = render(
    <Track name="Test Track" isSelected={false} onSelect={() => {}} />
  );
  expect(getByText("Test Track")).toBeInTheDocument();
});

test("calls onSelect when clicked", () => {
  const onSelect = jest.fn();
  const { getByTestId } = render(
    <Track name="Test Track" isSelected={false} onSelect={onSelect} />
  );

  fireEvent.click(getByTestId("track"));
  expect(onSelect).toHaveBeenCalledTimes(1);
});
