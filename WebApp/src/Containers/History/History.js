import React from 'react';
import './History.css';


import { useHttpClient } from '../../Hooks/http-hook';


const History = () => {

    const { sendRequest } = useHttpClient();

    const login = () => {
        let user = document.getElementById("user").value;
        let pass = document.getElementById("pass").value;
        sendLoginRequest(user, pass);
    }

    const sendLoginRequest = (user, pass) =>{
        sendRequest(
            "http://localhost:3010/user/login", 
            "POST",
            JSON.stringify({
                email : user,
                password: pass
            }),
            {
                'Content-Type' : 'application/json'
            }
        )
        .then((response) => {
            return response.json();
        })

        .then((dataResponse) => {
            localStorage.setItem("loggedToken", dataResponse.token);
            console.log(dataResponse);
            
        })
        
        .catch((error) => {
            console.log(error);
            
        });
    }


    return(
        <div>
            <input id="user"></input>
            <br/>
            <input id="pass"></input>
            <br/>
            <button onClick={()=>login()}>Go</button>
        </div>
    );

}

export default History;