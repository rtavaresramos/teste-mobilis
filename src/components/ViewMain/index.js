import React from "react";
import SearchBar from "../SearchBar";

export default function ViewMain() {
  function getTextFromSearch(evt) {
    console.log(evt);
  }

  return (
    <div className="view-main-container">
      <SearchBar emitText={getTextFromSearch} />

      <div v-if="view.dashboard" className="view-dashboard">
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
    </div>
  );
}
