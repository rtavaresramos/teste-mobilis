import React, { useState } from "react";

import AddNewRegister from "../AddNewRegister";
import Delete from "../Delete";

import Trash from "../icons/Trash";
import Edit from "../icons/Edit";

import "./styles.css";

export default function CashInList() {
  const [listBySearch, setListBySearch] = useState([]);
  const [edit, setEdit] = useState(false);
  const [remove, setRemove] = useState(false);

  function setEditItem(evt) {
    setEdit(evt);
  }

  function setRemoveItem(evt) {
    setRemove(evt);
  }

  function closeEditionModal() {
    setEdit(false);
  }

  function closeRemoveModal() {
    setRemove(false);
  }

  return (
    <div className="view-list">
      <table className="table">
        <thead>
          <tr>
            <th title="Name">Descrição</th>
            <th title="Email">Origem</th>
            <th title="Action">Valor</th>
            <th title="Action">Ação</th>
          </tr>
        </thead>
        <tbody>
          {listBySearch.map((item) => {
            return (
              <tr key="item.id">
                <td>{item.description}</td>
                <td>{item.origin}</td>
                <td>
                  {parseFloat(item.value).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </td>
                <td className="d-flex justify-between align-center">
                  <a
                    href="#"
                    className="list-action-icon"
                    onClick={setEditItem(item)}
                  >
                    <Edit />
                  </a>

                  <a
                    href="#"
                    className="list-action-icon"
                    onClick={setRemoveItem(item)}
                  >
                    <Trash />
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {listBySearch.length < 1 ? (
        <div style={{display: "flex", justifyContent: "center"}}>
          <h3 style={{textAlign: "center", margin:"10px 0", color: "var(--text-color)" }}>
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
            className="overlay"
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
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
