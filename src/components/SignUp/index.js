import React, { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function signUpFunction(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push("/home");
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }
  return (
    <>
      <form onSubmit={signUpFunction}>
        <input
          type="text"
          id="login"
          className="fadeIn"
          name="login"
          placeholder="Cadastrar e-mail"
          ref={emailRef}
        />
        <input
          type="password"
          id="password"
          className="fadeIn"
          name="login"
          placeholder="Cadastrar senha"
          ref={passwordRef}
        />

        <input
          type="password"
          id="password"
          className="fadeIn"
          name="login"
          placeholder="Confirmar senha"
          ref={passwordConfirmRef}
        />
        <button type="submit" class="fadeIn">
          Cadastrar
        </button>
      </form>
    </>
  );
}
