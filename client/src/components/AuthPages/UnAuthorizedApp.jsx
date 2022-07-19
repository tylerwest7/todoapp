import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import SignupPage from '../SignupPage';
import LoginPage from '../LoginPage';
import ErrorPage from '../ErrorPage';
import axios from 'axios';

function UnAuthorizedApp() {
  return (
    <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage/>}></Route>
            <Route path="/signup" element={<SignupPage/>}></Route>
            <Route path="*" element={<ErrorPage/>}></Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default UnAuthorizedApp;