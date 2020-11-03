import React from 'react';
import './InterviewerList.scss';
import InterviewerListItem from './InterviewerListItem.jsx';
import PropTypes from 'prop-types';

// Props include: interviewers [array], interviewer, setInterviewer

const InterviewerList = (props) => {
  const listToCreate = props.interviewers.map((person) => {
    return <InterviewerListItem id={person.id} key={person.id} avatar={person.avatar} name={person.name}
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

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired,
  interviewer: PropTypes.number,
  setInterviewer: PropTypes.func
};



export default InterviewerList;