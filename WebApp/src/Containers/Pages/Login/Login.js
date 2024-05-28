import React from 'react';
import './Login.css';
import SConfig from '../../../config.json';

import { useHttpClient } from '../../../Hooks/http-hook';


const Login = () => {
    
    const { sendRequest } = useHttpClient();

    const login = (e) => {
        if(e) e.preventDefault();
        let user = document.getElementById("user").value;
        let pass = document.getElementById("pass").value;
        sendLoginRequest(user, pass);
    }

    const loginSuccessfully = (userData) =>{

        userData.then((data)=>{
            
            localStorage.setItem("userData", data.token);
        });
        
        window.location.reload();
    }

    const sendLoginRequest = (user, pass) =>{
        
        sendRequest(
            `${SConfig.SERVER_URL}:${SConfig.SERVER_PORT}${SConfig.AuthRoutes.Login}`, 
            "POST",
            JSON.stringify({
                username : user,
                password: pass
            }),
            {
                'Content-Type' : 'application/json'
            }
        )
        .then((response) => {
            if(response.ok){
                loginSuccessfully(response.json())
            }else{
                document.getElementById("login-notification").append("Authentication Failed !!");
            }
            //return response.json();
        })
        .catch((error) => {
            console.log(error);
            
        });
    }


    return(
        <div id="login-body">
        <div id="login-container">
            <div class="login-form-wrap">
            <form onSubmit={login}>
                <h1>Log In</h1>
                <p></p>
                <div class="login-form-group">
                    <label for="first-name">Username</label>
                    <input type="text" name="firstName" id="user" />
                </div>
                <div class="login-form-group">
                    <label for="last-name">Password</label>
                    <input type="text" name="lastName" id="pass" />
                </div>
            
                <button class="login-btn">Log in</button>
                <div id="login-notification">
                    
                </div>
                <p class="login-bottom-text">
                    
                    <a href="#">Terms & Conditions</a> and 
                    <a href="#"> Privacy Policy</a>
                </p>
            </form>
            </div>
            <footer>
                <p>Have not account yet? <a href="#">Sign up Here</a></p>
            </footer>
        </div></div>
    );

}

export default Login;