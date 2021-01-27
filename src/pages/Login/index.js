import React, { useState } from "react";

import "./styles.css";

import Logo from "../../assets/img/mobilis-logo.png";

import SignIn from "../../components/SignIn";
import SignUp from "../../components/SignUp";

export default function Login() {
  const [view, setView] = useState("signIn");

  function enterClicked() {
    setView("signIn");
  }
  function registerClicked() {
    setView("signUp");
  }
  return (
    <>
      <div className="login-container d-flex align-items justify-center">
        <div className="wrapper fadeInDown">
          <div id="formContent">
            <div className="logo-container">
              <img src={Logo} alt="logo" />
            </div>
            <h2
              className={
                view === "signIn" ? "active" : "inactive underlineHover"
              }
              onClick={enterClicked}
            >
              Entrar
            </h2>

            <h2
              className={
                view === "signUp" ? "active" : "inactive underlineHover"
              }
              onClick={registerClicked}
            >
              Cadastrar
            </h2>

            <div className="login">
              {view === "signUp" ? <SignUp /> : <SignIn />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
