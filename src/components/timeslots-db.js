import interviewers from './interviewers-db';

const appointments = [
  {
    id: 1,
    time: "12pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: interviewers[0]
    }
  },
  {
    id: 2,
    time: "1pm"
  },
  {
    id: 3,
    time: "2pm",
    interview: {
      student: "Bob Marley",
      interviewer: interviewers[2]
    }
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Snoop Dogg",
      interviewer: interviewers[3]
    }
  },  
  {
    id: 5,
    time: "4pm",
    interview: {
      student: "Ryan Tedder",
      interviewer: interviewers[1]
    }
  },
  {
    id: 'last',
    time: "5pm",
  }
];

export default appointments;