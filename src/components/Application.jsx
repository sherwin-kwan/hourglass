import React, { useState, useEffect } from "react";
import DayList from './DayList.jsx';
import Appointment from './Appointment';
import axios from 'axios';

// Databases
// import appointments from './timeslots-db';
// import days from './days-db';
import interviewers from './interviewers-db';

import "components/Application.scss";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors.js";

export default function Application(props) {

  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: [],
    interviewers: []
  });

  const setDay = (val) => {
    return setState(prev => {
      return Object.assign({}, prev, { day: val });
    });
  };

  // Usable for creating or editing interview appointments. "Interview" is the new interview object which is added to or replaces the existing
  // interview in an appointment slot
  function bookInterview(id, interview) {
    console.log('Booking timeslot ' + id + ' for an interview as follows: ', interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    async function trySaving() {
      const didSaveSucceed = await axios.put(`/api/appointments/${id}`, {
        interview
      });
      console.log('didsavesucceed? ', didSaveSucceed);
      setState({ ...state, appointments });
      return didSaveSucceed;
    };
    return trySaving();
  };

  function cancelInterview(id) {
    console.log(`Cancelling interview in timeslot ${id}`);
    async function tryCancelling() {
      const didCancelSucceed = await axios.delete(`/api/appointments/${id}`);
      console.log('didcancelsucceed? ', didCancelSucceed);
      let temp = state.appointments[id];
      temp.interview = null;
      const newAppointments = {...state.appointments, [id]: temp}
      setState({...state, newAppointments});
      return didCancelSucceed;
    };
    return tryCancelling();
  }


  const filteredAppointments = getAppointmentsForDay(state, state.day);
  console.log(filteredAppointments);

  useEffect(() => {
    const fetchData = async function () {
      const daysResult = await axios.get('/api/days');
      const appointmentsResult = await axios.get('/api/appointments');
      const interviewersResult = await axios.get('/api/interviewers');
      console.log('an appointment object looks like: ', appointmentsResult.data[1]);
      console.log('an interviewer object looks like: ', interviewersResult.data[1]);
      setState(prev => {
        return Object.assign({}, prev, { days: daysResult.data, appointments: appointmentsResult.data, interviewers: interviewersResult.data })
      })
    };
    fetchData();
  }, []);

  const list_of_appointments = filteredAppointments.map((timeslot) => {
    return (
      <Appointment
        key={timeslot.id}
        id={timeslot.id}
        time={timeslot.time}
        interview={getInterview(state, timeslot.interview)}
        bookInterview={bookInterview}
        onDelete={() => cancelInterview(timeslot.id)}
        interviewers={getInterviewersForDay(state, state.day)} />
    );
  })
  return (
    <main className="layout">
      <section className="sidebar"><img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            key={state.day}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />

      </section>
      <section className="schedule">
        {list_of_appointments}
      </section>
    </main>
  );
}
