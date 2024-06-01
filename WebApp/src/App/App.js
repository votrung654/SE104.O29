import React from 'react';

import loggedroutes from './../Routes/LoggedRoutes';
import guestroutes from './../Routes/GuestRoutes';

import LoggedRoutes from './LoggedRoutes/LoggedRoutes';
import GuestRoutes from './GuestRoutes/GuestRoutes';
import './App.css';
import {
    BrowserRouter as Router,
  } from "react-router-dom";

function App() {
    return (
        <Router>
            { localStorage.getItem('userData') ?
                <LoggedRoutes routes={loggedroutes}/> :
                <GuestRoutes routes={guestroutes}/>
            }
        </Router>
    );
}

export default App;
