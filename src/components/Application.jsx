import React from "react";
import DayList from './DayList.jsx';
import Appointment from './Appointment';
import useApplicationData from 'hooks/useApplicationData';

import "components/Application.scss";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors.js";

export default function Application(props) {

  const { state, setDay, bookInterview, cancelInterview } = useApplicationData();

  const filteredAppointments = getAppointmentsForDay(state, state.day);
  const list_of_appointments = filteredAppointments.map((timeslot) => {
    return (
      <Appointment
        key={timeslot.id}
        id={timeslot.id}
        time={timeslot.time}
        interview={getInterview(state, timeslot.interview)}
        bookInterview={bookInterview}
        onDelete={() => cancelInterview(timeslot.id, true)}
        interviewers={getInterviewersForDay(state, state.day)} />
    );
  })

  return (
    <main className="layout">
      <section className="sidebar">
        <span>
          <img
            className="cover"
            src="https://upload.wikimedia.org/wikipedia/commons/9/9e/Half-hour_sand_glass_MET_ES268.jpg"
            alt="Hourglass"
          />
          <h1>Hourglass</h1>
        </span>
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
