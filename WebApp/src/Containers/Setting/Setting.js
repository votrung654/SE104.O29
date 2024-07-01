import React, { useState } from 'react';
import { Button, Drawer, Form, Input, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useHttpClient } from "../../Hooks/http-hook";
import SConfig from "../../config.json";


const Setting = () => {
    const [visible, setVisible] = useState(false);
    
    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    const [value, setValue] = useState(0);
    const [settingCode, setSettingCode] = useState('');
    const [settingName, setSettingName] = useState('');
    
    const { sendRequest } = useHttpClient();

    const handleUpdateSetting = () => {
        const isValidSetting = () => {
            switch(settingCode) {
                case 'minAge':
                    return settingName === 'Minimum Age';
                case 'maxAge':
                    return settingName === 'Maximum Age';
                case 'maxClassSize':
                    return settingName === 'Maximum Class Size';
                case 'passingGrade':
                    return settingName === 'Passing Grade';
                default:
                    return false;
            }
        };

        // Check if settingCode is missing
        if (!settingCode) {
            message.error("Setting Code is required!");
            return;
        }
    
        // Check if settingName is missing
        if (!settingName) {
            message.error("Setting Name is required!");
            return;
        }
    
        // Check if value is missing
        if (!value) {
            message.error("Value is required!");
            return;
        }

        if (!settingCode || !settingName || !value) {
            message.error("All fields are required!");
            return;
        }


        if (!isValidSetting()) {
            message.error("Setting Code and Setting Name do not match!");
            return;
        }

        if (settingCode === 'passingGrade' && (value < 0 || value > 10)) {
            message.error("Passing Grade must be between 0 and 10!");
            return;
        }

        let responseData = `${SConfig.SERVER_URL}${SConfig.SERVER_PORT}${SConfig.SettingRoutes.UpdateSetting}`;
           
        sendRequest(
            responseData,
            "POST",
            {
                value: value,
                settingCode: settingCode,
                settingName: settingName
            },
            {
                "Content-Type": "application/json",
            }
        )
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if (data.status === 1) {
                message.success("Setting updated successfully!");
            } else {
                message.error("Failed to update setting!");
            }
        })
        .catch((error) => {
            console.log(error);
            message.error("Failed to update setting!");
        });
        onClose();

        console.log(`Value: ${value}`);
        console.log(`Setting Code: ${settingCode}`);
        console.log(`Setting Name: ${settingName}`);

    };

    

    return (
        <div>
            <Button type="primary" onClick={showDrawer}>
                <PlusOutlined /> New Setting
            </Button>
            <Drawer
                title="Create a new setting"
                width={720}
                onClose={onClose}
                visible={visible}
                bodyStyle={{ paddingBottom: 80 }}
                footer={
                    <div
                        style={{
                            textAlign: 'right',
                        }}
                    >
                        <Button onClick={onClose} style={{ marginRight: 8 }}>
                            Cancel
                        </Button>
                        <Button onClick={handleUpdateSetting} type="primary">
                            Submit
                        </Button>
                    </div>
                }
            >
                <Form layout="vertical" hideRequiredMark>
                    <Form.Item
                        name="value"
                        label="Value"
                        rules={[{ required: true, message: 'Please enter value' }]}
                    >
                        <Input placeholder="Please enter value" onChange={(e) => setValue(e.target.value)} />
                    </Form.Item>
                    <Form.Item
                        name="settingCode"
                        label="Setting Code"
                        rules={[{ required: true, message: 'Please select setting code' }]}
                    >
                        <select onChange={(e) => setSettingCode(e.target.value)} value={settingCode}>
                            <option value="">Select Setting Code</option>
                            <option value="minAge">minAge</option>
                            <option value="maxAge">maxAge</option>
                            <option value="maxClassSize">maxClassSize</option>
                            <option value="passingGrade">passingGrade</option>
                        </select>
                    </Form.Item>
                    <Form.Item
                        name="settingName"
                        label="Setting Name"
                        rules={[{ required: true, message: 'Please select setting name' }]}
                    >
                        <select onChange={(e) => setSettingName(e.target.value)} value={settingName}>
                            <option value="">Select Setting Name</option>
                            <option value="Minimum Age">Minimum Age</option>
                            <option value="Maximum Age">Maximum Age</option>
                            <option value="Maximum Class Size">Maximum Class Size</option>
                            <option value="Passing Grade">Passing Grade</option>
                        </select>
                    </Form.Item>
                </Form>
            </Drawer>

        </div>
    )

};

export default Setting;