import React from 'react';
//import SLogin from './../Sites/Login/Login';
import SHomepage from '../Containers/Pages/Homepage/Homepage';
// import SNotFound from './../Sites/NotFound_404/NotFound_404';
//import ClassInfo from './../Sites/Class/ClassInfo';
// import History from './../Sites/History/History';
import SSystem from '../Containers/System/System';
//import Login from '../Sites/Login/Login';
import TestLogin from '../Containers/Pages/TestLogin/TestLogin'
import ClassDetails from '../Containers/ClassDetails/ClassDetails';
import Schedule from '../Containers/Schedule/Schedule';
import Profile from '../Containers/Profile/Profile';
import Analysis from '../Containers/Analysis/Analysis';
import Students from '../Containers/Students/Students';

const routes = [
    {
        path : '/',
        exact : true,
        main : () => <SHomepage />
    },
    {
        path : '/system',
        exact : false,
        main : () => <SSystem />
    },
    {
        path : '/users',
        exact : false,
        main : () => <TestLogin />
    },
    // {
    //     path : '/class/:classCode',
    //     exact : false,
    //     main : ({match}) => <ClassDetails match={match} />
    // },
    {
        path : '/class/',
        exact : false,
        main : ({match}) => <ClassDetails match={match} />
    },
    {
        path : '/report/',
        exact : false,
        main : ({match}) => <Analysis match={match} />
    },
    {
        path : '/students/',
        exact : false,
        main : ({match}) => <Students match={match} />
    },
    {
        path : '/schedule',
        exact : false,
        main : () => <Schedule />
    },
    {
        path : '/profile',
        exact : false,
        main : () => <Profile />
    },
];

export default routes;