import React from 'react';
import './InterviewerList.scss';
import InterviewerListItem from './InterviewerListItem';

// Props include: interviewers [array], interviewer, setInterviewer

const InterviewerList = (props) => {
  const listToCreate = props.interviewers.map((person) => {
    return <InterviewerListItem id={person.id} avatar={person.avatar} name={person.name}
    selected={person.id === props.interviewer} setInterviewer={(e) => props.setInterviewer(person.id)} />
  })
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {listToCreate}
      </ul>
    </section>
    );
};

export default InterviewerList;