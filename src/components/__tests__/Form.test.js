import React from "react";

import { render, cleanup, fireEvent, getByPlaceholderText, getByTestId } from "@testing-library/react";

import AppointmentForm from "../Appointment/Form.jsx";

afterEach(cleanup);

describe('Appointment form', () => {
  const interviewers = [
    {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];


  it("renders without student name if not provided", () => {
    const { getByPlaceholderText } = render(<AppointmentForm
      interviewers={interviewers}
    />);
    expect(getByPlaceholderText("Enter your name")).toHaveValue("");
  });

  it("renders with initial student name", () => {
    const { getByTestId } = render(<AppointmentForm
      interviewers={interviewers}
      name={'Lydia Miller-Jones'}
    />);
    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });

  it("validates that the student name is not blank, but validation disappears once name is entered", () => {

    /* 1. Create the mock onSave function */
    const onSave = jest.fn(() => {
      console.log('Save clicked');
    });

    /* 2. Render the Form with interviewers and the onSave mock function passed as an onSave prop, the name prop should be blank or undefined */
    const { getByText, getByPlaceholderText, queryByText } = render(<AppointmentForm
      onSave={onSave}
      interviewers={interviewers}
      name={''}
    />)

    /* 3. Click the save button */
    fireEvent.click(getByText("Save"));

    /* 1. validation is shown */
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();

    /* 2. onSave is not called */
    expect(onSave).not.toHaveBeenCalled();

    // Next, test if it is possible to enter a name, save, and cancel the message
    fireEvent.change(getByPlaceholderText("Enter your name"), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByText("Save"));

    expect(queryByText(/student name cannot be blank/i)).toBeNull();

    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", 0);
  });

  it("calls onCancel and resets the input field", () => {
    const onCancel = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <AppointmentForm
        interviewers={interviewers}
        name="Lydia Mill-Jones"
        onSave={jest.fn()}
        onCancel={onCancel}
      />
    );
  
    fireEvent.click(getByText("Save"));
  
    fireEvent.change(getByPlaceholderText("Enter your name"), {
      target: { value: "Lydia Miller-Jones" }
    });
  
    fireEvent.click(getByText("Cancel"));
  
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
  
    expect(getByPlaceholderText("Enter your name")).toHaveValue("");
  
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
}); 
