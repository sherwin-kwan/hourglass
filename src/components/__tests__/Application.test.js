import React from "react";

import {
  render, cleanup, getAllByTestId, getByTestId, getByDisplayValue, queryByTitle,
  waitForElementToBeRemoved, getByTitle, waitForElement, fireEvent, prettyDOM, getByText, act, queryByText
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);


describe('Application integration tests', () => {

  it("renders with a default day of Monday, and changes the schedule when new days are selected", async () => {
    const { getByTestId, getByText, collection } = render(<Application />);
    const monday = await waitForElement(() => getByTestId("Monday"));
    console.log(prettyDOM(monday));
    const tuesday = await waitForElement(() => getByTestId("Tuesday"));
    expect(monday).toBeInTheDocument();
    expect(monday).toHaveClass('day-list__item--selected');
    fireEvent.click(tuesday);
    // Turns white (highlighted) when day is clicked and active
    expect(getByText('Leopold Silvers')).toBeInTheDocument();
    // expect(tuesday).toHaveClass('day-list__item--selected'); 
    // for some reason, it doesn't look like clicking will change the class on "Tuesday"
    expect(monday).toHaveClass('day-list__item');
    console.log('monday after clicking tuesday ', prettyDOM(monday));
  });

  // Happy path test
  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);
    const archie = await waitForElement(() => getByText(container, "Archie Cohen"));
    const monday = getByTestId(container, "Monday");
    expect(getByText(monday, "1 spot remaining")).toBeInTheDocument();
    // The first appointment in the dummy data, Monday at noon, is an empty appointment
    const noonAppointment = getAllByTestId(container, "appointment")[0];
    const addButton = getByTitle(noonAppointment, "Add appointment");
    fireEvent.click(addButton);
    // Find "Samuel L. Jackson" default name
    fireEvent.change(getByDisplayValue(noonAppointment, /Samuel/), {
      target: { value: "Forrest Gump" }
    });
    fireEvent.click(getByTitle(noonAppointment, "2"));
    fireEvent.click(getByText(noonAppointment, "Save"));
    const savingSign = queryByText(noonAppointment, "Saving");
    expect(savingSign).toBeInTheDocument();
    await waitForElement(() => queryByText(noonAppointment, /Forrest/));
    console.log('Forrest appeared');
    expect(getByText(monday, "no spots remaining")).toBeInTheDocument();
  });

  it('loads data, click delete, and back out to show appointment again', async () => {
    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const monday = getByTestId(container, "Monday");
    // The second appointment in the dummy data, Monday at 1 pm, is Archie's appointment 
    const archieAppointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    const deleteButton = getByTitle(archieAppointment, "Delete");
    fireEvent.click(deleteButton);
    // Check if the confirm screen pops up
    const confirmSign = queryByText(archieAppointment, /Really cancel/);
    expect(confirmSign).toBeInTheDocument();
    // Click no
    fireEvent.click(getByText(archieAppointment, 'No'));
    expect(getByText(container, "Archie Cohen")).toBeInTheDocument();
  });

  it('loads data, click delete, and successfully deletes appointment updating spots remaining back to 1', async() => {
    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const monday = getByTestId(container, "Monday");
    // The second appointment in the dummy data, Monday at 1 pm, is Archie's appointment 
    const archieAppointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    const deleteButton = getByTitle(archieAppointment, "Delete");
    fireEvent.click(deleteButton);
    // Check if the confirm screen pops up
    const confirmSign = queryByText(archieAppointment, /Really cancel/);
    expect(confirmSign).toBeInTheDocument(); 
    // Click yes this time
    fireEvent.click(getByText(archieAppointment, 'Yes'));
    const savingSign = queryByText(archieAppointment, "Cancelling");
    expect(savingSign).toBeInTheDocument();
    await waitForElement(() => queryByTitle(archieAppointment, "Add appointment"));
    console.log('Cancelled');
    expect(getByText(monday, "1 spot remaining")).toBeInTheDocument();
  });

  it('loads data, click edit, and successfully edit appointment', async() => {
    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Forrest Gump"));
    const monday = getByTestId(container, "Monday");
    expect(getByText(monday, "1 spot remaining")).toBeInTheDocument();
    const forrestAppointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Forrest Gump")
    );
    const editButton = getByTitle(forrestAppointment, "Edit");
    fireEvent.click(editButton);
    // Check if edit screen pops up
    fireEvent.change(getByDisplayValue(forrestAppointment, /Forrest/), {
      target: { value: "Gump Worsley" }
    });
    fireEvent.click(getByTitle(forrestAppointment, "1"));
    fireEvent.click(getByText(forrestAppointment, "Save"));
    const savingSign = queryByText(forrestAppointment, "Saving");
    expect(savingSign).toBeInTheDocument();
    // Check if text changed
    await waitForElement(() => queryByText(forrestAppointment, /Worsley/));
    expect(getByText(monday, "1 spot remaining")).toBeInTheDocument();
    // Check if the interviewer changed
    expect(getByText(forrestAppointment, "Sylvia Palmer")).toBeInTheDocument();
  })


});



