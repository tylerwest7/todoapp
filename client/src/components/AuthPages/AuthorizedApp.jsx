import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import HomePage from '../HomePage';
import ErrorPage from '../ErrorPage';
import axios from 'axios';

function AuthorizedApp() {
  return (
    <div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<HomePage/>}></Route>
            <Route path="*" element={<ErrorPage/>}></Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default AuthorizedApp;