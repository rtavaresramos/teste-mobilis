import React from "react";

export default function Select(props) {
  function selectionEmit(evt) {
    props.selected(evt);
  }
  return (
    <div class="select">
      <select
        v-model="selected"
        name="slct"
        id="slct"
        onChange={selectionEmit}
        disabled={props.disabled}
      >
        <option value="" selected disabled hidden>
          <h2>Selecione {props.select}</h2>
        </option>
        {props.options &&
          props.options.map((data) => {
            return (
              <option key={data} value={data}>
                {data}
              </option>
            );
          })}
      </select>
    </div>
  );
}
