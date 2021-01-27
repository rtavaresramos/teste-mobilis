import React from "react";

import LoadingGif from "../../assets/gifs/loading.gif";

export default function Loading() {
  return (
    <div className="loading">
      <img src={LoadingGif} alt="Loading" />
      <h4>Carregando ...</h4>
    </div>
  );
}
