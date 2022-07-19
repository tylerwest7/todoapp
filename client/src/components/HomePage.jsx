import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import HomeForm from './HomeForm';

function HomePage(props){

    const navigate = useNavigate();

    //Log out
    function logout(){
        console.log('logout');
        axios.post('/auth/logout', {

        })
        .then(function (response) {
            console.log('navigating');
            navigate('/login');
        })
    }

    function loginTransition(){
        console.log('Going to login page');
        navigate('/login');
    }

    return (
        <div>
            <HomeForm loginTransition={loginTransition} logout={logout}/>
        </div>
    )
}

export default HomePage;