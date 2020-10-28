import React, { useState, useEffect } from "react";
import DayList from './DayList.jsx';
import Appointment from './Appointment';
import axios from 'axios';

// Databases
import appointments from './timeslots-db';
// import days from './days-db';
import interviewers from './interviewers-db';

import "components/Application.scss";

export default function Application(props) {

  const theState = useState('Monday');
  const day = theState[0];
  const setDay = theState[1];
  const [days, setDays] = useState([]);

  useEffect(() => {
    const fetchData = async function () {
      const result = await axios.get('/api/days');
      setDays(result.data);
    }
    fetchData();
  }, []);

  const list_of_appointments = appointments.map((timeslot) => {
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
            days={days}
            day={day}
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
