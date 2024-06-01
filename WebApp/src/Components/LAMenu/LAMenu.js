import React, {useEffect, useState} from 'react';
import { Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import {NavLink} from 'react-router-dom';
import './LAMenu.css';
import LAMenu_Structure from './LAMenu_Structure';

const { SubMenu } = Menu;

const LAMenu = () => {

    const resultMenuStructure = [];

    const renderSubmenu = (kStruct, kDisplayName) => {

        let i = 0;
        let itemInSubMenu = [];

        for(let str of kStruct){

            if(str.children){
                itemInSubMenu.push(renderSubmenu(str.children, str.displayName));
            }else{

                itemInSubMenu.push(
                    <Menu.Item key={str.displayName}>
                        <NavLink  to={str.to}>{str.displayName}</NavLink>
                    </Menu.Item>
                  
                );
            }
            i++;
        }

        return(
        <SubMenu key={kDisplayName} icon={<AppstoreOutlined />} title={kDisplayName}>
            {itemInSubMenu}
        </SubMenu>);
    }

    const renderLAMenuStructure = (kStruct) =>{


        let i=0;
        for(let str of kStruct){

            if(str.children){
                resultMenuStructure.push(renderSubmenu(str.children, str.displayName));
            }else{
            resultMenuStructure.push(
                <Menu.Item key={str.displayName}>
                    <NavLink  to={str.to}>{str.displayName}</NavLink>
                </Menu.Item>);
            }
            i++;
        }
    }

    const handleClick = e => {
        console.log('click ', e);
    };

    //const [mode, setMode] = useState();

    useEffect(()=>{
        setTimeout(function() {
            document.body.classList.add("loaded");
        }, 500);
    });

    renderLAMenuStructure(LAMenu_Structure);
    console.log(resultMenuStructure);

    return (
        <Menu
        onClick={handleClick}
        style={{ width: 200 }}
        defaultSelectedKeys={['Sent']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="light"
      >
        {resultMenuStructure}
      </Menu>
    );
}

export default LAMenu;