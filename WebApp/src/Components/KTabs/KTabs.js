import React from 'react';
import { Tabs } from 'antd';
import KTab_data from './KTabs_data';


const { TabPane } = Tabs;


const renderTabs = (defaultActiveKey = 1, tabs) => {
    let tabPane = tabs.map((e, index)=>{
    return <TabPane tab={<span>{e.tabDisplayName}</span>} key={index}>{e.component}</TabPane>
    });
    return <Tabs defaultActiveKey={defaultActiveKey}>{tabPane}</Tabs>
}

const KTabs = () => {
    
    let elm = renderTabs(1, KTab_data);
    console.log(elm);
    return(
        <div>
            {elm}
        </div>
    );
}

export default KTabs;