import React from "react";

import "components/Button.scss";
import classnames from "classnames";

export default function Button(props) {
  const theClass = classnames('button', {'button--confirm': props.confirm}, {'button--danger': props.danger});
  const disabledStatus = (props.disabled) ? 'disabled' : null;
  console.log('disabled status is', disabledStatus);
  return (
    <button className={theClass} disabled={props.disabled} onClick={props.onClick}>{props.children}</button>
   );
};