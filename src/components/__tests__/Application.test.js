import React from "react";

import {
  render, cleanup, getAllByTestId, getByTestId, getByDisplayValue, queryByTitle,
  waitForElementToBeRemoved, getByTitle, waitForElement, fireEvent, prettyDOM, getByText, act, queryByText
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

import axios from "axios";

describe('Application integration tests', () => {

  it("renders with a default day of Monday, and changes the schedule when new days are selected", async () => {
    const { getByTestId, getByText, collection } = render(<Application />);
    const monday = await waitForElement(() => getByTestId("Monday"));
    const tuesday = await waitForElement(() => getByTestId("Tuesday"));
    expect(monday).toBeInTheDocument();
    expect(monday).toHaveClass('day-list__item--selected');

    // Click Tuesday
    fireEvent.click(tuesday);
    expect(getByText('Leopold Silvers')).toBeInTheDocument();
    expect(getByTestId("Tuesday")).toHaveClass('day-list__item--selected');
  });

  // Happy path test
  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);
    const archie = await waitForElement(() => getByText(container, "Archie Cohen"));
    const monday = getByTestId(container, "Monday");
    expect(getByText(monday, "1 spot remaining")).toBeInTheDocument();

    // The first appointment in the dummy data, Monday at noon, is an empty appointment
    const noonAppointment = getAllByTestId(container, "appointment")[0];

    // Find the add button
    const addButton = getByTitle(noonAppointment, "Add appointment");
    fireEvent.click(addButton);

    // Find "Samuel L. Jackson" default name and change it to "Forrest Gump"
    fireEvent.change(getByDisplayValue(noonAppointment, /Samuel/), {
      target: { value: "Forrest Gump" }
    });

    // Choose an interviewer
    fireEvent.click(getByTitle(noonAppointment, "2"));

    // Save
    fireEvent.click(getByText(noonAppointment, "Save"));
    const savingSign = queryByText(noonAppointment, "Saving");
    expect(savingSign).toBeInTheDocument();
    await waitForElement(() => queryByText(noonAppointment, /Forrest/));
    console.log('Forrest appeared');
    expect(getByText(monday, "no spots remaining")).toBeInTheDocument();
  });

  it('loads data, click delete, and back out to show appointment again', async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    // The second appointment in the dummy data, Monday at 1 pm, is Archie's appointment 
    const archieAppointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    // Click delete
    const deleteButton = getByTitle(archieAppointment, "Delete");
    fireEvent.click(deleteButton);

    // Check if the confirm screen pops up
    const confirmSign = queryByText(archieAppointment, /Really cancel/);
    expect(confirmSign).toBeInTheDocument();

    // Click no, go back to Archie's appointment
    fireEvent.click(getByText(archieAppointment, 'No'));
    expect(getByText(container, "Archie Cohen")).toBeInTheDocument();
  });

  it('loads data, click delete, have it fail once on error, and then successfully delete appointment updating spots remaining back to 1', async () => {
    axios.delete.mockRejectedValueOnce();

    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const monday = getByTestId(container, "Monday");

    // The second appointment in the dummy data, Monday at 1 pm, is Archie's appointment 
    const archieAppointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    // Delete
    const deleteButton = getByTitle(archieAppointment, "Delete");
    fireEvent.click(deleteButton);

    // Check if the confirm screen pops up
    expect(getByText(archieAppointment, /Really cancel/)).toBeInTheDocument();

    // Click yes this time
    fireEvent.click(getByText(archieAppointment, 'Yes'));
    const savingSign = queryByText(archieAppointment, "Cancelling");
    expect(savingSign).toBeInTheDocument();

    // Wait for error
    await waitForElement(() => getByText(container, /Error/));
    const backButton = getByTitle(container, "Close");
    fireEvent.click(backButton);

    // Go back and try deleting again
    const archieAppointment2 = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    const deleteButton2 = getByTitle(archieAppointment, "Delete");
    fireEvent.click(deleteButton2);

    // Check if the confirm screen pops up again
    expect(getByText(archieAppointment, /Really cancel/)).toBeInTheDocument();

    // Click yes this time
    fireEvent.click(getByText(archieAppointment, 'Yes'));
    expect(queryByText(archieAppointment, "Cancelling")).toBeInTheDocument();
    
    // Now element should delete, wait for the add button to return
    await waitForElement(() => getByTitle(container, "Add appointment"));
    console.log('Cancelled');
    expect(getByText(monday, "1 spot remaining")).toBeInTheDocument();
  });

  it('loads data, click edit, have it fail once and display error, then successfully edit appointment', async () => {

    axios.put.mockRejectedValueOnce();

    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Forrest Gump"));
    const monday = getByTestId(container, "Monday");
    expect(getByText(monday, "1 spot remaining")).toBeInTheDocument();

    // Find the Forrest appointment created previously
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

    // Wait for error
    await waitForElement(() => getByText(container, /Error/));
    const backButton = getByTitle(container, "Close");
    fireEvent.click(backButton);

    // Go back and try to save again. After mocking error the first time, this should go through
    expect(forrestAppointment).toBeInTheDocument();
    fireEvent.change(getByDisplayValue(forrestAppointment, /Forrest/), {
      target: { value: "Gump Worsley" }
    });
    fireEvent.click(getByTitle(forrestAppointment, "1"));
    fireEvent.click(getByText(forrestAppointment, "Save"));
    expect(queryByText(forrestAppointment,"Saving")).toBeInTheDocument();

    // Check if text changed
    await waitForElement(() => getByText(forrestAppointment, /Worsley/));
    expect(getByText(monday, "1 spot remaining")).toBeInTheDocument();

    // Check if the interviewer changed
    expect(getByText(forrestAppointment, "Sylvia Palmer")).toBeInTheDocument();
  })
});



