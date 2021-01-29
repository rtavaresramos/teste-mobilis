import React from "react";

export default function Button(props) {
  function click() {
    props.buttonClicked();
  }
  return (
    <div className={`btn ${props.cancel ? 'cancel-button':''}`} onClick={click}>
      <p className={`button ${props.cancel ? 'cancel-button':''}`}>{props.name}</p>
    </div>
  );
}
