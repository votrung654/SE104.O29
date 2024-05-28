import React from 'react';
import {
    HomeOutlined,
    UserOutlined,
    ApartmentOutlined,
    FolderOutlined,
} from '@ant-design/icons';

import TextTranslation from '../../Components/TextTranslation/TextTranslation';


const MenuStructure =
[
    {
        "key" : "homepage",
        "displayName" : <TextTranslation textName="LMenu-Homepage.1"/>,
        "icon" : <HomeOutlined/>,
        "to" : "/"
    },
    {
        "key" : "personal",
        "displayName" : <TextTranslation textName="LMenu-Personal.1"/>,
        "icon" : <UserOutlined/>,
        "children" : [
            {
                "key" : "profile",
                "displayName" : <TextTranslation textName="LMenu-Profile.1"/>,
                "to" : "/profile"
            },
            {
                "key" : "schedule",
                "displayName" : <TextTranslation textName="LMenu-Schedule.1"/>,
                "to" : "/schedule"
            },
            {
                "key" : "inbox",
                "displayName" : <TextTranslation textName="LMenu-Inbox.1"/>,
                "to" : "/inbox"
            },
            {
                "key" : "sent",
                "displayName" : <TextTranslation textName="LMenu-Sent.1"/>,
                "to" : "/sent"
            },
            {
                "key" : "archive",
                "displayName" : <TextTranslation textName="LMenu-Archive.1"/>,
                "to" : "/archive"
            }
        ]
    },
    {
        "key" : "usage",
        "displayName" : <TextTranslation textName="LMenu-Usage.1"/>,
        "icon" : <ApartmentOutlined/>,
        "children" : [
            {
                "key" : "system",
                "displayName" : <TextTranslation textName="LMenu-System.1"/>,
                "to" : "/system"
            },
            {
                "key" : "users",
                "displayName" : <TextTranslation textName="LMenu-Users.1"/>,
                "to" : "/users"
            },
            {
                "key" : "visitation",
                "displayName" : <TextTranslation textName="LMenu-Visitation.1"/>,
                "to" : "/visitation"
            },
            
        ]
    },
    {
        "key" : "school",
        "displayName" : <TextTranslation textName="LMenu-School.1"/>,
        "icon" : <FolderOutlined/>,
        "children" : [
            {
                "key" : "students",
                "displayName" : <TextTranslation textName="LMenu-Students.1"/>,
                "to" : "/students"
            },
            {
                "key" : "class",
                "displayName" : <TextTranslation textName="LMenu-ClassAndSubject.1"/>,
                "to" : "/class"
            },
            {
                "key" : "report",
                "displayName" : <TextTranslation textName="LMenu-Report.1"/>,
                "to" : "/report"
            },
        ]
    },
    

];

export default MenuStructure;