import React, { useEffect, useState } from "react";
import { Table, InputNumber } from "antd";
import TextTranslation from "../../../Components/TextTranslation/TextTranslation";
import ScoreCoefficient from "../SubjectCoefficient.json";
import "./ScoreDetails.css";
import { useSSR } from "react-i18next";
import SConfig from "../../../config.json";
import { useHttpClient } from "../../../Hooks/http-hook";
import { Card, Col, Row, message, Space, Collapse, Button } from "antd";

const columnsOfSubjectDetails = [
  {
    title: (
      <>
        <TextTranslation textName="ClassInfo-Table-No.1" kClass="pcview" />{" "}
      </>
    ),
    dataIndex: "key",
    key: "key",
    width: 8,
    fixed: "left",
  },

  {
    title: (
      <>
        <TextTranslation textName="ClassInfo-Table-Name.1" kClass="pcview" />{" "}
      </>
    ),
    dataIndex: "Name",
    key: "Name",
    width: 35,
    sorter: (a, b) => a.ID - b.ID,
  },
  {
    title: (
      <>
        <TextTranslation textName="ClassInfo-Table-15mins.1" kClass="pcview" />{" "}
      </>
    ),
    dataIndex: "exam_1",
    key: "exam_1",
    width: 12,
  },
  {
    title: (
      <>
        <TextTranslation textName="ClassInfo-Table-45mins.1" kClass="pcview" />{" "}
      </>
    ),
    dataIndex: "exam_2",
    key: "exam_2",
    width: 12,
  },
  {
    title: (
      <>
        <TextTranslation textName="ClassInfo-Table-final.1" kClass="pcview" />{" "}
      </>
    ),
    dataIndex: "final",
    key: "final",
    width: 12,
  },
];

// for (let i = 0; i < 100; i++) {
//   data.push({
//     key: i,
//     no: i,
//     name: 'Nguyen Thi Quynh Ngan',
//     age: i + 1,
//     s15mins: '8.50',
//     s45mins: '7.75',
//     smidterm: '8.25',
//     sendterm: '6.50',
//     final: '7.74',
//     action: 'Edit',
//   });
// }

const calculateFinalScore = (e) => {
  let coef = ScoreCoefficient;
  return e.exam_1 * 1 * coef.exam_1 + e.exam_2 * 1 * coef.exam_2;
};

// Map of changed row to push

const StudentScoresTable = (props) => {
  const [classDetailsData, setClassDetailsData] = useState([{}]);
  const [tableData, setTableData] = useState([]);
  const [tableEditable, setTableEditable] = useState(false);

  const [listOfChangedRows, setListOfChangedRows] = useState({});

  const { sendRequest } = useHttpClient();
  const sleeper = (ms) => {
    return function (x) {
      return new Promise((resolve) => setTimeout(() => resolve(x), ms));
    };
  };

  const updateScore = (payload) => {
    let urlRequest = `${SConfig.SERVER_URL}${SConfig.SERVER_PORT}${SConfig.ClassRoutes.UpdateTranscripts}`;
    sendRequest(urlRequest, "POST", payload, {
      "Content-Type": "application/json",
    })
      .then((response) => {
        return response.json();
      })

      .then(sleeper(500))

      .then((data) => {
        console.log(data);
        message.success(`Updated successfully !`);
        props.callbackUpdateSuccess();
      })

      .catch((error) => {
        console.log(error);
        message.error(`Updated Failed !`);
      });
  };

  useEffect(() => {
    if (props.tableEditable !== tableEditable) {
      if (props.tableEditable === false) {
        if (Object.keys(listOfChangedRows).length > 0) {
          let arrayToUpdate = [];
          Object.keys(listOfChangedRows).forEach((e) => {
            arrayToUpdate.push({
              ...listOfChangedRows[e],
              student_id: listOfChangedRows[e].ID,
              sem_name: listOfChangedRows[e].Semester,
              subj_name: listOfChangedRows[e].Subject,
            });
          });
          console.log(arrayToUpdate);
          updateScore(arrayToUpdate);
        }
        setListOfChangedRows({});
      }
      setTableEditable(props.tableEditable);
    }
  });

  const updateListChangedRow = (kRow, key, value) => {
    setListOfChangedRows((listOfChangedRows) => ({
      ...listOfChangedRows,
      [kRow.ID]:
        listOfChangedRows[kRow.ID] !== undefined
          ? {
              ...listOfChangedRows[kRow.ID],
              [key]: value,
            }
          : {
              ...kRow,
              [key]: value,
            },
    }));
  };

  const renderClassDetailsData = () => {
    setTableData([]);
    let data = []; // clear data
    let i = 1;

    if (classDetailsData) {
      for (let e of classDetailsData) {
        //e["key"] = i;
        e["final"] = calculateFinalScore(e);
        /*e["final"] = (
                <Input
                    disabled={true}
                    value={calculateFinalScore(e)}
                    placeholder="Input a number"
                    maxLength={25}
                />);*/

        let a = {};
        Object.keys(e).forEach((key) => {
          a[key] =
            key === "exam_1" || key === "exam_2" || key === "final" ? (
              <InputNumber
                style={{ width: "100%" }}
                min={0}
                max={10}
                disabled={key === "final" ? true : !tableEditable}
                defaultValue={e[key] || ""}
                onChange={(value) => updateListChangedRow(e, key, value)}
                step={0.5}
              />
            ) : (
              e[key]
            );
          a["key"] = i;
        });
        data.push(a);
        i++;
      }
    }
    setTableData(data);
    console.log(data);
  };

  useEffect(() => {
    if (props.classDetailsData !== classDetailsData)
      setClassDetailsData(props.classDetailsData || []);
  }, [props.classDetailsData]);

  useEffect(() => {
    renderClassDetailsData();
  }, [classDetailsData, tableEditable, props.classDetailsData]);

  console.log(listOfChangedRows);

  return (
    <Table
      loading={props.isLoading || false}
      columns={columnsOfSubjectDetails}
      dataSource={tableData}
      bordered
      size="middle"
      scroll={{ x: "calc(300px + 50%)", y: 240 }}
      expandable={true}
      onRow={(record, rowIndex) => {
        return {
          className: listOfChangedRows[record.ID] ? "editedRow" : "",
        };
      }}
    />
  );
};

export default StudentScoresTable;
