import React from "react";

import "./styles.css";
export default function ProfileImage(props) {
  return (
    <>{!props.src?
      <div className="profile">
        <svg
          width="30"
          height="33"
          viewBox="0 0 30 33"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 15.87C19.2 15.87 22.62 12.45 22.62 8.25C22.62 4.05 19.2 0.619999 15 0.619999C10.8 0.619999 7.38 4.04 7.38 8.24C7.38 12.44 10.8 15.87 15 15.87ZM15 3.62C17.55 3.62 19.62 5.69 19.62 8.24C19.62 10.79 17.54 12.86 15 12.86C12.46 12.86 10.38 10.79 10.38 8.24C10.38 5.69 12.45 3.62 15 3.62ZM22.12 17.25H7.88C3.74001 17.25 0.380005 20.61 0.380005 24.75V29C0.380005 30.93 1.95 32.5 3.88 32.5H26.13C28.06 32.5 29.63 30.93 29.63 29V24.75C29.62 20.61 26.26 17.25 22.12 17.25ZM26.62 29C26.62 29.28 26.4 29.5 26.12 29.5H3.88C3.6 29.5 3.38 29.28 3.38 29V24.75C3.38 22.27 5.4 20.25 7.88 20.25H22.13C24.61 20.25 26.63 22.27 26.63 24.75V29H26.62Z"
            fill="var(--text-color)"
          />
        </svg>
      </div>
      :
      <div  className="profile">
        <img src={props.src} />
      </div>}
    </>
  );
}
