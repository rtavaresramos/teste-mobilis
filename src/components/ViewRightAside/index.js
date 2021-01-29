import React, { useRef, useState, useEffect } from "react";

import firebase from "../../firebase";

import Camera from "../icons/Camera";
import VerticalMore from "../icons/VerticalMore";
import Check from "../icons/Check";
import ProfileImage from "../ProfileImage";
import PopUp from "../PopUp";
import AllNotes from "../AllNotes";

import "./styles.css";

export default function ViewRightAside(props) {
  const popUp = useRef();
  const uploadImageRef = useRef();
  const noteInputRef = useRef();
  const [active, setActive] = useState(false);
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

  // document.addEventListener("mousedown", handleClick);

// eslint-disable-next-line
  }, [props.userInfo]);

  // const handleClick = e => {
  //   if (active && popUp.current.contains(e.target)) {
  //     return;
  //   }
  //   // outside click 
  //   setActive(false)
  // };

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

  function checkValue(evt) {
    if (evt.keyCode === 13) {
      const ref = firebase.database().ref(`users/${props.userInfo.uid}/notes`);
      const noteId = ref.push().key;

      if (noteInputRef.current.value !== "") {
        ref.child(noteId).set(
          {
            id: noteId,
            name: noteInputRef.current.value,
            isCompleted: false,
            assigneeId: props.userInfo.uid,
          },
          (err) => {
            if (err) {
              console.error(err);
            }

            noteInputRef.current.value = "";
          }
        );
      }
    }
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
        {active ? <PopUp ref={popUp} /> : <></>}

        <div className="time-line">
          <h3 className="notes">
            <span>
              <Check />
            </span>
            Lembretes
          </h3>
          <div className="input-place">
            <input
              id="notes"
              ref={noteInputRef}
              type="text"
              placeholder="Adicionar lembrete"
              onKeyUp={checkValue}
            />
          </div>

          <AllNotes userInfo={props.userInfo} />
        </div>
      </div>
    </div>
  );
}
