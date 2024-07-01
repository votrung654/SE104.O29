import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import './TestLogin.css';
import { useHistory } from 'react-router-dom';
import agent from '../../../Utilities/agent'; // Ensure agent is correctly set up
 
const TestLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
 
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const svgRef = useRef(null);
  let svgCoords = null;
  let history = useHistory();
 
  const handleRegisterNavigation = () => {
    // Thay thế '/register' bằng đường dẫn thực tế của trang đăng ký
    window.location.href = '/register';
  };
 
  useEffect(() => {
    const svgElement = svgRef.current;
    const emailElement = emailRef.current;
    svgCoords = getPosition(svgElement);
 
    emailElement.addEventListener('input', onEmailInput);
    emailElement.addEventListener('focus', onEmailFocus);
    emailElement.addEventListener('blur', onEmailBlur);
    passwordRef.current.addEventListener('focus', onPasswordFocus);
    passwordRef.current.addEventListener('blur', onPasswordBlur);
 
    return () => {
      emailElement.removeEventListener('input', onEmailInput);
      emailElement.removeEventListener('focus', onEmailFocus);
      emailElement.removeEventListener('blur', onEmailBlur);
      passwordRef.current.removeEventListener('focus', onPasswordFocus);
      passwordRef.current.removeEventListener('blur', onPasswordBlur);
    };
  }, []);
 
  useEffect(() => {
    if (showPassword) {
      openEyes();
    } else {
      closeEyes();
    }
  }, [showPassword]);
 
  const onEmailInput = (e) => {
    calculateFaceMove(e);
    const value = e.target.value;
    setEmail(value);
  };
 
  const onEmailFocus = () => {
    onEmailInput({ target: emailRef.current });
  };
 
  const onEmailBlur = (e) => {
    if (e.target.value === '') {
      e.target.parentElement.classList.remove('focusWithText');
    }
    resetFace();
  };
 
  const onPasswordFocus = () => {
    // Add any specific functionality needed when password input is focused
  };
 
  const onPasswordBlur = () => {
    // Add any specific functionality needed when password input is blurred
  };
 
  const openEyes = () => {
    const eyeL = document.querySelector('.eyeL');
    const eyeR = document.querySelector('.eyeR');
 
    gsap.to([eyeL, eyeR], {
      scaleY: 1,
      ease: 'expo.out',
      transformOrigin: 'center center'
    });
  };
 
  const closeEyes = () => {
    const eyeL = document.querySelector('.eyeL');
    const eyeR = document.querySelector('.eyeR');
 
    gsap.to([eyeL, eyeR], {
      scaleY: 0.1,
      ease: 'expo.out',
      transformOrigin: 'center center'
    });
  };
 
  const calculateFaceMove = (e) => {
    const caretPos = e.target.selectionEnd;
    const div = document.createElement('div');
    const span = document.createElement('span');
    const copyStyle = getComputedStyle(e.target);
 
    Array.from(copyStyle).forEach(prop => {
      div.style[prop] = copyStyle[prop];
    });
 
    div.style.position = 'absolute';
    document.body.appendChild(div);
    div.textContent = e.target.value.substr(0, caretPos);
    span.textContent = e.target.value.substr(caretPos) || '.';
    div.appendChild(span);
 
    const inputRect = getPosition(e.target);
    const caretCoords = getPosition(span);
    const caretPosX = caretCoords.x - inputRect.x;
    const screenCenter = window.innerWidth / 2;
    const svgCenter = svgCoords.x + svgCoords.width / 2;
    const fromCenter = svgCenter - screenCenter;
    const faceMove = (caretPosX - screenCenter) / (screenCenter - 20) * 5;
 
    gsap.to('.face', {
      x: faceMove,
      ease: 'expo.out'
    });
 
    document.body.removeChild(div);
  };
 
  const resetFace = () => {
    gsap.to('.face', {
      x: 0,
      ease: 'expo.out'
    });
  };
 
  const getPosition = (el) => {
    const rect = el.getBoundingClientRect();
    return { x: rect.left + window.scrollX, y: rect.top + window.scrollY, width: rect.width, height: rect.height };
  };
 
  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    agent.Auth.login(email, password).then(res => {
      if (res.status === 1) {
        loginSuccessfully("sample_token_from_line23_pageTestLogin");
      } else {
        setError('Login failed. Please check your email and password.');
      }
    }).catch(() => {
      setError('Login failed. Please check your email and password.');
    });
  };
 
  const loginSuccessfully = (userData) => {
    localStorage.setItem("userData", userData);
    window.location.reload();
  };
 
  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="svgContainer" ref={svgRef}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 180">
          <path d="M120,20a80,80 0 1,0 0,160a80,80 0 1,0 0,-160" className="face" />
          <path d="M90,80a10,10 0 1,0 0,20a10,10 0 1,0 0,-20" className="eye eyeL" />
          <path d="M150,80a10,10 0 1,0 0,20a10,10 0 1,0 0,-20" className="eye eyeR" />
          <path d="M70,130 q50,40 100,0" className="mouth" />        </svg>
      </div>
      <div className="inputContainer">
        <label htmlFor="loginEmail" id="loginEmailLabel">Email</label>
        <input
          type="email"
          id="loginEmail"
          ref={emailRef}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="inputContainer">
        <label htmlFor="loginPassword" id="loginPasswordLabel">Mật khẩu</label>
        <input
          type={showPassword ? 'text' : 'password'}
          id="loginPassword"
          ref={passwordRef}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="checkbox"
          id="showPasswordCheck"
          checked={showPassword}
          onChange={(e) => setShowPassword(e.target.checked)}
        />
        <label
          htmlFor="showPasswordCheck"
          id="showPasswordToggle"
          onMouseDown={() => setShowPassword(true)}
          onMouseUp={() => setShowPassword(false)}
        >Hiển thị mật khẩu</label>
      </div>
      {error && <div className="error">{error}</div>}
      <div className="form-actions">
        <button type="submit">Đăng nhập</button>
        <footer>
          <p>Chưa có tài khoản? <a href="/register">Đăng ký ở đây</a></p>
        </footer>
      </div>
    </form>
  );
};
 
export default TestLogin;
 