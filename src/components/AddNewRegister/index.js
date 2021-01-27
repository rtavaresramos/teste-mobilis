import React from "react";
import Button from "../Button";
import Select from "../Select";

export default function AddNewRegister() {
  return (
    <div class="overlay">
      <div class="form">
        <div class="all-data">
          <div class="input-container">
            <div class="input-info">
              <label>Nome</label>
              <input required v-model="client.name" type="text" />
            </div>
            <div class="input-info">
              <Select />
            </div>
            <label> Data do Acordo</label>
            <div class="input-date">
              <input required type="datetime-local" />
            </div>
            <div class="input-info">
              <label>Número do Contrato</label>
              <input required type="text" />
            </div>
            <div class="input-info">
              <label>Valor de Entrada</label>
              <input required type="text" />
            </div>
            <div class="input-info">
              <label>Valor Total</label>
              <input required type="text" />
            </div>
          </div>
        </div>
        <div class="button-place">
          <Button name="Cancelar" />
          {/* <Button
          v-if="edit"
          :name="'Salvar alterações'"
          @click.native="updateMember"
        /> */}
          <Button name="Adicionar Client" />
        </div>
      </div>
    </div>
  );
}
