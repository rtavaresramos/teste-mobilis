import React, {useRef} from "react";
import CurrencyInput from 'react-currency-input';
import Button from "../Button";
import Select from "../Select";

import './styles.css'
export default function AddNewRegister(props) {
  const inputDescription = useRef()
  const inputTag = useRef()
  const inputData = useRef()
  const inputValue = useRef()

  function closeModal(){
    props.close()
}

function addData(){
    console.log('adicionar item')
}


  return (
    <div class="overlay">
      <div class="form">
        <div class="all-data">
          <div class="input-container">
            <div class="input-info">
              <label>Descrição</label>
              <input ref={inputDescription} required type="text" />
            </div>
            <div class="input-info">
              <Select options={[{id: 1, name: 'Receita'},{id: 2, name: 'Despesa'}]} select="o tipo de registro"/>
            </div>

            <div class="input-info">
              <label>Tag</label>
              <input ref={inputTag} required type="text" />
            </div>

            <div class="input-date">
            <label>Data</label>
              <input ref={inputData} required type="date" />
            </div>
            
            <div class="input-info">
              <label>Valor</label>
                <CurrencyInput ref={inputValue} prefix="R$" decimalSeparator=","  thousandSeparator="." style={{textAlign: 'left'}} />
            </div>
            
          </div>
        </div>
        <div class="button-place">
          <Button name="Cancelar" buttonClicked={closeModal} />
          {/* <Button
          v-if="edit"
          :name="'Salvar alterações'"
          @click.native="updateMember"
        /> */}
          <Button name="Adicionar Registro" buttonClicked={addData} />
        </div>
      </div>
    </div>
  );
}
