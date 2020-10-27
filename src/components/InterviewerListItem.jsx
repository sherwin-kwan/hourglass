import React from 'react';
import classnames from 'classnames';
import './InterviewerListItem.scss';

// Props include: name, avatar, selected, setInterviewer
const InterviewerListItem = (props) => {
  const liClass = classnames('interviewers__item', {'interviewers__item--selected': props.selected});
  return (<>
    <li key={props.id} className={liClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar} 
        alt={props.name}
      />
    {props.selected && props.name}
    </li></>
  );
};

export default InterviewerListItem;