import React from 'react';
import "./System.css"
import {useTranslation} from 'react-i18next';
import SelectWithTyping from '../../Components/SelectWithTyping/SelectWithTyping';


const SSystem = () => 
{
    const { i18n } = useTranslation();
    const handleChangeLanguage = (lang) => {
    i18n.changeLanguage(lang);
}


const changeLanguage = (key) => {
    let langCode = ListOfLang[ListOfLang.findIndex(i=>i.name === key)].value;
    //message.info(`Click on item ${key}`);
    handleChangeLanguage(langCode);
};


const ListOfLang = [
    {langId  : 1, name: "English", value : "en"},
    {langId  : 2, name: "Vietnamese", value : "vi"},
    {langId  : 3, name: "Chinese", value : "cn"}
]




    return (
        
        <SelectWithTyping 
        options={ListOfLang} 
        optionName="name" optionKey="langId" 
        placeholder="Select language"
        callbackSelection={changeLanguage} 
        defaultValue={ListOfLang[ListOfLang.findIndex(i=>i.value === localStorage.getItem("i18nextLng"))].name || ""}
        />
    );
}

export default SSystem;