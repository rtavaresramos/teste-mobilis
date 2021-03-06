import React from "react";

import "./styles.css";
export default function SearchBar(props) {
  function emitSearchText(evt) {
    props.emitText(evt.target.value);
  }
  return (
    <div className="search-bar">
      <div className="icon">
        <svg
          width="21"
          height="21"
          viewBox="0 0 21 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.8394 5.55595C16.1268 7.84337 16.1268 11.552 13.8394 13.8394C11.552 16.1268 7.84337 16.1268 5.55595 13.8394C3.26853 11.552 3.26853 7.84337 5.55595 5.55595C7.84337 3.26854 11.552 3.26854 13.8394 5.55595Z"
            stroke="#AAB8C6"
            stroke-width="2"
          />
          <path d="M13.469 13.469L20 20" stroke="#AAB8C6" stroke-width="2" />
        </svg>
      </div>
      <input
        type="text"
        name="search"
        placeholder="Encontre na lista de Receitas ou Despesa um registro em específico"
        id="search"
        onChange={emitSearchText}
      />
    </div>
  );
}
