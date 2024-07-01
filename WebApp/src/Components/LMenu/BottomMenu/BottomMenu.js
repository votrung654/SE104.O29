import React from 'react';
import './BottomMenu.css';
import FlagVietnam from './../../SVG/Nations/Vietnam';
import FlagUK from './../../SVG/Nations/UnitedKingdom';
import FlagChina from './../../SVG/Nations/China';

import {useTranslation} from 'react-i18next';


const BottomMenu = () => {

    const {i18n} = useTranslation(); 

    function handleChangeLanguage(lang){
        i18n.changeLanguage(lang);
    }

    return (
        <div id="lmenu-bottom-wrapper">
            <div id="lmenu-bottom-flagarea">
                <div className="flagElm">
                    <div onClick={()=>handleChangeLanguage('vi')}><FlagVietnam /></div>
                </div>
                <div className="flagElm">
                    <div onClick={()=>handleChangeLanguage('en')}><FlagUK /></div>
                </div>
                <div className="flagElm">
                    <div onClick={()=>handleChangeLanguage('cn')}><FlagChina /></div>
                </div>
            </div>
            
            <div id="lmenu-bottom-textarea">
                v1.0.3
            </div>
            
        </div>
    );
}

export default BottomMenu;