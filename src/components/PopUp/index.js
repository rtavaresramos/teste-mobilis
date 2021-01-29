import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";

import "./styles.css";

export default function PopUp() {
  const { logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    try {
      history.push("/login");
      await logout();
    } catch {}
  }
  return (
    <div className="popup">
      <div className="popup-item">
        <span>
          <svg
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="icon"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M4 1.54143C4 2.07988 3.55 2.52042 3 2.52042H2V14.2683H3C3.55 14.2683 4 14.7089 4 15.2473C4 15.7858 3.55 16.2263 3 16.2263H1C0.45 16.2263 0 15.7858 0 15.2473V1.54143C0 1.00299 0.45 0.562439 1 0.562439H3C3.55 0.562439 4 1.00299 4 1.54143ZM14.0039 3.91529L16.8179 7.83126C17.0679 8.17782 17.0599 8.64284 16.7999 8.98157L13.7999 12.8975C13.6039 13.154 13.3029 13.2891 12.9989 13.2891C12.7909 13.2891 12.5799 13.2255 12.3999 13.0933C11.9579 12.7693 11.8689 12.1555 12.1999 11.7237L14.0009 9.37317H13.9999H5.9999C5.4479 9.37317 4.9999 8.93556 4.9999 8.39418C4.9999 7.8528 5.4479 7.41519 5.9999 7.41519H13.9999C14.0164 7.41519 14.0317 7.41964 14.0472 7.42414C14.0598 7.4278 14.0724 7.43149 14.0859 7.43281L12.3679 5.04113C12.0499 4.5996 12.1589 3.98871 12.6109 3.67739C13.0619 3.3651 13.6859 3.47278 14.0039 3.91529Z"
              fill="#E24444"
            />
          </svg>
        </span>
        <p className="logout link" onClick={handleLogout}>
          Log out
        </p>
      </div>
    </div>
  );
}
