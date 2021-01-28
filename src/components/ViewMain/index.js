import React, {useState} from "react";
import SearchBar from "../SearchBar";
import ViewCashInList from "../ViewCashInList";
import ViewCashOutList from "../ViewCashOutList";

export default function ViewMain(props) {
  const [searchText, setSearchText] = useState()
  function getTextFromSearch(evt) {
    setSearchText(evt);
  }

  return (
    <div className="view-main-container">
      <SearchBar emitText={getTextFromSearch} />

      {props.view === "dashboard" && (
        <div className="view-dashboard">
          <div className="header">
            <h4 className="title">Dashboard</h4>
          </div>
          <div className="main">
            <div className="main-calendar">
              <div className="cards-place">Board 1</div>
            </div>
            <div className="main-sections">
              <div className="section-1">
                <p>Board 2</p>
              </div>
              <div className="section-2">
                <p>Board 3</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {props.view === "cashIn" && (
        <div className="view-main">
          <div className="header">
            <h4 className="title">Receitas</h4>
          </div>
          <ViewCashInList filterBy={searchText} />
        </div>
      )}

      {props.view === "cashOut" && (
        <div className="view-main">
          <div className="header">
            <h4 className="title">Despesas</h4>
          </div>
          <ViewCashOutList filterBy={searchText} />
        </div>
      )}
    </div>
  );
}
