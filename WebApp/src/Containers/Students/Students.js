import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Col,
  Row,
  message,
  Collapse,
  Button,
  Table,
  Modal,
  Card,
  Form,
  Input,
  Checkbox,
  Select,
  DatePicker,
} from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import SConfig from "../../config.json";
import { useHttpClient } from "../../Hooks/http-hook";

import AddNewStudent from "../../Components/AddNewStudent/AddNewStudent";
import ButtonWithLoading from "../../Components/ButtonWithLoading/ButtonWithLoading";
import TextTranslation from "../../Components/TextTranslation/TextTranslation";
import "./Students.css";
import moment from "moment";

const Students = (props) => {
  const { Panel } = Collapse;
  const { sendRequest } = useHttpClient();
  const [isLoading, setIsLoading] = useState(false);
  const [studentData, setStudentData] = useState([]);

  const sleeper = (ms) => {
    return function (x) {
      return new Promise((resolve) => setTimeout(() => resolve(x), ms));
    };
  };

  const requestGetAllStudent = () => {
    setIsLoading(true);
    let urlRequest = `${SConfig.SERVER_URL}${SConfig.SERVER_PORT}${SConfig.Student.GetAllStudents}`;
    sendRequest(urlRequest, "GET")
      .then((response) => {
        return response.json();
      })

      .then(sleeper(500))

      .then((data) => {
        let dataWithKey = [];
        let index = 1110;
        data.forEach((e) => {
          dataWithKey.push({
            ...e,
            key: index,
            gender: e["gender"] === 1 ? "Male" : "Female",
            dob: moment(e["dob"]).format("DD/MM/YYYY"),
          });
          index++;
        });

        console.log(dataWithKey);
        setStudentData(dataWithKey);
        setIsLoading(false);
        message.success(`Get all students successfully !`);
      })

      .catch((error) => {
        console.log(error);
        message.error(`Cannot get list of students !`);
        setStudentData([]);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    requestGetAllStudent();
  }, []);

  // Begin Structure of Table
  const columns = [
    {
      title: (
        <>
          <TextTranslation textName="ClassInfo-Table-No.1" kClass="pcview" />{" "}
        </>
      ),
      width: 100,
      dataIndex: "id",
      key: "id",
      fixed: "left",
    },
    {
      title: (
        <>
          <TextTranslation textName="ClassInfo-Table-Name.1" kClass="pcview" />{" "}
        </>
      ),
      dataIndex: "name",
      key: "name",
      width: 150,
    },
    {
      title: (
        <>
          <TextTranslation textName="ClassInfo-Table-Sex.1" kClass="pcview" />{" "}
        </>
      ),
      dataIndex: "gender",
      key: "gender",
      width: 150,
    },
    {
      title: (
        <>
          <TextTranslation textName="ClassInfo-Table-DOB.1" kClass="pcview" />{" "}
        </>
      ),
      dataIndex: "dob",
      key: "dob",
      width: 150,
    },
    {
      title: (
        <>
          <TextTranslation textName="ClassInfo-Table-Email.1" kClass="pcview" />{" "}
        </>
      ),
      dataIndex: "email",
      key: "email",
      width: 150,
    },
    {
      title: (
        <>
          <TextTranslation
            textName="ClassInfo-Table-Address.1"
            kClass="pcview"
          />{" "}
        </>
      ),
      dataIndex: "address",
      key: "address",
      width: 150,
    },

    {
      title: (
        <>
          <TextTranslation
            textName="ClassInfo-Table-Action.1"
            kClass="pcview"
          />{" "}
        </>
      ),
      key: "operation",
      fixed: "right",
      width: 100,
      render: (val) => (
        <a onClick={() => showModal(val)}>
          <TextTranslation textName="ClassInfo-Table-Edit.1" kClass="pcview" />{" "}
        </a>
      ),
    },
  ];
  // End Structure of Table

  // Begin Update Student Modal
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedStudentToUpdate, setSelectedStudentToUpdate] = useState({});
  const dateFormat = "DD/MM/YYYY";

  const [form] = Form.useForm();

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 5, span: 16 },
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const showModal = (student) => {
    requestGetStudentDetails(student.id);
    setSelectedStudentToUpdate(student);
    setModalVisible(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);

    requestUpdateStudent();
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setModalVisible(false);
  };

  const requestGetStudentDetails = (studentId) => {
    setIsLoading(true);
    let urlRequest = `${SConfig.SERVER_URL}${SConfig.SERVER_PORT}${SConfig.Student.GetStudentDetails}${studentId}`;
    sendRequest(urlRequest, "GET")
      .then((response) => {
        return response.json();
      })

      .then(sleeper(500))

      .then((data) => {
        console.log(data); // kIMPORTANT: data is Array, contains Objects
        setIsLoading(false);
        message.success(`Get student details successfully !`);
        form.setFieldsValue({
          name: data[0].name,
          email: data[0].email,
          gender: data[0].gender === 1 ? "male" : "female",
          dob: moment(data[0].dob, "YYYY/MM/DD"),
          address: data[0].address,
        });
      })

      .catch((error) => {
        console.log(error);
        message.error(`Cannot get student details !`);
        setIsLoading(false);
      });
  };

  const requestUpdateStudent = () => {
    let urlRequest = `${SConfig.SERVER_URL}${SConfig.SERVER_PORT}${SConfig.Student.UpdateStudent}`;
    sendRequest(
      urlRequest,
      "POST",
      {
        id: selectedStudentToUpdate.id,
        name: form.getFieldValue("name"),
        gender: form.getFieldValue("gender") === "male" ? 1 : 0,
        dob: moment(form.getFieldValue("dob")).format("YYYY/MM/DD 12:11:11"),
        addr: form.getFieldValue("address"),
        mail: form.getFieldValue("email"),
      },
      {
        "Content-Type": "application/json",
      }
    )
      .then((response) => {
        return response.json();
      })

      .then(sleeper(1000))

      .then((data) => {
        console.log(data); // kIMPORTANT: data is Array, contains Objects
        setConfirmLoading(false);
        if (data.status === 1) {
          message.success(
            `Update student ${selectedStudentToUpdate.id} successfully !`
          );
          setModalVisible(false);
          requestGetAllStudent();
        } else {
          throw new Error("Something wrong !!");
        }
      })

      .catch((error) => {
        setConfirmLoading(false);
        console.log(error);
        message.error(`Cannot update ${selectedStudentToUpdate.id} details !`);
      });
  };
  // End Update Student Modal

  return (
    <>
      <Collapse
        bordered={false}
        defaultActiveKey={["1"]}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        className="site-collapse-custom-collapse"
        style={{ marginBottom: "10px" }}
      >
        <Panel
          header="Class data selection"
          key="1"
          className="site-collapse-custom-panel"
        >
          <Row gutter={16}>
            <Col span={8}></Col>
          </Row>

          <ButtonWithLoading
            label="Reload"
            isLoading={isLoading}
            onClick={requestGetAllStudent}
            maxTimeLoading={10000}
          />

          <Modal
            title="Update student"
            visible={modalVisible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            okText="Update"
          >
            <Card
              id="formUpdateStudent"
              title={`MSSV: ${selectedStudentToUpdate.id}`}
              loading={isLoading}
            >
              <Form
                form={form}
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[
                    { required: true, message: "Please input student name!" },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="gender"
                  label="Gender"
                  rules={[{ required: true }]}
                >
                  <Select
                    placeholder="Select a option and change input text above"
                    allowClear
                  >
                    <Select.Option value="male">Male</Select.Option>
                    <Select.Option value="female">Female</Select.Option>
                    <Select.Option value="other">Other</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please input student email!" },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="DoB"
                  name="dob"
                  rules={[
                    { required: true, message: "Please select Date of Birth!" },
                  ]}
                >
                  <DatePicker format="DD/MM/YYYY" />
                </Form.Item>

                <Form.Item
                  label="Address"
                  name="address"
                  rules={[
                    {
                      required: true,
                      message: "Please input student address!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Form>
            </Card>
          </Modal>
          <AddNewStudent
            //disabled={isFetchingClassDetailsData}
            classData={props.classData.classData}
            style={{
              marginLeft: "5px",
              marginRight: "5px",
              backgroundColor: "#52c41a",
              borderColor: "#52c41a",
            }}
            optionName="name"
            optionKey="id"
            callbackSuccess={requestGetAllStudent}
          />
        </Panel>
      </Collapse>

      <Table
        bordered
        loading={isLoading}
        columns={columns}
        dataSource={studentData}
        scroll={{ x: 50, y: 500 }}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    classData: state.classData,
    yearid: state.yearid,
  };
};

export default connect(mapStateToProps)(Students);
