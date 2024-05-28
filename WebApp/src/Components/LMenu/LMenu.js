import React , { useState, useEffect } from 'react';
//import './LMenu.css';


import {
    NavLink
} from "react-router-dom";
import TextTranslation from './../TextTranslation/TextTranslation';
import BottomMenu from './BottomMenu/BottomMenu';


const LMenu = () => {

    const [classes, setClasses] = useState([]);

    const [statusCode, setStatusCode] = useState(0);
   

    useEffect(()=>{
        fetch('https://api.kunbr0.com/se104/classes.php')
            .then((response) => {
                return response.json();
            })


            .then((classes) => {
                console.log(classes);
                
                setClasses(classes);
                setStatusCode(99);

                setTimeout(function() {
                    document.body.classList.add("loaded");
                }, 500);
            })
            
            .catch((error) => {
                setStatusCode(-1);
            });
            
        }, []);

            
    

    const SelectMenu = (menuName) => {
        let idKun = "section-" + menuName;
        if(document.getElementById(idKun)){
            document.getElementById(idKun).checked = "true";
        }
    }

    const updateMenu = () => {
        let currentLocation = window.location.pathname.split('/')[1];
        switch(currentLocation){
            case "inbox": case "sent" : case "archive":    
                SelectMenu("personal");
                break;
            case "system": case "users": case "visitation": 
                SelectMenu("usage");
                break;
            case "class": 
                SelectMenu("class");
                break;
            default:
                SelectMenu("homepage");
                break;
        }
    }

    
    
    

        

        updateMenu();
        let elmMenuClasses = null;
        if(statusCode === 99){
            if(classes.length){
                elmMenuClasses = classes.map((kClass) => 
                    <NavLink key={kClass.classID} to={"/class/" + kClass.className} activeClassName="activeSubMenu"><li><i className="fa fa-star" /><span>{kClass.className}</span></li></NavLink>
                );
            }
        }

        return(
            
            <div className="left-menu">
                <div id="lmenu-top-wrapper">
                    <div className="logo"><i className="fa fa-home" />
                        <div>This is a menu ^^</div>
                    </div>
                    <div className="accordion">
                        
                        <NavLink id="lmenu-elm"  to="/">
                        <div className="section">                      
                            <input type="radio" name="accordion-1" id="section-homepage" />
                            <label htmlFor="section-0"  onClick={()=>SelectMenu("homepage")} ><TextTranslation textName="LMenu-Homepage.1" /></label>                       
                        </div>
                        </NavLink>

                        
                        <div className="section">
                            <input type="radio" name="accordion-1" id="section-personal" />
                            <label htmlFor="section-1"  onClick={()=>SelectMenu("personal")} ><TextTranslation textName="LMenu-Personal.1" /></label>
                            <div className="content">
                                <ul>
                                <NavLink activeClassName="activeSubMenu" exact to="/inbox"><li><i className="fa fa-inbox" /><TextTranslation textName="LMenu-Inbox.1" /></li></NavLink>
                                <NavLink activeClassName="activeSubMenu" exact to="/sent"><li><i className="fa fa-share" /><TextTranslation textName="LMenu-Sent.1" /></li></NavLink>
                                <NavLink activeClassName="activeSubMenu" exact to="/archive"><li><i className="fa fa-archive" /><TextTranslation textName="LMenu-Archive.1" /></li></NavLink>
                                </ul>
                            </div>
                        </div>
                        

                        <div className="section">
                            <input type="radio" name="accordion-1" id="section-usage"/>
                            <label htmlFor="section-2" onClick={()=>SelectMenu("usage")}> <TextTranslation textName="LMenu-Usage.1" /></label>
                            <div className="content">
                                <ul>
                                <NavLink activeClassName="activeSubMenu" exact to="/system"><li><i className="fa fa-cog" /><TextTranslation textName="LMenu-System.1" /></li></NavLink>
                                <NavLink activeClassName="activeSubMenu" exact to="/users"><li><i className="fa fa-group" /><TextTranslation textName="LMenu-Users.1" /></li></NavLink>
                                <NavLink activeClassName="activeSubMenu" exact to="/visitation"><li><i className="fa fa-sitemap" /><TextTranslation textName="LMenu-Visitation.1" /></li></NavLink>

                                </ul>
                            </div>
                        </div>

                        <div className="section">
                            <input className="autoOverFlow" type="radio" name="accordion-1" id="section-class"/>
                            <label htmlFor="section-3" onClick={()=>SelectMenu("class")} > <TextTranslation textName="LMenu-Classes.1" /></label>
                            <div className="content">
                                <ul>
                                    {elmMenuClasses}
                                
                                </ul>
                            </div>
                        </div>

                        <div className="section">
                        <input type="radio" name="accordion-1" id="section-4" defaultValue="toggle" />
                        <label htmlFor="section-4"> <span>Section 4</span></label>
                        <div className="content" />
                        </div>
                        </div>
                </div>
                <BottomMenu />
            </div>
        );
    
}

export default LMenu;
