import React, { useRef, useState, useEffect } from "react";
import CurrencyInput from "react-currency-input";

import Button from "../Button";
import Select from "../Select";
import firebase from "../../firebase";

import "./styles.css";
export default function AddNewRegister(props) {
  const inputDescription = useRef();
  const inputTag = useRef();
  const inputData = useRef();

  const [error, setError] = useState();
  const [selectedOption, setSelectedOption] = useState(1);
  const [value, setValue] = useState("R$0,00");
  // const [date, setDate] = useState(new Date());

  useEffect(() => {
    if (props.edit) {
      inputDescription.current.value = props.edit.description;
      setSelectedOption(parseInt(props.edit.type));
      inputTag.current.value = props.edit.tag;
      inputData.current.value = props.edit.date;
      setValue(props.edit.value);
    }
  }, []);

  function closeModal() {
    props.close();
  }

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
      setError(
        "Há itens obrigatórios não preenchidos, verifique e tente novamente"
      );
    }
  }

  function setValueChange(evt) {
    setValue(evt.target.value);
  }

  return (
    <div class={props.edit ? "no-overlay" : "overlay"}>
      <div class="form">
        <div class="all-data">
          <div class="input-container">
            <div class="input-info">
              <label>*Descrição</label>
              <input ref={inputDescription} required type="text" />
            </div>
            {props.edit ? (
              <></>
            ) : (
              <div class="input-info">
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

            <div class="input-info">
              <label>*Tag</label>
              <input ref={inputTag} required type="text" />
            </div>

            <div class="input-date">
              <label>*Data</label>
              <input ref={inputData} required type="date" />
            </div>

            <div class="input-info">
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
        <div class="button-place">
          <Button name="Cancelar" buttonClicked={closeModal} />
          {props.edit ? (
            <Button name="Salvar alterações" buttonClicked={updateMember} />
          ) : (
            <Button name="Adicionar Registro" buttonClicked={addData} />
          )}
        </div>
        {error ? <div class="error">{error}</div> : ""}
      </div>
    </div>
  );
}
