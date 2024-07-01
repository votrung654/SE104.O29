import React, { useEffect, useState } from "react";
import { Table } from "antd";
import TextTranslation from "../../../Components/TextTranslation/TextTranslation";

import { useSSR } from "react-i18next";

import "./SubjectAna.css";

const columnsOfStudentDetails = [
  {
    title: (
      <div>
        <TextTranslation textName="ClassInfo-Table-No.1" kClass="pcview" />
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
      <TextTranslation textName="ClassInfo-TopBar-Class.1" kClass="pcview" />
    ),
    dataIndex: "name",
    key: "name",
    width: 25,
    sorter: (a, b) =>
      a.name
        .split(" ")
        .slice(-1)[0]
        .localeCompare(b.name.split(" ").slice(-1)[0]),
  },
  {
    title: (
      <TextTranslation
        textName="ClassInfo-Table-EnrolledStudents.1"
        kClass="pcview"
      />
    ),
    dataIndex: "siso",
    key: "siso",
    width: 12,
  },
  {
    title: (
      <TextTranslation textName="ClassInfo-Table-NumOfPass.1" kClass="pcview" />
    ),
    dataIndex: "sldat",
    key: "sldat",
    width: 12,
  },
  {
    title: (
      <TextTranslation
        textName="ClassInfo-Table-Percentage.1"
        kClass="pcview"
      />
    ),
    dataIndex: "tyle",
    key: "tyle",
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

// Map of changed row to push

const StudentScoresTable = (props) => {
  const [classDetailsData, setClassDetailsData] = useState([{}]);
  const [tableData, setTableData] = useState([]);
  const [tableEditable, setTableEditable] = useState(false);

  const [listOfChangedRows, setListOfChangedRows] = useState({});

  useEffect(() => {
    if (props.tableEditable !== tableEditable) {
      if (props.tableEditable === false) {
        setListOfChangedRows({});
      }
      setTableEditable(props.tableEditable);
    }
  });

  const renderClassDetailsData = () => {
    let data = []; // clear data
    let i = 1;

    console.log(classDetailsData);

    if (classDetailsData) {
      for (let e of classDetailsData) {
        let a = {};
        a = { ...e };
        a["key"] = i;
        a["tyle"] = `${Math.floor(a["tyle"] * 100) / 100} %`;
        i++;
        data.push(a);
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

  console.log(props.classDetailsData);
  console.log(tableData);
  return (
    <>
      <Table
        loading={props.isLoading || false}
        columns={columnsOfStudentDetails}
        dataSource={tableData}
        bordered
        size="middle"
        scroll={{ x: "calc(300px + 50%)", y: 240 }}
        expandable={true}
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
