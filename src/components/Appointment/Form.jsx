import React, { useState } from 'react';
import './styles.scss';
import InterviewerList from '../InterviewerList';
import Button from '../Button';

const AppointmentForm = (props) => {
  const currentName = (props.name) || '';
  const currentInterviewer = (props.interviewer) || 0;
  const [name, setName] = useState(currentName);
  const [interviewer, setInterviewer] = useState(currentInterviewer);
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
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
        <InterviewerList interviewers={props.interviewers} interviewer={interviewer}
         setInterviewer={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={props.onSave} confirm>Save</Button>
          <Button onClick={props.onCancel} danger>Cancel</Button>
        </section>
      </section>
    </main>
  );
};

export default AppointmentForm;