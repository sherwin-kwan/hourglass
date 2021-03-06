import React from 'react';
import './styles.scss';

const AppointmentEmpty = (props) => {
  return (
    <main className="appointment__add">
      <img
        className="appointment__add-button"
        src="images/add.png"
        title="Add appointment"
        alt="Add"
        onClick={props.onAdd}
      />
    </main>
  );
};

export default AppointmentEmpty;