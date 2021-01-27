import React, { useState, useEffect } from "react";

import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import Loading from "../../components/Loading";
import AddNewRegister from "../../components/AddNewRegister";
import ViewLeftAside from "../../components/ViewLeftAside";
import ViewRightAside from "../../components/ViewRightAside";
import ViewMain from "../../components/ViewMain";

import "./styles.css";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const { currentUser } = useAuth();
  const history = useHistory();

  useEffect(() => {
    if (!currentUser) {
      history.push("/login");
    } else {
      console.log(currentUser);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [currentUser]);

  function changeLoadingState(state) {
    setLoading(state);
  }

  function openNewRegisterModal() {
    setShowRegisterModal(true);
  }

  return (
    <div>
      {loading ? <Loading /> : <></>}
      <div>
        {showRegisterModal ? <AddNewRegister /> : <></>}
        <div className="container">
          <aside className="left-aside">
            <ViewLeftAside openModal={openNewRegisterModal} />
          </aside>
          <main className="main">
            <ViewMain />
          </main>
          <aside className="right-aside">
            <ViewRightAside
              userInfo={currentUser}
              loading={changeLoadingState}
            />
          </aside>
        </div>
      </div>
    </div>
  );
}
