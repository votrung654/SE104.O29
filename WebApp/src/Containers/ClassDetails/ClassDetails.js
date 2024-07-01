import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import SelectWithTyping from "../../Components/SelectWithTyping/SelectWithTyping";
import SubmitWithLoading from "../../Components/ButtonWithLoading/ButtonWithLoading";

import StatisticScore from "../../Components/Statistic/Statistic";

import SConfig from "../../config.json";

import { Card, Col, Row, message, Collapse, Button } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";

import Subjectslist from "./SubjectsList.json";
import SemesterList from "./SemesterList.json";
import ScoreDetails from "./ScoreDetails/ScoreDetails";
import StudentDetails from "./StudentDetails/StudentDetails";

import TextTranslation from "../../Components/TextTranslation/TextTranslation";
import { useHttpClient } from "../../Hooks/http-hook";

const ClassDetails = (props) => {
  console.log(props.match.params.classCode);

  console.log(props);

  const [selectedClass, setSelectedClass] = useState();

  const [semester, setSemester] = useState();
  const [selectedSubject, setSelectedSubject] = useState();

  const { sendRequest } = useHttpClient();

  const { Panel } = Collapse;

  // Fetch data
  const [selectedClassDetailsData, setSelectedClassDetailsData] = useState({});
  const [isFetchingClassDetailsData, setIsFetchingClassDetailsData] = useState(
    false
  );

  const [tableEditable, setTableEditable] = useState(false);

  // Redirect

  const onSelectClass = (kClass) => {
    console.log("kClass" + kClass);
    setSelectedClass(kClass);
    //rHistory.push(`/class/${selectedClass}`);
  };

  console.log(props);
  console.log(selectedSubject);

  const sleeper = (ms) => {
    return function (x) {
      return new Promise((resolve) => setTimeout(() => resolve(x), ms));
    };
  };

  useEffect(() => {}, []);

  const fetchClassDetailsData = () => {
    setIsFetchingClassDetailsData(true);
    setSelectedClassDetailsData({ type: -1 });
    setTableEditable(false);
    let urlRequest = "";
    if (selectedSubject === "Student Details") {
      urlRequest = `${SConfig.SERVER_URL}${SConfig.SERVER_PORT}${SConfig.ClassRoutes.GetListStudentInClass}`;
      sendRequest(
        urlRequest,
        "POST",
        {
          class_name: selectedClass,
          yearid: 1,
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
          setSelectedClassDetailsData({
            type: "studentdetails",
            data,
          });
          setIsFetchingClassDetailsData(false);
          message.success(
            `${selectedSubject} data of ${selectedClass} loaded successfully !`
          );
        })

        .catch((error) => {
          console.log(error);
          message.error(
            `Cannot get ${selectedSubject} data of ${selectedClass} !`
          );
          setSelectedClassDetailsData([]);
          setIsFetchingClassDetailsData(false);
        });
    } else {
      urlRequest = `${SConfig.SERVER_URL}${SConfig.SERVER_PORT}${SConfig.ClassRoutes.GetTranscripts}`;
      sendRequest(
        urlRequest,
        "POST",
        {
          class_name: selectedClass,
          sem_name: semester,
          subj_name: selectedSubject,
          yearid: 1,
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
          setSelectedClassDetailsData({
            type: "subjectscores",
            data,
          });
          setIsFetchingClassDetailsData(false);
          message.success(
            `${selectedSubject} data of ${selectedClass} loaded successfully !`
          );
        })

        .catch((error) => {
          console.log(error);
          message.error(
            `Cannot get ${selectedSubject} data of ${selectedClass} !`
          );
          setSelectedClassDetailsData([]);
          setIsFetchingClassDetailsData(false);
        });
    }
  };

  return (
    <div className="site-card-wrapper">
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
            <Col span={8}>
              <Card
                loading={props.classData.classData.length > 0 ? false : true}
                size={300}
                title={
                  <TextTranslation textName="ClassInfo-Table-SelectClass.1" />
                }
                bordered={false}
              >
                <SelectWithTyping
                  value={props.match.params.classCode}
                  callbackSelection={setSelectedClass}
                  options={props.classData.classData}
                  optionValue="name"
                  optionName="name"
                  optionKey="id"
                  placeholder="Select class"
                  disabled={isFetchingClassDetailsData}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card
                loading={props.classData.classData.length > 0 ? false : true}
                title={
                  <TextTranslation textName="ClassInfo-Table-SelectSemester.1" />
                }
                bordered={false}
              >
                <SelectWithTyping
                  callbackSelection={setSemester}
                  options={SemesterList}
                  optionValue="semesterName"
                  optionName="semesterName"
                  optionKey="seid"
                  placeholder="Select semester"
                  disabled={isFetchingClassDetailsData}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card
                loading={props.classData.classData.length > 0 ? false : true}
                title={
                  <TextTranslation textName="ClassInfo-Table-SelectDetails.1" />
                }
                bordered={false}
              >
                <SelectWithTyping
                  callbackSelection={setSelectedSubject}
                  options={[
                    { sid: 0, subjectName: "Student Details" },
                    ...Subjectslist,
                  ]}
                  optionValue="subjectValue"
                  optionName="subjectName"
                  optionKey="sid"
                  placeholder="Select subject"
                  disabled={isFetchingClassDetailsData}
                />
              </Card>
            </Col>
          </Row>
          <SubmitWithLoading
            label="Lookup"
            disabled={!(selectedClass && selectedSubject && semester)}
            isLoading={isFetchingClassDetailsData}
            onClick={fetchClassDetailsData}
            maxTimeLoading={1000}
          />

          <StatisticScore
            pClassName={selectedClass}
            pSubject={selectedSubject}
            disabled={
              !(
                selectedClass &&
                semester &&
                selectedClassDetailsData.type !== "studentdetails" &&
                selectedClassDetailsData.data
              )
            }
          />
          <Button
            type="primary"
            danger={tableEditable}
            onClick={() => setTableEditable(!tableEditable)}
            disabled={
              !(
                selectedClass &&
                semester &&
                selectedClassDetailsData.type !== "studentdetails" &&
                selectedClassDetailsData.data
              )
            }
          >
            {!tableEditable ? (
              <TextTranslation textName="ClassInfo-Table-Edit.1" />
            ) : (
              "Save"
            )}
          </Button>
        </Panel>
      </Collapse>

      {!selectedClassDetailsData.type ? (
        <div>
          <TextTranslation textName="ClassInfo-Noti-PleaseSelectOptionsAbove.1" />
        </div>
      ) : selectedClassDetailsData.type === "studentdetails" ? (
        <StudentDetails
          tableEditable={tableEditable}
          selectedClass={selectedClass}
          classDetailsData={selectedClassDetailsData.data}
          isLoading={isFetchingClassDetailsData}
        />
      ) : (
        <ScoreDetails
          tableEditable={tableEditable}
          callbackUpdateSuccess={fetchClassDetailsData}
          classDetailsData={selectedClassDetailsData.data}
          isLoading={isFetchingClassDetailsData}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    classData: state.classData,
    yearid: state.yearid,
  };
};

export default connect(mapStateToProps)(ClassDetails);
