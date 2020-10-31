// Custom hook to get helper and state functions into Application.jsx

import React, { useEffect, useReducer } from 'react';
import axios from 'axios';

const useApplicationData = () => {

  const reducer = (state, action) => {
    const { days, appointments, interviewers } = action.val;
    // console.log('Days are: ', days);
    // console.log('Appointments are: ', appointments);
    // console.log('Interviewers are: ', interviewers);
    switch (action.type) {
      case 'loadData':
        return { ...state, days, appointments, interviewers };
      case 'setDay':
        return { ...state, day: action.val };
      case 'appointmentChange':
        return { ...state, appointments, days };
    };
  };


  const [state, dispatch] = useReducer(reducer, {
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
      dispatch({
        type: 'loadData', val: {
          days: daysResult.data,
          appointments: appointmentsResult.data,
          interviewers: interviewersResult.data
        }
      })
    };
    fetchData();
  }, []);

  // Web Sockets
  useEffect(() => {
    const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
    console.log(socket.protocol);
    socket.onopen = () => {
      socket.send('ping');
    };
    socket.onmessage = event => {
      console.log(`Message Received: ${event.data}`);
      if (JSON.parse(event.data) === "pong") {
        socket.send('pang');
      }
    };
  }, []);

  const setDay = (val) => {
    return dispatch({ type: 'setDay', val });
  };

  // const updateSpotsRemaining = async (id, isCreating) => {
  //   // Set the new number of spots remaining
  //   const dayIndex = state.days.findIndex(d => d.appointments.includes(id));
  //   const spots = (isCreating) ? state.days[dayIndex].spots - 1 : state.days[dayIndex2].spots + 1;
  //   const newDay = { ...state.days[dayIndex], spots };
  //   console.log('by incrementing: ', newDay);
  //   const newDays = [...state.days];
  //   newDays[dayIndex] = newDay;
  //   return newDays;
  // }

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
      const response = await axios.get('/api/days')
      const newDays = response.data;
      dispatch({
        type: 'appointmentChange',
        val: {
          appointments, days: newDays
        }
      });
      return didSaveSucceed;
    };
    return trySaving();
  };

  function cancelInterview(id) {
    console.log(`Cancelling interview in timeslot ${id}`);
    async function tryCancelling() {
      const didCancelSucceed = await axios.delete(`/api/appointments/${id}`);
      // console.log('didcancelsucceed? ', didCancelSucceed);
      let temp = state.appointments[id];
      temp.interview = null;
      const newAppointments = { ...state.appointments, [id]: temp }
      const response = await axios.get('/api/days')
      const newDays = response.data;
      dispatch({
        type: 'appointmentChange',
        val: {
          appointments: newAppointments,
          days: newDays
        }
      });
      return didCancelSucceed;
    };
    return tryCancelling();
  };



  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;