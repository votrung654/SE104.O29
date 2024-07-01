import React from 'react';
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";

//   import LMenu from './../../Components/LMenu/LMenu';
//   import MLMenu from './../../Components/LMenu/MLMenu';
//   import TopBar from './../../Components/TopBar/TopBar';
//   import Loader from './../../MainLoader/Loader';




const GuestRoutes = ({routes})=>{

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
        <div>
            <Switch>
                {showRoutes(routes)}
                <Route>
                    <Redirect to={{pathname: '/'}}/>
                </Route>
            </Switch>
        </div>
    );
}

export default GuestRoutes;