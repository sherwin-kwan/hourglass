import React, { useState } from 'react';
import './styles.scss';
import InterviewerList from '../InterviewerList';
import Button from '../Button';

// Form has the props: name, interviewer (an ID), interviewers (a list of interviewers), onSave (a function to submit an appointment request)
// onCancel (a function to go back)
// Interviewer is only present with using the form to edit, not create
const AppointmentForm = (props) => {
  const currentName = (props.name) || '';
  const currentInterviewer = (props.interviewer) || 0;
  const [name, setName] = useState(currentName);
  const [interviewer, setInterviewer] = useState(currentInterviewer);

  const reset = () => {
    setName(''); setInterviewer(0);
  };

  const cancel = () => {
    reset();
    props.onCancel();
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off"  onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            value={name}
            placeholder='Enter your name'
            onChange={(change) => setName(change.target.value)}
          /*
            This must be a controlled component
          */
          />
        </form>
        <InterviewerList interviewers={props.interviewers} interviewer={currentInterviewer}
         setInterviewer={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={props.onSave} confirm>Save</Button>
          <Button onClick={cancel} danger>Cancel</Button>
        </section>
      </section>
    </main>
  );
};

export default AppointmentForm;