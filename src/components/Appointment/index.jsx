import React from 'react';
import './styles.scss';
import AppointmentHeader from './Header.jsx';
import AppointmentShow from './Show.jsx';
import AppointmentEmpty from './Empty.jsx';
import AppointmentForm from './Form.jsx';
import useVisualMode from 'hooks/useVisualMode';
import interviewers from '../interviewers-db';
import { getInterviewersForDay } from 'helpers/selectors';



const Appointment = (props) => {

  const create = 'CREATE';
  const empty = 'EMPTY';
  const show = 'SHOW';


  const { mode, transition, back } = useVisualMode((props.interview) ? (show) : (empty));

  return (
    <article className="appointment">
      <AppointmentHeader time={props.time} />
      { mode === empty && <AppointmentEmpty onAdd={() => transition(create)} />}
      {
        mode === show && (
          <AppointmentShow
            student={props.interview.student}
            interviewer={props.interview.interviewer.name}
          />
        )
      }
      {
        mode === create && (
          <AppointmentForm 
            name = 'Samuel L. Jackson'
            interviewers = {props.interviewers}
            interviewer = {props.interviewer}
            onSave = {() => console.log('This is how saving happens!')}
            onCancel = {back}
          />
        )
      }

    </article>);
};

export default Appointment;