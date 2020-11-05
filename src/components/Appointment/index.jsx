import React, { useEffect } from 'react';
import './styles.scss';
import AppointmentHeader from './Header.jsx';
import AppointmentShow from './Show.jsx';
import AppointmentEmpty from './Empty.jsx';
import AppointmentForm from './Form.jsx';
import AppointmentStatus from './Status.jsx';
import AppointmentError from './Error.jsx';
import AppointmentConfirm from './Confirm.jsx';
import useVisualMode from 'hooks/useVisualMode';

const Appointment = (props) => {

  const confirm = 'CONFIRM';
  const create = 'CREATE';
  const deleting = 'DELETE';
  const edit = 'EDIT';
  const errorDelete = 'ERROR_DELETE';
  const errorSave = 'ERROR_SAVE';
  const empty = 'EMPTY';
  const saving = 'SAVE';
  const show = 'SHOW';

  const { mode, transition, back } = useVisualMode((props.interview) ? (show) : (empty));

  async function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    try {
      transition(saving);
      const didSaveSucceed = await props.bookInterview(props.id, interview, true);
      transition(show, true);
    } catch (err) {
      console.log(err);
      transition(errorSave, true);
    };
  };

  async function deleteThis() {
    try {
      transition(deleting, true);
      const didCancelSucceed = await props.onDelete();
      transition(empty, true);
    } catch (err) {
      console.log(err);
      transition(errorDelete, true);
    };
  };
   
  return (
    <article className="appointment"  data-testid="appointment">
      <AppointmentHeader time={props.time} />
      { mode === empty && <AppointmentEmpty onAdd={() => transition(create)} />}
      {
        mode === show && props.interview && (
          <AppointmentShow
            student={props.interview.student}
            interviewer={props.interview.interviewer.name}
            onEdit={() => transition(edit)}
            onDelete={() => transition(confirm)}
          />
        )
      }
      {
        mode === create && (
          <AppointmentForm
            name='Samuel L. Jackson'
            interviewers={props.interviewers}
            interviewer={props.interviewer}
            onSave={save}
            onCancel={back}
          />
        )
      }
      {
        mode === edit && (
          <AppointmentForm
            name={props.interview.student}
            interviewers={props.interviewers}
            interviewer={props.interview.interviewer.id}
            onSave={save}
            onCancel={back} />
        )
      }
      {
        mode === saving && (
          <AppointmentStatus message="Saving" />
        )
      }
      {
        mode === confirm && (
          <AppointmentConfirm message="Really cancel this interview?" onConfirm={deleteThis} onCancel={back} onConfirmText="Yes" onCancelText="No" />
        )
      }
      {
        mode === deleting && (
          <AppointmentStatus message="Cancelling" />
        )
      }
      {
        mode === errorSave && (
          <AppointmentError onClose={back} message="Sorry, could not save. Please try again later." />
        )
      }
      {
        mode === errorDelete && (
          <AppointmentError onClose={back} message="Sorry, could not cancel. Please try again later." />
        )
      }

    </article>);
};

export default Appointment;