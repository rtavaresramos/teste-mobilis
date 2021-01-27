import React, { useRef, useState, useEffect } from "react";

import firebase from "../../firebase";

import Trash from "../icons/Trash";
import Camera from "../icons/Camera";
import VerticalMore from "../icons/VerticalMore";
import Check from "../icons/Check";
import ProfileImage from "../ProfileImage";
import PopUp from "../PopUp";
import Loading from "../Loading";

import "./styles.css";

export default function ViewRightAside(props) {
  const uploadImageRef = useRef();
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const ref = firebase.database().ref(`users`);
    let user = {};
    let profileData = {};
    ref.on("value", (data) => {
      const values = data.val();

      if (values !== undefined && values !== null) {
        user = Object.keys(values).map((i) => values[i]);
        user.map((data) => {
          if (data.id === props.userInfo.uid) {
            profileData = data;
          }

          return setProfile(profileData);
        });
      }
    });
  }, [props.userInfo]);

  function handlePhoto() {
    uploadImageRef.current.value = null;
    uploadImageRef.current.click();
  }

  async function handleFile({ target }) {
    let image = target.files[0];
    let url = "";
    props.loading(true);

    const snapshot = await firebase
      .storage()
      .ref(props.userInfo.uid)
      .child("profile-image")
      .put(image);

    url = await snapshot.ref.getDownloadURL();
    const ref = firebase.database().ref(`users`);
    ref
      .child(props.userInfo.uid)
      .update({ id: props.userInfo.uid, photoUrl: url });
    props.loading(false);
  }

  function changeActiveState() {
    setActive(!active);
  }

  return (
    <div className="view-right-aside">
      <div className="header">
        <ProfileImage src={profile.photoUrl ? profile.photoUrl : ""} />
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
              <Trash />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
