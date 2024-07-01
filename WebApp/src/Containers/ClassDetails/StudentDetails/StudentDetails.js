import React, { useEffect, useState } from "react";
import { Table, InputNumber, Card, Row, Col } from "antd";
import TextTranslation from "../../../Components/TextTranslation/TextTranslation";
import ScoreCoefficient from "../SubjectCoefficient.json";

import { useSSR } from "react-i18next";

import "./StudentDetails.css";

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
  return (
    e.k15mins * coef.k15mins +
    e.k45mins * coef.k45mins +
    e.kmidterm * coef.kmidterm +
    e.kmidterm * coef.kmidterm
  );
};

// Map of changed row to push

const StudentScoresTable = (props) => {
  const [sortedInfo, setSortedInfo] = useState({});
  const [filteredInfo, setFilteredInfo] = useState({});
  const [classDetailsData, setClassDetailsData] = useState([{}]);
  const [tableData, setTableData] = useState([]);
  const [tableEditable, setTableEditable] = useState(false);

  const [listOfChangedRows, setListOfChangedRows] = useState({});

  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  useEffect(() => {
    if (props.tableEditable !== tableEditable) {
      if (props.tableEditable === false) {
        setListOfChangedRows({});
      }
      setTableEditable(props.tableEditable);
    }
  });

  const columnsOfStudentDetails = [
    {
      title: (
        <div>
          <TextTranslation textName="ClassInfo-Table-No.1" kClass="pcview" />{" "}
        </div>
      ),
      dataIndex: "key",
      key: "key",
      width: 8,
      fixed: "left",
      sorter: (a, b) => a.key - b.key,
    },

    {
      title: (
        <div>
          <TextTranslation textName="ClassInfo-Table-Name.1" kClass="pcview" />{" "}
        </div>
      ),
      dataIndex: "Name",
      key: "Name",
      width: 35,
      sorter: (a, b) =>
        a.Name.split(" ")
          .slice(-1)[0]
          .localeCompare(b.Name.split(" ").slice(-1)[0]),
    },
    {
      title: (
        <div>
          <TextTranslation textName="ClassInfo-Table-Sex.1" kClass="pcview" />{" "}
        </div>
      ),
      dataIndex: "Gender",
      key: "Gender",
      width: 12,
      filters: [
        { text: "Male", value: "Male" },
        { text: "Female", value: "Female" },
      ],
      filteredValue: filteredInfo.Gender || null,
      onFilter: (value, record) => record.Gender.includes(value),
    },
    {
      title: (
        <div>
          <TextTranslation textName="ClassInfo-Table-DOB.1" kClass="pcview" />{" "}
        </div>
      ),
      dataIndex: "DOB",
      key: "DOB",
      width: 12,
    },
    {
      title: (
        <div>
          <TextTranslation
            textName="ClassInfo-Table-Address.1"
            kClass="pcview"
          />{" "}
        </div>
      ),
      dataIndex: "Address",
      key: "Address",
      width: 12,
    },
  ];

  const updateListChangedRow = (kRow, key, value) => {
    setListOfChangedRows((listOfChangedRows) => ({
      ...listOfChangedRows,
      [kRow.studentID]:
        listOfChangedRows[kRow.studentID] !== undefined
          ? {
              ...listOfChangedRows[kRow.studentID],
              [key]: value,
            }
          : {
              ...kRow,
              [key]: value,
            },
    }));
  };

  const renderClassDetailsData = () => {
    let data = []; // clear data
    let i = 1;

    console.log(classDetailsData);

    if (classDetailsData) {
      for (let e of classDetailsData) {
        //e["key"] = i;
        e["final"] = calculateFinalScore(e);
        e["Gender"] = e["Gender"] === 1 ? "Male" : "Female";
        // convert Date to beautiful string :v
        let kDate = new Date(e["DOB"]);
        e["DOB"] =
          kDate.getDate() +
          "/" +
          (kDate.getMonth() + 1) +
          "/" +
          kDate.getFullYear();
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
            key === "k15mins" ||
            key === "k45mins" ||
            key === "kmidterm" ||
            key === "kendterm" ||
            key === "final" ? (
              <InputNumber
                style={{ width: "100%" }}
                min={1}
                max={10}
                disabled={key === "final" ? true : !tableEditable}
                defaultValue={e[key] || 0}
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
  };

  useEffect(() => {
    if (props.classDetailsData !== classDetailsData)
      setClassDetailsData(props.classDetailsData || []);
  }, [props.classDetailsData]);

  useEffect(() => {
    renderClassDetailsData();
  }, [classDetailsData, tableEditable]);

  console.log(listOfChangedRows);
  console.log(tableData);
  return (
    <>
      <Card
        loading={props.isLoading || false}
        className="studentDetailsInfo-wrapper"
        bordered={false}
      >
        <Row>
          <Col className="studentDetailsInfo-1">Class Details</Col>
        </Row>
        <Row>
          <Col className="studentDetailsInfo studentDetailsInfo-2" flex={7}>
            Class: {props.selectedClass}
          </Col>
          <Col className="studentDetailsInfo studentDetailsInfo-3" flex={3}>
            Enrolled Students: {props.classDetailsData.length}
          </Col>
        </Row>
      </Card>
      <Table
        loading={props.isLoading || false}
        columns={columnsOfStudentDetails}
        dataSource={tableData}
        bordered
        size="middle"
        scroll={{ x: "calc(300px + 50%)", y: 240 }}
        expandable={true}
        onChange={handleChange}
        onRow={(record, rowIndex) => {
          return {
            className: listOfChangedRows[record.studentID] ? "editedRow" : "",
          };
        }}
      />
    </>
  );
};

export default StudentScoresTable;
