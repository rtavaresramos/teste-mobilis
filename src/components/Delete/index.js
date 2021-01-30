import React, { useRef, useEffect } from "react";
import firebase from "../../firebase";

import Button from "../Button";

import "./styles.css";

export default function Delete(props) {
  const deleteRef = useRef();

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    // eslint-disable-next-line
  }, []);

  const handleClick = (e) => {
    if (deleteRef.current.contains(e.target)) {
      return;
    } else {
      document.removeEventListener("mousedown", handleClick);
      props.closeModal();
    }
  };
  function closeModal() {
    props.close();
  }

  function deleteData() {
    props.checkArray();
    const ref = firebase.database().ref(`users/${props.userId}/${props.route}`);
    ref.child(props.remove.id).remove();

    props.close();
  }

  return (
    <div className="links">
      <div
        style={{
          background: "var(--background)",
          borderRadius: "8px",
          padding: "8px",
        }}
        className="delete-box"
        ref={deleteRef}
      >
        <h6>
          Você está excluindo essa informação de forma definitiva.
          <br />
          Deseja continuar?
        </h6>
        <div className="button-place">
          <Button name="Cancelar" cancel buttonClicked={closeModal} />

          <Button name="Continuar" buttonClicked={deleteData} />
        </div>
      </div>
    </div>
  );
}
