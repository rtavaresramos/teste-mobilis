import React from "react";

export default function Button(props) {
  function buttonClicked() {
    props.buttonClicked();
  }
  return (
    <div class="btn" onClick={buttonClicked}>
      <p class="button">{props.name}</p>
    </div>
  );
}
