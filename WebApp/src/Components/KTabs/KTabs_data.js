import React from 'react';
import AddNewStudent from './../AddNewStudent/AddNewStudent';
import KTab1 from './KTab1/KTab1';
const KTab_data =
[
    {
        "tabDisplayName" : "Tab 1",
        "component" : <KTab1/>
    },
    {
        "tabDisplayName" : "Tab 2",
        "component" : <AddNewStudent/>
    }

];

export default KTab_data;