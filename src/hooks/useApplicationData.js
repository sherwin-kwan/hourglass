// Custom hook to get helper and state functions into Application.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const useApplicationData = () => {

  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: [],
    interviewers: []
  });

  useEffect(() => {
    const fetchData = async function () {
      const daysResult = await axios.get('/api/days');
      const appointmentsResult = await axios.get('/api/appointments');
      const interviewersResult = await axios.get('/api/interviewers');
      // console.log('an appointment object looks like: ', appointmentsResult.data[1]);
      // console.log('an interviewer object looks like: ', interviewersResult.data[1]);
      setState(prev => {
        return Object.assign({}, prev, { days: daysResult.data, appointments: appointmentsResult.data, interviewers: interviewersResult.data })
      })
    };
    fetchData();
  }, []);

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
  };

  

  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;