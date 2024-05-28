import React from 'react';

import { Input, Form } from 'antd';

const InputEmail = () => {
    
    return(
        <Form.Item name={['email']}  rules={[{ type: 'email' }]} style={{marginBottom: "0px"}}>
            <Input placeholder="Enter email address"/>
        </Form.Item>
    )
}

export default InputEmail;