import React, {useState} from 'react';
import './MLMenu.css';
import {NavLink} from 'react-router-dom';

const MLMenu = () => {

    const [isOpen, setIsOpen] = useState(false);
 
    const toggleMenu = ()=>{
        setIsOpen(!isOpen);
    }

    return (
        <div id="MLMenu" className={isOpen?'mlmenu-opened':'mlmenu-closed'}>
            <div id="MLMenu-toggle" onClick={()=>toggleMenu()}>
                
            </div>

            <div id="MLMenu-list" onClick={()=>toggleMenu()}>
                <NavLink to="/"><div className="item-1">Homepage</div></NavLink>
                <NavLink to="/class/10C6"><div className="item-1">10C6</div></NavLink>
                <NavLink to="/class/10C9"><div className="item-1">10C9</div></NavLink>
                <NavLink to="/class/10C18"><div className="item-1">10C18</div></NavLink>
                <div className="item-1">abc</div>
                <div className="item-1">xyz</div>
                <div className="item-1">ipz</div>
                <div className="item-1">thb</div>
                <div className="item-1">abc</div>
                <div className="item-1">xyz</div>
                <div className="item-1">ipz</div>
                <div className="item-1">thb</div>
            </div>
        </div>
    );
}
export default MLMenu;