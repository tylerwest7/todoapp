import axios from "axios";
import { createContext, useState } from "react";

export const UserContext = createContext(null);

export const login = () => {
    console.log('logging in');
    axios.post('/auth/login', {
        email: 'tyler@tylerwest.co',
        password: 'asdfasdf123'
    })
    .then(response => console.log(response))
    .then(() => {
        const cookies = document.cookie;
        console.log(cookies);
    })
}

export const logout = () => {
    console.log('Logging out');

    //Clear cookie
}

export const signup = () => {
    console.log('Signing up');
}