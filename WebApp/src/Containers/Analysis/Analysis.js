import React, { useState } from "react";
import { Cascader } from "antd";
import SubjectList from "../ClassDetails/SubjectsList.json";
import SemesterList from "../ClassDetails/SemesterList.json";
import { useHttpClient } from "../../Hooks/http-hook";
import { connect } from "react-redux";
import SConfig from "../../config.json";
import "./Analysis.css";

import { Card } from "antd";

import SemesterAna from "./Semester/SemesterAna";
import SubjectAna from "./Subject/SubjectAna";
import StudentAna from "./Student";

import TextTranslation from "../../Components/TextTranslation/TextTranslation";

const mappedSubjectList = SubjectList.map((s) => {
  return {
    value: s.subjectValue,
    label: s.subjectName,
  };
});

const mappedSemesterList = SemesterList.map((s) => {
  return {
    value: s.semesterName,
    label: s.semesterName,
  };
});

const mappedSemesterListWithSubject = SemesterList.map((s) => {
  return {
    value: s.semesterName,
    label: s.semesterName,
    children: mappedSubjectList,
  };
});

const sleeper = (ms) => {
  return function (x) {
    return new Promise((resolve) => setTimeout(() => resolve(x), ms));
  };
};

const Analysis = (props) => {
  const { sendRequest } = useHttpClient();

  const [isLoading, setIsLoading] = useState(false);
  const [reportData, setReportData] = useState({ type: -1 });

  const options = [
    {
      value: "ana_subject",
      label: "Subject Report",
      children: mappedSemesterListWithSubject,
    },
    {
      value: "ana_semester",
      label: "Final Semester Report",
      children: mappedSemesterList,
    },
    {
      value: "student_report",
      label: "Students Report",
    },
  ];

  const findSthInArrayOfObject = (
    array,
    name,
    key,
    resultValueOfKey,
    defaultResult
  ) => {
    for (let i = 0; i < array.length; i++) {
      if (array[i][name] === key) {
        return array[i][resultValueOfKey];
      }
    }
    return defaultResult;
  };

  function onChange(value) {
    setIsLoading(true);
    if (value[0] === options[0].value) {
      let urlRequest = `${SConfig.SERVER_URL}${SConfig.SERVER_PORT}${SConfig.Report.SubjectReport}`;
      sendRequest(
        urlRequest,
        "POST",
        {
          sem_name: value[1],
          subj_name: value[2],
          yearid: props.yearData.yearid,
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
          console.log(data);
          setIsLoading(false);
          let resultData = [];
          for (let i = 0; i < data.NoStudent.length; i++) {
            let kSLDat = findSthInArrayOfObject(
              data.Pass,
              "name",
              data.NoStudent[i].name,
              "SoLuongDat",
              0
            );
            resultData.push({
              id: data.NoStudent[i].id,
              name: data.NoStudent[i].name,
              siso: data.NoStudent[i].SiSo,
              sldat: kSLDat,
              tyle: (kSLDat / data.NoStudent[i].SiSo) * 100,
            });
          }
          console.log(resultData);
          setReportData({
            type: 1,
            data: resultData,
          });
        })

        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }

    if (value[0] === options[1].value) {
      let urlRequest = `${SConfig.SERVER_URL}${SConfig.SERVER_PORT}${SConfig.Report.SemesterReport}`;
      sendRequest(
        urlRequest,
        "POST",
        {
          sem_name: value[1],
          yearid: props.yearData.yearid,
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
          console.log(data);
          setIsLoading(false);
          let resultData = [];
          for (let i = 0; i < data.NoStudent.length; i++) {
            let kSLDat = findSthInArrayOfObject(
              data.Pass,
              "name",
              data.NoStudent[i].name,
              "SoLuongDat",
              0
            );
            resultData.push({
              id: data.NoStudent[i].id,
              name: data.NoStudent[i].name,
              siso: data.NoStudent[i].SiSo,
              sldat: kSLDat,
              tyle: (kSLDat / data.NoStudent[i].SiSo) * 100,
            });
          }
          console.log(resultData);
          setReportData({
            type: 1,
            data: resultData,
          });
        })

        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }

    if (value[0] === options[2].value) {
      let urlRequest = `${SConfig.SERVER_URL}${SConfig.SERVER_PORT}${SConfig.Report.StudentReport}`;
      sendRequest(
        urlRequest,
        "POST",
        {
          student_name: "*",
          yearid: 1,
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
          if (data.status !== 1) return;
          setIsLoading(false);
          let resultData = [];
          data.data.map((student, index) =>
            resultData.push({
              ...student,
              Avg1: student.Avg1 ? Number(student.Avg1.toFixed(2)) : 0,
              Avg2: student.Avg2 ? Number(student.Avg2.toFixed(2)) : 0,
            })
          );
          console.log(resultData);
          setReportData({
            type: 2,
            data: resultData,
          });
        })

        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  }

  const noticeDiv = (
    <Card loading={isLoading}>
      <TextTranslation textName="ClassInfo-Noti-PleaseSelectOptionsAbove.1" />
    </Card>
  );

  const renderReport = (type) => {
    console.log(reportData);
    switch (type) {
      case -1:
        return noticeDiv;
      case 1:
        return (
          <SubjectAna
            isLoading={isLoading}
            classDetailsData={reportData.data}
          />
        );
      case 2:
        return <StudentAna isLoading={isLoading} data={reportData.data} />;
      default:
        return <SemesterAna isLoading={isLoading} />;
    }
  };

  return (
    <div>
      <Cascader
        size="large"
        options={options}
        onChange={onChange}
        style={{ width: "100%" }}
      />
      {renderReport(reportData.type)}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    yearData: state.yearData,
  };
};

export default connect(mapStateToProps)(Analysis);
