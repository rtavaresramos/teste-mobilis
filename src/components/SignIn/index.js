import React, { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";

import "./styles.css";

export default function SignIn() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function signInFunction(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/home");
    } catch {
      setError("Failed to log in");
    }

    setLoading(false);
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
        />
        <input
          type="password"
          id="password"
          className="fadeIn"
          name="login"
          placeholder="Senha"
          ref={passwordRef}
          required
        />
        <button type="submit" className="fadeIn">
          Entrar
        </button>
      </form>
    </>
  );
}
