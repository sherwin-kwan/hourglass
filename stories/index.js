import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import "index.scss";

import Button from "components/Button.jsx";
import DayListItem from "components/DayListItem.jsx";
import DayList from 'components/DayList.jsx';
import days from 'components/days-db';
import InterviewerListItem from 'components/InterviewerListItem.jsx';
import InterviewerList from 'components/InterviewerList.jsx';
import Appointment from 'components/Appointment'; /* Why doesn't this work?? */
import AppointmentHeader from 'components/Appointment/Header';
import AppointmentEmpty from 'components/Appointment/Empty';
import AppointmentShow from 'components/Appointment/Show';
import AppointmentConfirm from 'components/Appointment/Confirm';
import AppointmentStatus from 'components/Appointment/Status';
import AppointmentError from 'components/Appointment/Error';
import AppointmentForm from 'components/Appointment/Form';
import interviewers from 'components/interviewers-db';

storiesOf("Button", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Base", () => <Button>Base</Button>)
  .add("Test", () => <Button />)
  .add("Confirm", () => <Button confirm>Confirm</Button>)
  .add("Danger", () => <Button danger>Cancel</Button>)
  .add("Clickable", () => (
    <Button onClick={action("button-clicked")}>Clickable</Button>
  ))
  .add("Disabled", () => (
    <Button disabled onClick={action("button-clicked")}>
      Disabled
    </Button>
  ));

storiesOf("DayListItem", module) //Initiates Storybook and registers our DayListItem component
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  }) // Provides the default background color for our component
  .add("Unselected", () => <DayListItem name="Monday" spots={5} />) // To define our stories, we call add() once for each of our test states to generate a story
  .add("Selected", () => <DayListItem name="Monday" spots={5} selected />)
  .add("Full", () => <DayListItem name="Monday" spots={0} />)
  .add("Clickable", () => (
    <DayListItem name="Tuesday" setDay={action("setDay")} spots={5} /> // action() allows us to create a callback that appears in the actions panel when clicked
  ));

// Day List - whole menu


storiesOf("DayList", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }],
  })
  .add("Monday", () => (
    <DayList days={days} day={"Monday"} setDay={action("setDay")} />
  ))
  .add("Tuesday", () => (
    <DayList days={days} day={"Tuesday"} setDay={action("setDay")} />
  ));

// Interviewer list

const interviewer = {
  id: 1,
  name: "Sylvia Palmer",
  avatar: "https://i.imgur.com/LpaY82x.png"
};

storiesOf("InterviewerListItem", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Unselected", () => (
    <InterviewerListItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
    />
  ))
  .add("Selected", () => (
    <InterviewerListItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected
    />
  ))
  .add("Clickable", () => (
    <InterviewerListItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      setInterviewer={event => action("setInterviewer")(interviewer.id)}
    />
  ));


// Interviewer List Stories


storiesOf("InterviewerList", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Initial", () => (
    <InterviewerList
      interviewers={interviewers}
      setInterviewer={action("setInterviewer")}
    />
  ))
  .add("Preselected", () => (
    <InterviewerList
      interviewers={interviewers}
      interviewer={3}
      setInterviewer={action("setInterviewer")}
    />
  ));

// appointments stories

storiesOf('Appointment Components', module)
  .addParameters({
    backgrounds: [{ name: "white", value: "#fff", default: true }]
  })
  .add("Appointment", () => <Appointment />)
  .add('Appointment with time', () => <Appointment
    time='12'
  />)
  .add("Header", () => {
    return <AppointmentHeader time='12pm' />
  })
  .add("Empty", () => (
    <AppointmentEmpty onAdd={action("onAdd")} />
  ))
  .add("Show", () => (
    <AppointmentShow onEdit={action('Someone clicked Edit!!')} onDelete={action('You clicked Delete!!')}
      student='Jane Doe' interviewer='Chen Xiaoming' />
  ))
  .add("Confirm", () => (
    <AppointmentConfirm message='Really delete this appointment?' onConfirm={action('You just signed your life away!')}
      onCancel={action('You backed off!')} />
  ))
  .add("Delete", () => (
    <AppointmentStatus message='Deleting' />
  ))
  .add("Save", () => (
    <AppointmentStatus message='Saving' />
  ))
  .add("Error", () => (
    <AppointmentError message="These are not the droids you're looking for" onClose={action("you clicked the good ol' X")} />
  ))
  .add("Form - Create App", () => (
    < AppointmentForm interviewers={interviewers} onSave={action('Save')} onCancel={action('Cancel')} />
  ))
  .add("Form - Edit App", () => (
    < AppointmentForm interviewers={interviewers} name='James' interviewer={3} onSave={action('Save')} onCancel={action('Cancel')} />
  ))

storiesOf('Appointments', module)
  .addParameters({
    backgrounds: [{ name: "white", value: "#fff", default: true }]
  })
  .add("Appointment Empty", () => (
    <>
      <Appointment id={1} interview={{ student: "Lydia Miller-Jones", interviewer: "Sylvia" }} time="12pm" />
      <Appointment id="last" time="1pm" />
      <Appointment id="aa" time="2pm" />
    </>
  ))
