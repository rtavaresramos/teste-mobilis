import React, { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";

import "./styles.css";

export default function SignIn() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");

  const history = useHistory();

  async function signInFunction(e) {
    e.preventDefault();

    try {
      setError("");

      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/home");
    } catch {
      setError(
        "Credenciais inválidas, verifique os dados informados e tente novamente."
      );
    }
  }
  return (
    <>
      <form onSubmit={signInFunction}>
        <input
          type="text"
          id="login"
          className="fadeIn"
          name="login"
          placeholder="Email"
          ref={emailRef}
          required
          style={{ textAlign: "center !important" }}
        />
        <input
          type="password"
          id="password"
          className="fadeIn"
          name="login"
          placeholder="Senha"
          ref={passwordRef}
          required
          style={{ textAlign: "center !important" }}
        />
        <button type="submit" className="fadeIn">
          Entrar
        </button>
        {error ? <div class="error">{error}</div> : ""}
      </form>
    </>
  );
}
