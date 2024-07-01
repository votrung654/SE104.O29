// TestLogin.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'antd'; // Make sure to import Button
import './TestLogin.css';

import agent from "../../../Utilities/agent";

export default function TestLogin() {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [passwordType, setPasswordType] = useState('password');

    const [pwClass, setPwClass] = useState('');
   

    const login = (e) => {
        if(e) e.preventDefault();
        agent.Auth.login(username, password).then(res => {
            console.log(res.status);
            if(res.status === 1){
                loginSuccessfully("sample_token_from_line23_pageTestLogin");
            }
        })
    }

    const loginSuccessfully = (userData) =>{

        localStorage.setItem("userData", userData);
        window.location.reload();
    }

    const togglePasswordVisibility = () => {
        setPasswordType(passwordType === 'password' ? 'text' : 'password');
    }
    
    const onFocus = () => {
        setPwClass("password");
    }

    const onLostFocus = () => {
        setPwClass("");
    }

    return (
        <div>
            <div className={`owl`}>
                <div className={`hand ${pwClass}`} ></div>
                <div className={`hand hand-r ${pwClass}`}></div>
                <div className={`arms ${pwClass}`}>
                    <div className={`arm ${pwClass}`}></div>
                    <div className={`arm arm-r ${pwClass}`}></div>
                </div>
            </div>
            <div className="form">
                <div className="control" >
                    <label className="fa fa-envelope"></label>
                    <input style={{width : '100%'}} id="user" placeholder="Email" type="email" onChange={(evt) => setUsername(evt.target.value)}></input>
                </div>
                <div className="control password-control">
                    <label className="fa fa-lock"></label>
                    <input
                        style={{width : '100%'}}
                        id="pass"
                        placeholder="Password"
                        type={passwordType}
                        onFocus={() => onFocus()}
                        onBlur={() => onLostFocus()}
                        onChange={(evt) => setPassword(evt.target.value)}>
                    </input>
                    <div className="toggle-password" onClick={togglePasswordVisibility}>
                        <FontAwesomeIcon icon={faEye} />
                    </div>
                </div>
                <div>
                    <Button id="login-button" type="primary" onClick={() => login()}>Login</Button>
                    <p id="signup-text">Not a member? <a href="/signup">Sign up Here</a></p>
                    <p className="login-bottom-text">
                        <a href="/terms">Terms & Conditions</a> and
                        <a href="/privacy"> Privacy Policy</a>
                    </p>
                </div>
            </div>
        </div>
    )
}