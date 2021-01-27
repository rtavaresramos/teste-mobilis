import React, {useState} from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";


import './styles.css'

export default function PopUp() {
  const [error, setError] = useState("");
  const { logout } = useAuth();
  const history = useHistory();


  async function handleLogout() {
    setError("");

    try {
      history.push("/login");
      await logout();
    } catch {
      setError("Failed to log out");
    }
  }
  return (
    <div className="popup">
      <div className="popup-item">
        <span className="icon">
          <svg
            width="14"
            height="19"
            viewBox="0 0 14 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="icon"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M11 4.85292C11 7.01257 9.206 8.76888 7 8.76888C4.794 8.76888 3 7.01257 3 4.85292C3 2.69326 4.794 0.936951 7 0.936951C9.206 0.936951 11 2.69326 11 4.85292ZM14 17.5798C14 18.1202 13.553 18.5588 13 18.5588H1C0.447 18.5588 0 18.1202 0 17.5798C0 13.8009 3.141 10.7269 7 10.7269C10.859 10.7269 14 13.8009 14 17.5798Z"
              fill="#282B31"
            />
          </svg>
        </span>
        <p className="link">Perfil</p>
      </div>

      <div className="horizontal-divisor"></div>

      <div className="popup-item">
        <span className="icon">
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
        <p className="logout link" onClick={handleLogout} >Log out</p>
      </div>
    </div>
  );
}
