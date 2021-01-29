import React, { useState } from "react";
import SearchBar from "../SearchBar";
import ViewCashInList from "../ViewCashInList";
import ViewCashOutList from "../ViewCashOutList";
import Dashboard from "../Dashboard";

import "./styles.css";

export default function ViewMain(props) {
  const [searchText, setSearchText] = useState();
  function getTextFromSearch(evt) {
    setSearchText(evt);
  }

  return (
    <div className="view-main-container">
      <SearchBar emitText={getTextFromSearch} />

      {props.view === "dashboard" && <Dashboard userId={props.userInfo.uid} />}
      {props.view === "cashIn" && (
        <div className="view-main">
          <div className="header">
            <h4 className="title">Receitas</h4>
          </div>
          <ViewCashInList
            filterBy={searchText}
            userId={props.userInfo.uid}
            searchText={searchText}
          />
        </div>
      )}

      {props.view === "cashOut" && (
        <div className="view-main">
          <div className="header">
            <h4 className="title">Despesas</h4>
          </div>
          <ViewCashOutList
            filterBy={searchText}
            userId={props.userInfo.uid}
            searchText={searchText}
          />
        </div>
      )}
    </div>
  );
}
