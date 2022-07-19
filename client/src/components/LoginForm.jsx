import { Component, useState } from "react";
import axios from 'axios';

function LoginForm(props){

    //Set state
    const [login, setLogin] = useState({
        email: "",
        password: ""
    })

    //Change handler
    function changeHandler(e){
        const name = e.target.name;
        const value = e.target.value;

        setLogin({...login, [name]: value});
    }

    //Submit handler
    function submitHandler(e){
        e.preventDefault();
        console.log('submitting');
        axios.post('/auth/login', {
            email: login.email,
            password: login.password
        })
        .then(response => {
            console.log('logging in');
            props.homeTransition();
        })
    }

    return(
        <div>
            <h1>Login</h1>
            <form onSubmit={submitHandler}>
                <input name="email" value={login.name} onChange={changeHandler} placeholder="email"></input>
                <input name="password" value={login.password} onChange={changeHandler} placeholder="password"></input>
                <button>Login</button>
            </form>
        </div>
    )

}

    export default LoginForm;