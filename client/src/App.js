import "./App.css";
import React, { createContext, useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import AuthorizedApp from "./components/AuthPages/AuthorizedApp";
import UnAuthorizedApp from "./components/AuthPages/UnAuthorizedApp";
import { UserContext } from "./contexts/UserContext";
import TestPage from "./components/TestPage";

function App() {
  return (
    <div className="">
      <UserContext.Provider value={"Username"}>
        <TestPage />
      </UserContext.Provider>
    </div>
  );
}

export default App;
