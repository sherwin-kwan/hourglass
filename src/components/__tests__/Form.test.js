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

  xit("validates that the student name is not blank", () => {

    /* 1. Create the mock onSave function */
    const onSave = jest.fn(() => {
      console.log('Save clicked');
    });

    /* 2. Render the Form with interviewers and the onSave mock function passed as an onSave prop, the name prop should be blank or undefined */
    const { getByText } = render(<AppointmentForm
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
  });

  xit("calls onSave function when the name is defined", () => {

    const onSave = jest.fn((name, interviewer) => {
      console.log(`Saved, ${name} booked with interviewer no. ${interviewer}`);
    });

    const { queryByText } = render(<AppointmentForm
      name='Lydia Miller-Jones'
      interviewers={interviewers}
      onSave={onSave}
    />);
    fireEvent.click(queryByText("Save"));

    /* 3. validation is not shown */
    expect(queryByText(/student name cannot be blank/i)).toBeNull();

    /* 4. onSave is called once*/
    expect(onSave).toHaveBeenCalledTimes(1);

    /* 5. onSave is called with the correct arguments */
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", 0);
  });

  it("submits the name entered by the user", () => {
    const onSave = jest.fn();
    const { getByText, getByPlaceholderText } = render(
      <AppointmentForm interviewers={interviewers} onSave={onSave} />
    );

    const input = getByPlaceholderText("Enter your name");

    fireEvent.change(input, { target: { value: "Lydia Miller-Jones" } });
    fireEvent.click(getByText("Save"));

    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", 0);
  });

})