import React from 'react';
import classnames from 'classnames';
import './InterviewerListItem.scss';

const InterviewerListItem = (props) => {
  const liClass = classnames('interviewers__item', {'interviewers__item--selected': props.selected});
  return (
    <li className={liClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar} 
        alt="Sylvia Palmer"
      />
    {props.selected && 'Sylvia Palmer'}
    </li>
  );
};

export default InterviewerListItem;