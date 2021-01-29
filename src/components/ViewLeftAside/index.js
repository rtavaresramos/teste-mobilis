import React, { useState, useEffect } from "react";
import Logo from "../../assets/img/mobilis-logo.png";
import Plus from "../icons/Plus";

import "./styles.css";

export default function ViewLeftAside(props) {
  const [view, setView] = useState("dashboard");

  useEffect(() => {
    if (localStorage.getItem("viewFromStorage") !== undefined) {
      const view = localStorage.getItem("viewFromStorage");

      switch (view) {
        case "dashboard":
          setView("dashboard");
          props.changeView("dashboard");
          break;

        case "cashIn":
          setView("cashIn");
          props.changeView("cashIn");
          break;

        case "cashOut":
          setView("cashOut");
          props.changeView("cashOut");
          break;

        default:
          break;
      }
    }
    // eslint-disable-next-line
  }, []);

  function changeViewToDashboard() {
    setView("dashboard");
    props.changeView("dashboard");
    localStorage.setItem("viewFromStorage", "dashboard");

  }

  function changeViewToCashIn() {
    setView("cashIn");
    props.changeView("cashIn");
    localStorage.setItem("viewFromStorage", "cashIn");
  }

  function changeViewToCashOut() {
    setView("cashOut");
    props.changeView("cashOut");
    localStorage.setItem("viewFromStorage", "cashOut");
  }

  function addNewRegister() {
    props.openModal();
  }

  return (
    <div className="view-left-aside">
      <div className="logo-container">
        <img src={Logo} alt="logo" onClick={changeViewToDashboard} style={{cursor: 'pointer'}} />
      </div>
      <div className="call-to-action" onClick={addNewRegister}>
        <p className="button">
          Novo Registro
          <span className="icon">
            <Plus />
          </span>
        </p>
      </div>
      <div className="call-to-action">
        <ul>
          <li className={view === "dashboard" ? "selected" : ""}>
            <span className="icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="1"
                  y="1"
                  width="18"
                  height="18"
                  rx="3"
                  stroke="var(--icon-color)"
                  stroke-width="2"
                />
                <line
                  x1="1"
                  y1="7"
                  x2="19"
                  y2="7"
                  stroke="var(--icon-color)"
                  stroke-width="2"
                />
                <line
                  x1="8"
                  y1="6"
                  x2="8"
                  y2="18"
                  stroke="var(--icon-color)"
                  stroke-width="2"
                />
              </svg>
            </span>
            <p onClick={changeViewToDashboard}>Dashboard</p>
          </li>
          <li className={view === "cashIn" ? "selected" : ""}>
            <span className="icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M15.4506 1.40269C16.5126 1.09924 17.6196 1.71423 17.923 2.7763C17.9741 2.95498 18 3.13991 18 3.32574V5.00001H20C21.1046 5.00001 22 5.89544 22 7.00001V19C22 20.1046 21.1046 21 20 21H4C2.89543 21 2 20.1046 2 19H2.0267C2.00895 18.8925 2 18.7835 2 18.6743V6.75431C2 5.86135 2.59195 5.07658 3.45056 4.83126L15.4506 1.40269ZM10.1401 19H20V11H18V15.2457C18 16.1387 17.408 16.9234 16.5494 17.1688L10.1401 19ZM20 7.00001V9.00001H18V7.00001H20ZM4 6.75429V18.6743L16 15.2457V3.32571L4 6.75429ZM14 9.00001C14 9.5523 13.5523 10 13 10C12.4477 10 12 9.5523 12 9.00001C12 8.44773 12.4477 8.00001 13 8.00001C13.5523 8.00001 14 8.44773 14 9.00001Z"
                  fill="var(--icon-color) "
                />
              </svg>
            </span>
            <p onClick={changeViewToCashIn}>Receitas</p>
          </li>
          <li className={view === "cashOut" ? "selected" : ""}>
            <span className="icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 21H6C3.8 21 2 19.2 2 17V7C2 4.8 3.8 3 6 3H10L13 7H18C20.2 7 22 8.8 22 11V17C22 19.2 20.2 21 18 21Z"
                  stroke="var(--icon-color)"
                  stroke-width="2"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M16.5 14H7.5"
                  stroke="var(--icon-color)"
                  stroke-width="2"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
            <p onClick={changeViewToCashOut}>Despesas</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
