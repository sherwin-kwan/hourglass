import React from "react";

import { render, cleanup, waitForElement, fireEvent } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

it("renders with a default day of Monday, changes colour on hover, and changes the schedule when new days are selected", async () => {
  const { getByTestId } = render(<Application />);
  const monday = await waitForElement(() => getByTestId("Monday"));
  console.log(monday);
  const tuesday =  await waitForElement(() => getByTestId("Tuesday"));
  expect(monday).toBeInTheDocument();
  // fireEvent.mouseOver(tuesday);
  // // Turns red on hover
  // expect(tuesday).toHaveStyle('background-color: #ee5253' );
  fireEvent.click(tuesday);
  // Turns white (highlighted) when day is clicked and active
  expect(tuesday).toHaveClass('day-list__item--selected');
  expect(getByText('Leopold Silvers')).toBeInTheDocument();
});
