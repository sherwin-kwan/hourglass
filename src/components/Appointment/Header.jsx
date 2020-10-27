import React from 'react';
import './styles.scss';

const AppointmentHeader = (props) => {
  return (<header className="appointment__time">
    <h4 className="text--semi-bold">{props.time}</h4>
    <hr className="appointment__separator" />
  </header>);
};

export default AppointmentHeader;