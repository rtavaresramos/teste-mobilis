import React from 'react'

import Button from '../Button'

import './styles.css'

export default function Delete(props) {
    function closeModal(){
        props.close()
    }

    function deleteData(){
        console.log('deletar item')
    }

    return (
        <div className="links">
        <div
          style="background: var(--background); border-radius: 8px; padding: 8px"
        >
          <h1>
            Você está excluindo essa informação de forma definitiva.<br />
            Deseja continuar?
          </h1>
          <div className="button-place">
            <Button name="Cancelar" onClick={closeModal} />
    
            <Button name="Continuar" onClick={deleteData} />
          </div>
        </div>
      </div>
    )
}
