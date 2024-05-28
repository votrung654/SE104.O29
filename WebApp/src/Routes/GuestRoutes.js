import React from 'react';
//import SLogin from './../Sites/Login/Login';
import LoginPage from '../Containers/Pages/Login/Login';
import TestLogin from '../Containers/Pages/TestLogin/TestLogin';
import SetupPage from "../Containers/Pages/Setup";

const routes = [
    {
        path : '/',
        exact : true,
        main : () => <TestLogin/>
    },
    {
        path : '/setup',
        exact : true,
        main : () => <SetupPage />
    },
];

export default routes;