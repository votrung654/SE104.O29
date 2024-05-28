import React from 'react';
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";

//import LMenu from './../../Components/LMenu/LMenu';
// import MLMenu from './../../Components/LMenu/MLMenu';
// import TopBar from './../../Components/TopBar/TopBar';
// import Loader from './../../MainLoader/Loader';
// import LAMenu from './../../Components/LAMenu/LAMenu';
import MainLayout from './../MainLayout/MainLayout';


const LoggedRoutes = ({routes})=>{

    const showRoutes = (routes) => {
        var result = null;
        //console.log(localStorage.getItem('user'));
        if(routes.length > 0){
            result = routes.map((route, index) => {
                return (
                    <Route 
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        component={route.main}
                    />
    
                    
                );
                
            })
            
        }
        return result;
    }
    
    

    return (
        <MainLayout kRoutes={showRoutes(routes)}/>
    );
}

export default LoggedRoutes;