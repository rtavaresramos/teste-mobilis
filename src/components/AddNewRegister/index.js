import React, { useRef, useState, useEffect } from "react";
import CurrencyInput from "react-currency-input";

import Button from "../Button";
import Select from "../Select";
import firebase from "../../firebase";

import "./styles.css";
export default function AddNewRegister(props) {
  const form = useRef();
  const inputDescription = useRef("");
  const inputTag = useRef("");
  const inputData = useRef("");

  const [error, setError] = useState();
  const [selectedOption, setSelectedOption] = useState(1);
  const [value, setValue] = useState("R$0,00");
  const [triedToRegister, setTriedToRegister] = useState(false);
  const[active, setActive] = useState(false)

  useEffect(() => {
    if (props.edit) {
      inputDescription.current.value = props.edit.description;
      setSelectedOption(parseInt(props.edit.type));
      inputTag.current.value = props.edit.tag;
      inputData.current.value = props.edit.date;
      setValue(props.edit.value);
    } 
    // setActive(true)
    // document.addEventListener("mousedown", handleClick);
    
    // eslint-disable-next-line
  }, []);

  function closeModal() {
    setActive(false)
    props.close();
  }

  // const handleClick = e => {
  //   if (active && form.current.contains(e.target)) {
  //     return;
  //   }
  //   // outside click 
  //   closeModal()
  // };

  function addData() {
    const ref = firebase
      .database()
      .ref(
        `users/${props.userInfo.uid}/${
          selectedOption === 1 ? "cashIn" : "cashOut"
        }`
      );
    const registerId = ref.push().key;

    if (
      inputDescription.current.value !== "" &&
      selectedOption !== "" &&
      inputTag.current.value !== "" &&
      inputData.current.value !== "" &&
      value !== ""
    ) {
      ref.child(registerId).set(
        {
          id: registerId,
          description: inputDescription.current.value,
          type: selectedOption,
          tag: inputTag.current.value,
          date: inputData.current.value,
          value,
          assigneeId: props.userInfo.uid,
        },
        (err) => {
          if (err) {
            console.error(err);
          }
        }
      );

      closeModal();
    } else {
      setTriedToRegister(true)
      setError(
        "Há itens obrigatórios não preenchidos, verifique e tente novamente"
      );
    }
  }

  function updateMember() {
    const ref = firebase
      .database()
      .ref(
        `users/${props.edit.assigneeId}/${
          props.edit.type === "1" ? "cashIn" : "cashOut"
        }`
      );

    if (
      inputDescription.current.value !== "" &&
      selectedOption !== "" &&
      inputTag.current.value !== "" &&
      inputData.current.value !== "" &&
      value !== ""
    ) {
      ref.child(props.edit.id).update(
        {
          description: inputDescription.current.value,
          type: selectedOption,
          tag: inputTag.current.value,
          date: inputData.current.value,
          value,
        },
        (err) => {
          if (err) {
            console.error(err);
          }
        }
      );

      closeModal();
    } else {

      setTriedToRegister(true)
      setError(
        "Há itens obrigatórios não preenchidos, verifique e tente novamente"
      );
    }
  }

  function setValueChange(evt) {
    setValue(evt.target.value);
  }

  return (
    <div className={props.edit ? "no-overlay" : "overlay"}>
      <div className="form" ref={form}>
        <div className="all-data">
          <div className="input-container">
            <div className={`input-info ${triedToRegister && inputDescription.current.value === "" ? "invalid" : ''}`}>
              <label>*Descrição</label>
              <input ref={inputDescription} required type="text" />
            </div>
            {props.edit ? (
              <></>
            ) : (
              <div className="input-info">
                <label>*Tipo</label>
                <Select
                  options={[
                    { id: 1, name: "Receita" },
                    { id: 2, name: "Despesa" },
                  ]}
                  select="o tipo de registro"
                  selected={(e) => setSelectedOption(e)}
                />
              </div>
            )}

            <div className={`input-info ${triedToRegister && inputTag.current.value === "" ? "invalid" : ''}`}>
              <label>*Tag</label>
              <input ref={inputTag} required type="text" />
            </div>

            <div className={`input-date ${triedToRegister && inputData.current.value === "" ? "invalid" : ''}`}>
              <label>*Data</label>
              <input ref={inputData} required type="date" />
            </div>

            <div className={`input-info ${triedToRegister && value === "R$0,00" ? "invalid" : ''}`}>
              <label>*Valor</label>
              <CurrencyInput
                onChangeEvent={setValueChange}
                prefix="R$"
                decimalSeparator=","
                thousandSeparator="."
                style={{ textAlign: "left" }}
                value={value}
              />
            </div>
          </div>
        </div>
        <div className="button-place">
          <Button name="Cancelar" cancel buttonClicked={closeModal} />
          {props.edit ? (
            <Button name="Salvar alterações" buttonClicked={updateMember} />
          ) : (
            <Button name="Adicionar Registro" buttonClicked={addData} />
          )}
        </div>
        {error ? <div className="error">{error}</div> : ""}
      </div>
    </div>
  );
}
