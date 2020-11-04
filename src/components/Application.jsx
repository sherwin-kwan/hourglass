import React from "react";
import DayList from './DayList.jsx';
import Appointment from './Appointment';
import useApplicationData from 'hooks/useApplicationData';

// Databases
// import appointments from './timeslots-db';
// import days from './days-db';
// import interviewers from './interviewers-db';

import "components/Application.scss";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors.js";

export default function Application(props) {

  const {state, setDay, bookInterview, cancelInterview} = useApplicationData();

  const filteredAppointments = getAppointmentsForDay(state, state.day);
  console.log('Re-rendering the page');
  const list_of_appointments = filteredAppointments.map((timeslot) => {
    console.log('Re-rendering appointments', filteredAppointments);
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
