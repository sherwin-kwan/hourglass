import React from 'react';
import './styles.scss';
import AppointmentHeader from './Header.jsx';
import AppointmentShow from './Show.jsx';
import AppointmentEmpty from './Empty.jsx';
import AppointmentForm from './Form.jsx';
import AppointmentStatus from './Status.jsx';
import AppointmentError from './Error.jsx';
import AppointmentConfirm from './Confirm.jsx';
import useVisualMode from 'hooks/useVisualMode';
import interviewers from '../interviewers-db';
import { getInterviewersForDay } from 'helpers/selectors';



const Appointment = (props) => {

  const confirm = 'CONFIRM';
  const create = 'CREATE';
  const deleting = 'DELETING';
  const error = 'ERROR';
  const empty = 'EMPTY';
  const saving = 'SAVING';
  const show = 'SHOW';

  const { mode, transition, back } = useVisualMode((props.interview) ? (show) : (empty));

  async function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    try {
      transition(saving);
      const didSaveSucceed = await props.bookInterview(props.id, interview);
      transition(show, true);
    } catch (err) {
      transition(error, true);
    };
  };

  async function deleteThis() {
    try {
      transition(deleting);
      const didCancelSucceed = await props.onDelete();
      transition(empty, true);
    } catch (err) {
      transition(error, true);
    };
  };
  

  return (
    <article className="appointment">
      <AppointmentHeader time={props.time} />
      { mode === empty && <AppointmentEmpty onAdd={() => transition(create)} />}
      {
        mode === show && (
          <AppointmentShow
            student={props.interview.student}
            interviewer={props.interview.interviewer.name}
            onEdit={console.log('Editing')}
            onDelete={() => transition(confirm)}
          />
        )
      }
      {
        mode === create && (
          <AppointmentForm 
            name = 'Samuel L. Jackson'
            interviewers = {props.interviewers}
            interviewer = {props.interviewer}
            onSave = {save}
            onCancel = {back}
          />
        )
      }
      {
        mode === saving && (
          <AppointmentStatus message="Saving" />
        )
      }
      {
        mode === confirm && (
          <AppointmentConfirm message="Really cancel this interview?" onConfirm={deleteThis} onCancel={back} />
        )
      }
      {
        mode === deleting && (
          <AppointmentStatus message="Deleting" />
        )
      }
      {
        mode === error && (
          <AppointmentError onClose={console.log('Close')} message="Error" />
        )
      }

    </article>);
};

export default Appointment;