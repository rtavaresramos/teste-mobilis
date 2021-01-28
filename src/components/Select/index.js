import React from "react";

import "./styles.css"

export default function Select(props) {
  function selectionEmit(evt) {
    console.log(evt.target.value);
  }
  return (
    <div class="select">
      <select
        name="slct"
        id="slct"
        onChange={selectionEmit}
      >
        {props.options &&
          props.options.map((data) => {
            return (
              <option key={data.id} value={data.id}>
                {data.name}
              </option>
            );
          })}
      </select>
    </div>
  );
}
