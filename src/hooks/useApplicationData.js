// Custom hook to get helper and state functions into Application.jsx

import React, { useEffect, useReducer } from 'react';
import axios from 'axios';

const reducer = (state, action) => {
  const { days, appointments, interviewers } = action.val;

  // This async function runs when updateOnSocketMessage is dispatched.
  // It takes "data" as an argument, which is the data object returned from the socket
  // const fetchUpdatedData = async (data, response) => {
  //   let temp = { ...state.appointments[data.id] };
  //   temp.interview = data.interview;
  //   const newAppointments = { ...state.appointments, [data.id]: temp }
  //   const newDays = response.data;
  //   return { newAppointments, newDays };
  // };

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
    // case 'updateOnSocketMessage':
    //   const { newAppointments, newDays } = fetchUpdatedData(action.val.data, action.val.response);
    //   return { ...state, appointments: newAppointments, days: newDays };
  };
};



const useApplicationData = () => {
  
  const [state, dispatch] = useReducer(reducer, {
    day: 'Monday',
    days: [],
    appointments: [],
    interviewers: []
  });
  // useEffect to get data on first page load

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

  // Function which alters the state so the interview is inserted (or removed, if null) at the chosen id
  const updateInterviews = async (id, interview) => {
    console.log('Current state is: ', state);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const response = await axios.get('/api/days');
    const newDays = response.data;
    dispatch({
      type: 'appointmentChange',
      val: {
        appointments, days: newDays
      }
    });
  }

  // Web Sockets
  useEffect(() => {
    const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
    console.log(socket.protocol);
    socket.onopen = () => {
      socket.send('ping');
    };
    socket.onmessage = event => {
      console.log(`Message Received: ${event.data}`);
      const data = JSON.parse(event.data);
      if (data === "pong") {
        socket.send('pang');
      }

      // Asynchronously update pages when someone else books or deletes an appointment
      if (data.type === 'SET_INTERVIEW') {
        if (data.interview === null) {
          updateInterviews(data.id, null);
        } else {
          updateInterviews(data.id, data.interview);
        }
      };
    };
  }, []);

  const setDay = (val) => {
    return dispatch({ type: 'setDay', val });
  };

  // Usable for creating or editing interview appointments. "Interview" is the new interview object which is added to or replaces the existing
  // interview in an appointment slot.
  const bookInterview = (id, interview) => {

    async function trySaving() {
      console.log('Booking timeslot ' + id + ' for an interview as follows: ', interview);
      const didSaveSucceed = await axios.put(`/api/appointments/${id}`, {
        interview
      });

      // Update the state via the reducer
      await updateInterviews(id, interview);
      return didSaveSucceed;
    };
    return trySaving();
  };

  // Usable for deleting appointments. id of appointment to be deleted, and isMyUpdate is a boolean - true if user is deleting an interview, false
  // if the interview was deleted by someone else and the client was notified via websocket
  const cancelInterview = (id) => {
    async function tryCancelling() {
      console.log(`Cancelling interview in timeslot ${id}`);
      const didCancelSucceed = await axios.delete(`/api/appointments/${id}`);
      // Update the state via the reducer
      await updateInterviews(id, null);
      return didCancelSucceed;
    };
    return tryCancelling();
  };



  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;