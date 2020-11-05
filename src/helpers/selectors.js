

// Selectors to process data from the API into the format we want (like what could be done on the back end with a query)

export const getAppointmentsForDay = (state, day) => {
  //... returns an array of appointments for that day
  // an appointment object contains: id, time, interview object {interviewerID, student}
  const { days, appointments } = state;
  if (days.length === 0 || appointments.length === 0) {
    return [];
  }
  const thisDay = days.find(d => d.name === day);
  if (!thisDay) return [];
  return Object.values(appointments).filter(app => thisDay.appointments.includes(app.id));
};

export const getInterviewersForDay = (state, day) => {
  // ... returns an array of interviewers available on that day
  // an interviewer object contains: id, name, avatar
  const { days, interviewers } = state;
  if (days.length === 0 || interviewers.length === 0) {
    return [];
  }
  const thisDay = days.find(d => d.name === day);
  if (!thisDay) return [];
  const interviewerArray = Object.values(interviewers).filter(person => thisDay.interviewers.includes(person.id));
  return interviewerArray;
}

// Join the data from the interviewers API to the appointments API, nesting interviewer within the object for an appointment
export const getInterview = (state, interview) => {
  const interviewersArray = Object.values(state.interviewers);
  if (interview) {
    const interviewerObject = interviewersArray.find((person) => person.id === interview.interviewer);
    return {
      ...interview,
      interviewer: interviewerObject
    }
  } else {
    // If this timeslot is empty, interview will be null (a falsy value)
    console.log('interview not found');
    return null;
  }
};