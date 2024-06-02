import React, { useEffect, useState } from "react";
import StudentReportWrapper from "./style";
import TextTranslation from "../../../Components/TextTranslation/TextTranslation";
import { Table } from "antd";

export default React.memo((props) => {
  const [studentDetailData, setStudentDetailData] = useState([{}]);
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

    console.log(studentDetailData);

    if (studentDetailData) {
      for (let e of studentDetailData) {
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
    if (props.data !== studentDetailData)
      setStudentDetailData(props.data || []);
  }, [props.data]);

  useEffect(() => {
    renderClassDetailsData();
  }, [studentDetailData, tableEditable]);

  console.log(props.data);
  console.log(tableData);

  return (
    <StudentReportWrapper>
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
    </StudentReportWrapper>
  );
});

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
  },
  {
    title: (
      <TextTranslation textName="ClassInfo-Table-Name.1" kClass="pcview" />
    ),
    dataIndex: "StudentName",
    key: "StudentName",
    width: 25,
    sorter: (a, b) =>
      NameParser.getFirstName(a.StudentName).localeCompare(
        NameParser.getFirstName(b.StudentName)
      ),
  },
  {
    title: (
      <TextTranslation textName="ClassInfo-TopBar-Class.1" kClass="pcview" />
    ),
    dataIndex: "ClassName",
    key: "ClassID",
    width: 12,
    sorter: (a, b) => a.ClassName.localeCompare(b.ClassName),
  },
  {
    title: (
      <TextTranslation textName="ClassInfo-Table-Avg1.1" kClass="pcview" />
    ),
    dataIndex: "Avg1",
    key: "Avg1",
    width: 12,
    sorter: (a, b) => a.Avg1 - b.Avg1,
  },
  {
    title: (
      <TextTranslation textName="ClassInfo-Table-Avg2.1" kClass="pcview" />
    ),
    dataIndex: "Avg2",
    key: "Avg2",
    width: 12,
    sorter: (a, b) => a.Avg2 - b.Avg2,
  },
];

const NameParser = {
  getFirstName: (name) => {
    const splitted = name.split(" ");
    return splitted[splitted.length - 1];
  },
};
