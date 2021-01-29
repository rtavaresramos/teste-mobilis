import React, { useState, useEffect } from "react";

import TableRow from "../TableRow";
import AddNewRegister from "../AddNewRegister";
import Delete from "../Delete";

import firebase from "../../firebase";

import "./styles.css";

export default function ViewCashInList(props) {
  const [cashIn, setCashIn] = useState();
  const [edit, setEdit] = useState();
  const [remove, setRemove] = useState();

  useEffect(() => {
    let items = [];

    const ref = firebase.database().ref(`users/${props.userId}/cashIn`);
    ref.on("value", (data) => {
      const values = data.val();

      if (values !== undefined && values !== null) {
        items = Object.keys(values).map((i) => values[i]);
        return setCashIn(
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
    // eslint-disable-next-line
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
    if (cashIn.length - 1 === 0) {
      setCashIn([]);
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
          {cashIn
            ? cashIn.map((item) => {
                return (
                  <TableRow
                    data={item}
                    route="cashIn"
                    changeRemove={openRemoveModal}
                    changeEdit={openEditModal}
                  />
                );
              })
            : ""}
        </tbody>
      </table>
      {cashIn && cashIn.length < 1 ? (
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
      {!cashIn ? (
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
            route="cashIn"
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
            route="cashIn"
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
