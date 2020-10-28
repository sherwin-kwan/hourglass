import React from 'react';
import './styles.scss';
import AppointmentHeader from './Header.jsx';
import AppointmentShow from './Show.jsx';
import AppointmentEmpty from './Empty.jsx';

const Appointment = (props) => {
  const body = (props.interview) ? <AppointmentShow candidate={props.interview.candidate} interviewer={props.interview.interviewer.name} /> 
  : <AppointmentEmpty />;
  return (
    <article className="appointment">
      <AppointmentHeader time={props.time} />
      {body}
    </article>);
};

export default Appointment;