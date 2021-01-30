import React from "react";
import firebase from "../../firebase";

import Button from "../Button";

import "./styles.css";

export default function Delete(props) {
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
