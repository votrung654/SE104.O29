import React, { useState } from "react";
import { Button, Drawer, Form, Input, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useHttpClient } from "../../Hooks/http-hook";
import SConfig from "../../config.json";
import TextTranslation from "../TextTranslation/TextTranslation";
 
const sleeper = (ms) => {
  return function (x) {
    return new Promise((resolve) => setTimeout(() => resolve(x), ms));
  };
};

const AddNewClass = (props) => {
  const [visible, setVisible] = useState(false);
  const [classId, setClassId] = useState();
  const [className, setClassName] = useState();
  const [grade, setGrade] = useState();
  const [year, setYear] = useState();
  const { sendRequest } = useHttpClient();
 
  const showDrawer = () => {
    setVisible(true);
  };
 
  const onClose = () => {
    setVisible(false);
  };
 
  const requestCreateClass = () => {
    if (!className || !grade || !year) {
      message.error("All fields are required!");
      return;
    }

    const gradeClasses = {
      10: ['10A1', '10A2', '10A3', '10A4'],
      11: ['11A1', '11A2', '11A3'],
      12: ['12A1', '12A2']
    };
 
    let gradeNumber = Number(grade);

    if (![10, 11, 12].includes(gradeNumber)) {
      message.error("Invalid grade. Only grades 10, 11, and 12 are allowed.");
      return;
    }
  
    if (!gradeClasses[gradeNumber].includes(className)) {
      message.error(`Invalid class name for grade ${grade}. Allowed classes are: ${gradeClasses[gradeNumber].join(', ')}`);
      return;
    }

    let yearNumber = Number(year);
    if (![1, 2].includes(yearNumber)) {
      message.error("Invalid year. Only 1 (for 2023) and 2 (for 2024) are allowed.");
      return;
    }

    let urlRequest = `${SConfig.SERVER_URL}${SConfig.SERVER_PORT}${SConfig.ClassRoutes.InsertClass}`;
 
    sendRequest(
      urlRequest,
      "POST",
      {
        id: classId,
        name: className,
        grade: gradeNumber,
        _year: yearNumber
      },
      {
        "Content-Type": "application/json",
      }
    )
    .then((response) => {
      return response.json();
    })
    .then(sleeper(500))
    .then((data) => {
      console.log(data);
      setClassId(""); // Clear the input field
      setClassName(""); // Clear the input field
      setGrade(""); // Clear the input field
      setYear(""); // Clear the input field
      message.success(`Add class successfully !`);
    })
    .catch((error) => {
      console.log(error);
      message.error(`Something wrong !`);
    });
    onClose();

    console.log(`Server URL: ${SConfig.SERVER_URL}`);
    console.log(`Server Port: ${SConfig.SERVER_PORT}`);
    console.log(`Add Class API Path: ${SConfig.ClassRoutes.InsertClass}`);
  };
 
  return (
    <>
      <Button 
        type="primary" 
        onClick={showDrawer} 
        style={{...props.style, backgroundColor: '#52c41a', borderColor: '#52c41a'}} 
        disabled={props.disabled}
      >
        <PlusOutlined />{" "}
        <TextTranslation textName="ClassInfo-Table-NewClass.1" />
      </Button>
      <Drawer
        title={<TextTranslation textName="ClassInfo-Table-NewClass.1" />}
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div 
            style={{ 
            textAlign: "right",
            }}
          >
            <Button onClick={onClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button
                disabled={
                !(
                  className &&
                  grade &&
                  year
                )
              } 
              onClick={requestCreateClass}
              type="primary"
            >
              Submit
            </Button>
          </div>
        }
      >
        <Form 
          layout="vertical" 
          hideRequiredMark
          >
          <Form.Item
            name="name"
            label={<TextTranslation textName="ClassInfo-Table-Name.1" />}
            rules={[{ required: true, message: "Please enter class name" }]}
          >
            <Input
              id="className"
              onChange={(e) => setClassName(e.target.value)}
              placeholder="Enter class's name"
            />
          </Form.Item>
          <Form.Item
            name="grade"
            label="Grade"
            rules={[{ required: true, message: "Please enter grade" }]}
          >
            <Input
              id="grade"
              onChange={(e) => setGrade(e.target.value)}
              placeholder="Enter grade"
            />
          </Form.Item>
          <Form.Item
            name="year"
            label="Year"
            rules={[{ required: true, message: "Please enter year" }]}
          >
            <Input
              id="year"
              onChange={(e) => setYear(e.target.value)}
              placeholder="Enter year"
            />
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};
 
export default AddNewClass;