

// Selectors to process data from the API into the format we want (like what could be done on the back end with a query)

export const getAppointmentsForDay = (state, day) => {
  //... returns an array of appointments for that day
  const { days, appointments } = state;
  if (days.length === 0 || !appointments.length === 0) {
    return [];
  }
  const thisDay = days.filter(d => d.name === day);
  if (thisDay.length === 0) return [];
  console.log('this day is ', thisDay);
  return Object.values(appointments).filter(app => thisDay[0].appointments.includes(app.id));
};

// Join the data from the interviewers API to the appointments API, nesting interviewer within the object for an appointment
export const getInterview = (state, interview) => {
  const interviewersArray = Object.values(state.interviewers);
  if (interview) {
    const interviewerObject = interviewersArray.filter((person) => person.id = interview.interviewer)[0];
    return Object.assign(interview, {
      interviewer: interviewerObject
    })
  } else {
    return null;
  }
};