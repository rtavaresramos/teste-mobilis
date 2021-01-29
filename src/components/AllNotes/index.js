import React, { useState, useEffect } from "react";

import firebase from "../../firebase";

import Note from "../Note";

import "./styles.css";

export default function AllNotes(props) {
  const [allNotes, setAllNotes] = useState();

  useEffect(() => {
    let notes = [];

    const ref = firebase.database().ref(`users/${props.userInfo.uid}/notes`);
    ref.on("value", (data) => {
      const values = data.val();

      if (values !== undefined && values !== null) {
        notes = Object.keys(values).map((i) => values[i]);
        return setAllNotes(notes);
      }
    });
  }, []);

  function checkArray() {
    if (allNotes.length - 1 === 0) {
      setAllNotes([]);
    }
  }

  return (
    <div>
      {allNotes
        ? allNotes.map((data) => (
            <div className="links-item">
              <Note
                key={data.id}
                data={data}
                userId={props.userInfo.uid}
                checkArray={checkArray}
              />
            </div>
          ))
        : ""}
    </div>
  );
}
