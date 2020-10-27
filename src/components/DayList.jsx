import React from "react";
import DayListItem from './DayListItem.jsx';

const DayList = (props) => {
  const content = props.days.map((d) => {
    return (<DayListItem name={d.name} spots={d.spots} selected={d.name === props.day} setDay={(event) => {props.setDay(d.name)}} />);
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