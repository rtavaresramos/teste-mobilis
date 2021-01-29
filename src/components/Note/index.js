import React, { useState } from "react";
import firebase from "../../firebase";
import Trash from "../icons/Trash";

export default function Note(props) {
  const [checkValue, setCheckValue] = useState(props.data.isCompleted);
  function removeNote() {
    props.checkArray();
    const ref = firebase.database().ref(`users/${props.userId}/notes`);
    ref.child(props.data.id).remove();
  }

  function setCompleted() {
    const ref = firebase.database().ref(`users/${props.userId}/notes`);
    ref.child(props.data.id).update({
      isCompleted: !checkValue,
    });
    setCheckValue(!checkValue);
  }
  return (
    <div className="notes-list">
      <input
        type="checkbox"
        id="todo"
        checked={checkValue}
        onChange={setCompleted}
      />
      <p className={checkValue ? "line-trough" : ""}>{props.data.name}</p>
      <Trash trashClicked={removeNote} />
    </div>
  );
}
