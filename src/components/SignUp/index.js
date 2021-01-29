import React, { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";

export default function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");

  const history = useHistory();

  async function signUpFunction(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError(
        "A senha informada é diferente da confirmação, verifique e tente novamente."
      );
    }

    try {
      setError("");

      await signup(emailRef.current.value, passwordRef.current.value);
      history.push("/home");
    } catch {
      setError(
        "Erro ao criar está conta, verifique os dados informados e tente novamente"
      );
    }
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
        {error ? <div class="error">{error}</div> : ""}
      </form>
    </>
  );
}
