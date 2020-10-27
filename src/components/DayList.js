import React from "react";
import DayListItem from './DayListItem';

const DayList = (props) => {
  const content = props.days.map((d) => {
    return (<DayListItem name={d.name} spots={d.spots} selected={d.name === props.day} setDay={props.setDay} />);
  });
  return (
    <>
      <ul>
        {content}
      </ul>
    </>
  )
};

export default DayList;