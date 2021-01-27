import React from "react";

import "styles.css";

export default function Camera(props) {
  function clicked() {
    props.emit("changePicture");
  }
  return (
    <div className="camSvg" onClick={clicked}>
      <svg fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M18 7.53C13.33 7.53 9.53 11.33 9.53 16C9.53 20.67 13.33 24.47 18 24.47C22.67 24.47 26.47 20.67 26.47 16C26.47 11.33 22.67 7.53 18 7.53ZM18 21.53C14.95 21.53 12.47 19.05 12.47 16C12.47 12.95 14.95 10.47 18 10.47C21.05 10.47 23.53 12.95 23.53 16C23.53 19.05 21.05 21.53 18 21.53ZM30.75 4H25.62L22.85 1.23C22.39 0.76 21.74 0.5 21.08 0.5H14.91C14.24 0.5 13.61 0.76 13.14 1.23L10.38 4H5.25C2.77 4 0.75 6.02 0.75 8.5V25.25C0.75 27.73 2.77 29.75 5.25 29.75H30.75C33.23 29.75 35.25 27.73 35.25 25.25V8.5C35.25 6.01 33.23 4 30.75 4ZM32.25 25.25C32.25 26.08 31.58 26.75 30.75 26.75H5.25C4.42 26.75 3.75 26.08 3.75 25.25V8.5C3.75 7.67 4.42 7 5.25 7H11C11.4 7 11.78 6.84 12.06 6.56L15.12 3.5H20.88L23.94 6.56C24.22 6.84 24.6 7 25 7H30.75C31.58 7 32.25 7.67 32.25 8.5V25.25Z"
          fill="black"
        />
      </svg>
    </div>
  );
}
