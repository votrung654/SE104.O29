import React,{useState, useEffect}  from 'react';
import { Space,Card } from 'antd';
import './Homepage.css';


const Homepage = () => {
    
    const mainSpaceStyle = {
        width : "10%",
        
    }

    const [isLoading, setIsLoading] = useState(false);
    useEffect(()=>{
        setIsLoading(true);
        setTimeout(()=>{setIsLoading(false)},500);
    },[]);

    return(

        <div className="site-card-border-less-wrapper">
            <Space direction="horizontal" style={mainSpaceStyle}>
                <Card loading={isLoading} title="Events" style={{ width: 300 }}>
                    <p>SE104 - 1.2.3 in A 102</p>
                    <p>IT007 - 6.7.8 in E 3.2</p>
                </Card>
                <Card loading={isLoading} title="Tasks" style={{ width: 300 }}>
                    <p>Midterm Examination 2020</p>
                    <p>Project Summary Weekly</p>
                </Card>
                
                
            </Space>
            
        </div>

    )

}

export default Homepage;
