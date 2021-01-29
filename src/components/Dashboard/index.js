import React, { useState, useEffect } from "react";
import firebase from "../../firebase";

import "./styles.css";

export default function Dashboard(props) {
  const [cashIn, setCashIn] = useState();
  const [cashOut, setCashOut] = useState();

  useEffect(() => {
    let items = [];

    const refCashIn = firebase.database().ref(`users/${props.userId}/cashIn`);
    refCashIn.on("value", (data) => {
      const values = data.val();

      if (values !== undefined && values !== null) {
        items = Object.keys(values).map((i) => values[i]);
        return setCashIn(items);
      }
    });

    const refCashOut = firebase.database().ref(`users/${props.userId}/cashOut`);
    refCashOut.on("value", (data) => {
      const values = data.val();

      if (values !== undefined && values !== null) {
        items = Object.keys(values).map((i) => values[i]);
        return setCashOut(items);
      }
    });
    // eslint-disable-next-line
  }, []);
  return (
    <div className="main">
      <div className="main-sections">
        <div className="section-2">
          <h1>Total de Receitas:</h1>
          <h3>
            {cashIn
              ? parseFloat(
                  cashIn
                    .map((data) =>
                      data.value.replace("R$", "").replace(".", "")
                    )
                    .reduce((acumulator, currentValue) => {
                      return parseFloat(acumulator) + parseFloat(currentValue);
                    })
                ).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })
              : "R$ 0,00"}
          </h3>
        </div>
        <div className="section-1">
          <h1>Total de Gastos:</h1>
          <h3>
            {cashOut
              ? parseFloat(
                  cashOut
                    .map((data) =>
                      data.value.replace("R$", "").replace(".", "")
                    )
                    .reduce((acumulator, currentValue) => {
                      return parseFloat(acumulator) + parseFloat(currentValue);
                    })
                ).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })
              : "R$ 0,00"}
          </h3>
        </div>
      </div>
      <div className="main-calendar">
        <h1>Balanço:</h1>
        <div className="cards-place">
          <h5>
            {cashOut && cashIn
              ? parseFloat(
                 parseFloat( cashIn
                    .map((data) =>
                      data.value.replace("R$", "").replace(".", "")
                    )
                    .reduce((acumulator, currentValue) => {
                      return parseFloat(acumulator) + parseFloat(currentValue);
                    }) ) -
                    parseFloat(cashOut
                      .map((data) =>
                        data.value.replace("R$", "").replace(".", "")
                      )
                      .reduce((acumulator, currentValue) => {
                        return (
                          parseFloat(acumulator) + parseFloat(currentValue)
                        );
                      }))
                ).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })
              : ""}

            {cashOut && !cashIn
              ? parseFloat(
                  0 -
                    parseFloat(cashOut
                      .map((data) =>
                        data.value.replace("R$", "").replace(".", "")
                      )
                      .reduce((acumulator, currentValue) => {
                        return (
                          parseFloat(acumulator) + parseFloat(currentValue)
                        );
                      }))
                ).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })
              : ""}

            {!cashOut && cashIn
              ? parseFloat(
                    cashIn
                      .map((data) =>
                        data.value.replace("R$", "").replace(".", "")
                      )
                      .reduce((acumulator, currentValue) => {
                        return (
                          parseFloat(acumulator) + parseFloat(currentValue)
                        );
                      })
                ).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })
              : ""}
          </h5>
        </div>
      </div>
    </div>
  );
}
