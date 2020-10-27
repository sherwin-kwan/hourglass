import React from "react";
import "components/DayListItem.scss";
import classnames from 'classnames';

export default function DayListItem(props) {
  const itemClass = classnames('day-list__item', {'day-list__item--selected': props.selected}, {'day-list__item--full': !(props.spots)});
  const first = (props.spots === 0) ? 'no' : props.spots;
  const second = (props.spots === 1) ? 'spot' : 'spots';
  return (
    <li className={itemClass} onClick={() => {props.setDay(props.name)}}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{first} {second} remaining</h3>
    </li>
  );
};