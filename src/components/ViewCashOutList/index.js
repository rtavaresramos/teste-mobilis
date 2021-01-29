import React, { useState, useEffect } from "react";

import TableRow from "../TableRow";
import AddNewRegister from "../AddNewRegister";
import Delete from "../Delete";

import firebase from "../../firebase";

import "./styles.css";

export default function ViewCashOutList(props) {
  const [cashOut, setCashOut] = useState();
  const [edit, setEdit] = useState();
  const [remove, setRemove] = useState();

  useEffect(() => {
    let items = [];

    const ref = firebase.database().ref(`users/${props.userId}/cashOut`);
    ref.on("value", (data) => {
      const values = data.val();

      if (values !== undefined && values !== null) {
        items = Object.keys(values).map((i) => values[i]);

        return setCashOut(
          props.searchText
            ? items.filter(
                (data) =>
                  data.description
                    .toLowerCase()
                    .includes(props.searchText.toLowerCase()) ||
                  data.tag
                    .toLowerCase()
                    .includes(props.searchText.toLowerCase()) ||
                  data.value
                    .toLowerCase()
                    .includes(props.searchText.toLowerCase())
              )
            : items
        );
      }
    });
  }, [props.searchText]);

  function openEditModal(evt) {
    setEdit(evt);
    setRemove(false);
  }

  function openRemoveModal(evt) {
    setRemove(evt);
    setEdit(false);
  }

  function closeEditionModal() {
    setEdit(false);
  }

  function closeRemoveModal() {
    setRemove(false);
  }
  function checkArray() {
    if (cashOut.length - 1 === 0) {
      setCashOut([]);
    }
  }
  return (
    <div className="view-list">
      <table className="table">
        <thead>
          <tr>
            <th title="Name">Descrição</th>
            <th title="Email">Tag</th>
            <th title="Action">Valor</th>
            <th title="Action">Ação</th>
          </tr>
        </thead>
        <tbody>
          {cashOut
            ? cashOut.map((item) => {
                return (
                  <TableRow
                    data={item}
                    route="cashOut"
                    changeRemove={openRemoveModal}
                    changeEdit={openEditModal}
                  />
                );
              })
            : ""}
        </tbody>
      </table>
      {cashOut && cashOut.length < 1 ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h3
            style={{
              textAlign: "center",
              margin: "10px 0",
              color: "var(--text-color)",
            }}
          >
            Não há dados
          </h3>
        </div>
      ) : (
        <></>
      )}
      <div>
        {edit ? (
          <AddNewRegister
            close={closeEditionModal}
            route="cashOut"
            edit={edit}
          />
        ) : (
          <></>
        )}
      </div>
      <div>
        {remove ? (
          <Delete
            close={closeRemoveModal}
            route="cashOut"
            className="overlay"
            remove={remove}
            userId={props.userId}
            checkArray={checkArray}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
