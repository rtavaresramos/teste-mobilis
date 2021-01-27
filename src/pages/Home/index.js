import React, { useState, useEffect } from "react";

import { useAuth } from "../../contexts/AuthContext";
import {  useHistory } from "react-router-dom";
import Loading from "../../components/Loading";
import AddNewRegister from "../../components/AddNewRegister";
import ViewLeftAside from "../../components/ViewLeftAside";
import ViewRightAside from "../../components/ViewRightAside";
import ViewMain from "../../components/ViewMain";
import SearchBar from "../../components/SearchBar";

import "./styles.css";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const history = useHistory();

  useEffect(() => {
    if (!currentUser) {
      history.push("/login");
    } else {
      console.log(currentUser)
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [currentUser]);

  

  return loading ? (
    <Loading />
  ) : (
    <div>
      <div>
        {/* <AddNewRegister /> */}
        <div className="container">
          <aside className="left-aside">
            {/* <ViewLeftAside /> */}
            <p>aqui vem a parte da esquerda</p>
          </aside>
          <main className="main">
            <ViewMain />
            {/* <p>aqui vem a parte do centro</p> */}
          </main>
          <aside className="right-aside">
            <ViewRightAside userInfo={currentUser}  />

          </aside>
        </div>
      </div>
    </div>
  );
}
