import React from "react";

import Trash from "../icons/Trash";
import Edit from "../icons/Edit";

export default function TableRow(props) {
  function editItem() {
    props.changeEdit(props.data);
  }
  function removeItem() {
    props.changeRemove(props.data);
  }

  return (
    <>
      <tr key="props.data.id">
        <td className="description">{props.data.description}</td>
        <td>{props.data.tag}</td>
        <td>{props.data.value}</td>
        <td className="d-flex justify-between align-center">
          <p className="list-action-icon" onClick={editItem}>
            <Edit />
          </p>

          <p className="list-action-icon">
            <Trash trashClicked={removeItem} />
          </p>
        </td>
      </tr>
    </>
  );
}
