import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Space,
  Descriptions,
  Badge,
  Progress,
  Row,
  Col,
  Card,
} from "antd";
import "./Statistic.css";
import TextTranslation from "../TextTranslation/TextTranslation";
const Statistic = (props) => {
  const [statisticData, setStatisticData] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (props !== statisticData) {
      setStatisticData(props);
    }
  }, [props, statisticData]);

  const onOpenModal = (value) => {
    setModalVisible(value);
  };

  // const styleOfProgress = (colorCode) => {
  //     console.log(colorCode);
  //     return {
  //         '0%': colorCode,
  //         '100%': colorCode
  //     }
  // }

  return (
    <Space>
      <Button
        type="primary"
        onClick={() => onOpenModal(true)}
        disabled={props.disabled}
      >
        <TextTranslation textName="ClassInfo-Table-Statistic.1" />
      </Button>
      <Modal
        title={<TextTranslation textName="ClassInfo-Table-Statistic.1" />}
        centered
        visible={modalVisible}
        onOk={() => setModalVisible(false)}
        onCancel={() => setModalVisible(false)}
      >
        <Card className="statistic-card-wrapper">
          <Descriptions layout="vertical" bordered>
            <Descriptions.Item label="Class">
              {statisticData.pClassName}
            </Descriptions.Item>
            <Descriptions.Item label="Subject">
              {statisticData.pSubject}
            </Descriptions.Item>
            <Descriptions.Item label="Semester">HK2 - 2020</Descriptions.Item>
            <Descriptions.Item label="Lecture" span={1}>
              Mr. Nguyen Cong Hoan
            </Descriptions.Item>
            <Descriptions.Item label="Status" span={2}>
              <Badge status="success" text="Running" />
            </Descriptions.Item>

            <Descriptions.Item label="Statistic details">
              <Row gutter={16}>
                <Col span={5}>Excellence</Col>
                <Col span={19}>
                  <Progress
                    percent={40}
                    status="active"
                    strokeColor={{ "0%": "#1890ff", "100%": "#1890ff" }}
                  />
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={5}>Good</Col>
                <Col span={19}>
                  <Progress
                    percent={23}
                    status="active"
                    strokeColor={{ "0%": "#52c41a", "100%": "#52c41a" }}
                  />
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={5}>Medium</Col>
                <Col span={19}>
                  <Progress
                    percent={57}
                    status="active"
                    strokeColor={{ "0%": "#ff4d4f", "100%": "#ff4d4f" }}
                  />
                </Col>
              </Row>
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </Modal>
    </Space>
  );
};

export default Statistic;
