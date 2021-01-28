import React from "react";

export default function Button(props) {
  function click() {
    props.buttonClicked();
  }
  return (
    <div className="btn" onClick={click}>
      <p className="button">{props.name}</p>
    </div>
  );
}
