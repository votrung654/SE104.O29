import React from 'react';
//import SLogin from './../Sites/Login/Login';
import RegisterPage from '../Containers/Pages/Register/Register';
import TestLogin from '../Containers/Pages/TestLogin/TestLogin';
import SetupPage from "../Containers/Pages/Setup";

const routes = [
    // Thêm route cho RegisterPage
    {
        path: '/register',
        exact: true,
        main: () => <RegisterPage />
    },
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