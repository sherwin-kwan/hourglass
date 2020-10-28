import React, { useState, useEffect } from "react";
import DayList from './DayList.jsx';
import Appointment from './Appointment';
import axios from 'axios';

// Databases
// import appointments from './timeslots-db';
// import days from './days-db';
// import interviewers from './interviewers-db';

import "components/Application.scss";
import getAppointmentsForDay from "helpers/selectors.js";

export default function Application(props) {

  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: []
  });

  const setDay = (val) => {
    return setState(prev => {
      return Object.assign({}, prev, {day: val} );
    });
  };

  const filteredAppointments = getAppointmentsForDay(state, state.day);
  console.log(filteredAppointments);

  useEffect(() => {
    const fetchData = async function () {
      const daysResult = await axios.get('/api/days');
      const appointmentsResult = await axios.get('/api/appointments');
      setState(prev => {
        return Object.assign({}, prev, {days: daysResult.data, appointments: appointmentsResult.data})
      })
    };
    fetchData();
  }, []);

  const list_of_appointments = filteredAppointments.map((timeslot) => {
    return (
      <Appointment key={timeslot.id} {...timeslot} />
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
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
      </section>
    </main>
  );
}
