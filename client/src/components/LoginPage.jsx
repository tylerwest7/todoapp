import React from 'react';
import LoginForm from '../components/LoginForm';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

function LoginPage(props) {

    const navigate = useNavigate();

    function homeTransition(){
        console.log('Going to home page');
        navigate('/home');
    }

    return (
        <LoginForm homeTransition={homeTransition}/>
    )
}

export default LoginPage;
