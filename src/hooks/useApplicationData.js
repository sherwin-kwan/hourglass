// Custom hook to get helper and state functions into Application.jsx

import React, { useEffect, useReducer } from 'react';
import axios from 'axios';

const reducer = (state, action) => {
  const { days, appointments, interviewers } = action.val;

  switch (action.type) {
    case 'loadData':
      return { ...state, days, appointments, interviewers };
    case 'setDay':
      return { ...state, day: action.val };
    case 'appointmentChange':
      return { ...state, appointments, days };
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

  // Changing days
  const setDay = (val) => {
    return dispatch({ type: 'setDay', val });
  };

  // Function which alters the state so the interview is inserted (or removed, if null) at the chosen id
  const updateInterviews = async (id, interview) => {
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

  // Usable for creating or editing interview appointments. "Interview" is the new interview object which is added to or replaces the existing
  // interview in an appointment slot.
  const bookInterview = (id, interview) => {

    async function trySaving() {
      const didSaveSucceed = await axios.put(`/api/appointments/${id}`, {
        interview
      });

      // Update the state via the reducer
      await updateInterviews(id, interview);
      return didSaveSucceed;
    };
    return trySaving();
  };

  // Usable for deleting appointments. id of appointment to be deleted
  const cancelInterview = (id) => {
    async function tryCancelling() {
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