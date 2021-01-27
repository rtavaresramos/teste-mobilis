import React, { useRef, useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import firebase from "../../firebase";


import Camera from "../icons/Camera";
import VerticalMore from "../icons/VerticalMore";
import Check from "../icons/Check";
import ProfileImage from "../ProfileImage";
import PopUp from "../PopUp";

import "./styles.css";

export default function ViewRightAside(props) {
  const uploadImageRef = useRef();
  const [active, setActive] = useState(false);
  const [profile, setProfile] = useState({});
  const [profileImage, setProfileImage] = useState();


  useEffect(()=> {
    const ref = firebase.database().ref(`users`);

    ref.on("value", (data) => {
      const values = data.val();

      const user = Object.keys(values).map((i) => values[i]);

      user.map((data) => {
        if(data.id === props.userInfo.uid) { setProfile(data) }
      })
    })
  },[props.userInfo])

  function handlePhoto() {
    uploadImageRef.current.value = null;
    uploadImageRef.current.click();
  }

 async function handleFile({target}){

  let image = target.files[0]
  let url =""


    const snapshot = await firebase
      .storage()
      .ref(props.userInfo.uid)
      .child('profile-image')
      .put(image);

      url = await snapshot.ref.getDownloadURL()
      const ref = firebase.database().ref(`users`);
      ref.child(props.userInfo.uid).update({id:props.userInfo.uid, photoUrl: url });

  }



  function changeActiveState() {
    setActive(!active);
  }

  return (
    <div className="view-right-aside">
      <div className="header">
        <ProfileImage
          src={profile.photoUrl ? profile.photoUrl : ""}
        />
        <Camera className="camera" emit={handlePhoto} onClick={handlePhoto} />

        <input
          ref={uploadImageRef}
          className="d-none"
          type="file"
          accept="image/*"
          onChange={handleFile}
        />
        <div className="info">
          <div className="title">
            {props.userInfo.displayName ? (
              <h4>{props.userInfo.displayName}</h4>
            ) : (
              <h4>Seja Bem Vindo</h4>
            )}

            <p>{props.userInfo.email}</p>
          </div>
          <span className="icon">
            <p className="link" onClick={changeActiveState}>
              <VerticalMore />
            </p>
          </span>
        </div>
      </div>
      <div className="main">
        {active ? <PopUp /> : <></>}

        <div className="time-line">
          <h3 className="notes">
            <span>
              <Check />
            </span>
            Lembretes
          </h3>
          <div className="input-place">
            <input id="notes" type="text" placeholder="Adicionar lembrete" />
          </div>
          <div className="links-item">
            <div className="notes-list">
              <input type="checkbox" id="todo" value="todo" />
              <p>Lembrete</p>
              <a href="#" className="trash">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M9 1H15C16.1046 1 17 1.89543 17 3V4H20C21.1046 4 22 4.89543 22 6V8C22 9.10457 21.1046 10 20 10H19.9199L19 21C19 22.1046 18.1046 23 17 23H7C5.89543 23 5 22.1046 5.00345 21.083L4.07987 10H4C2.89543 10 2 9.10457 2 8V6C2 4.89543 2.89543 4 4 4H7V3C7 1.89543 7.89543 1 9 1ZM4 6H7H17H20V8H4V6ZM6.08649 10H17.9132L17.0035 20.917L17 21H7L6.08649 10ZM15 3V4H9V3H15Z"
                    fill="var(--text-color)"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
