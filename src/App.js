import React from "react";
import { AuthProvider } from "./contexts/AuthContext";
import Routes from "./routes";

import "./global.css";

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
