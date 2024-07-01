import React, { useState } from 'react';
import './Register.css';
import SConfig from '../../../config.json';
import agent from '../../../Utilities/agent'; // Sử dụng agent giống như trong TestLogin.js
import { message } from 'antd';

const Register = () => {
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [notification, setNotification] = useState('');

    const registerSuccessfully = (token) => {
        localStorage.setItem("userToken", token);
        window.location.href = '/'; // Chuyển hướng người dùng đến trang chủ hoặc trang đăng nhập
    };

    const register = async (e) => {
        e.preventDefault();
        const user = document.getElementById("user").value;
        const pass = document.getElementById("pass").value;
        const confirmPass = document.getElementById("confirmPass").value;
        if(pass !== confirmPass) {
            setNotification("Passwords do not match!");
            return;
        }
        sendRegisterRequest(user, pass);
    }

    const sendRegisterRequest = (user, pass) => {
        agent.Register.register(user, pass).then(res => {
            if(res.success === true)
                message.success("User registered successfully!");
            else
            {
                message.error("Error registering user!");
            }    
        });
    }

    const togglePasswordVisibility = () => {
        setIsPasswordShown(!isPasswordShown);
    };

    return (
        <div id="register-body">
            <div id="register-container">
                <div className="register-form-wrap">
                    <form onSubmit={register}>
                        <h1>Đăng ký</h1>
                        <div className="register-form-group">
                            <label htmlFor="username">Email</label>
                            <input type="text" name="username" id="user" />
                        </div>
                        <div className="register-form-group">
                            <label htmlFor="password">Mật khẩu</label>
                            <input type={isPasswordShown ? "text" : "password"} name="password" id="pass" />
                        </div>
                        <div className="register-form-group">
                            <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
                            <input type={isPasswordShown ? "text" : "password"} name="confirmPassword" id="confirmPass" />
                            <button type="button" onClick={togglePasswordVisibility}>{isPasswordShown ? 'Ẩn' : 'Hiện'}</button>
                        </div>
                        <button className="register-btn">Đăng ký</button>
                        <div id="register-notification">{notification}</div>
                        <p className="register-bottom-text">
                            <a href="#">Dịch vụ & Điều khoản</a> và 
                            <a href="#"> Chính sách</a>
                        </p>
                    </form>
                </div>
                <footer>
                    <p>Đã có tài khoản? <a href="/">Đăng nhập ở đây</a></p>
                </footer>
            </div>
        </div>
    );
}

export default Register;