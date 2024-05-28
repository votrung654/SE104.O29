let storage = require('./../../storage/storage');
let statusCodes = require('./../status-codes');
const { query } = require('express');

function insertClass(dbConnection, req, res, urlData) {
    dbConnection.query(storage.Query_InsertClass(
        urlData.id, urlData.name, urlData.grade, urlData.year
    ), (err, data, fields) => 
    {
        if (err) throw err;
        res.status(statusCodes.OK).json(data);
    });
}

function getClassStudent(dbConnection, req, res, urlData) {
    dbConnection.query(storage.Query_ListStudentsInClass(), [urlData.class_name, urlData.yearid], (err, data, fields) => {
        if (err) throw err;
        res.status(statusCodes.OK).json(data);
    });
}

function getNumberOfStudentsInClass(dbConnection, req, res, urlData) {
    dbConnection.query(storage.Query_GetNumberOfStudentsInClass(), [urlData.class_name, urlData.yearid], (err, data, fields) => {
        if (err) throw err;
        res.status(statusCodes.OK).json(data);
    });
}

function getAllClasses(dbConnection, req, res, urlData) {
    dbConnection.query(storage.Query_ListAllClasses(), [req.params.yearid], (err, data, fields) => {
        if (err) throw err;
        res.status(statusCodes.OK).json(data);
    });
}

function addClass(dbConnection, req, res, urlData) {
    dbConnection.query(storage.Query_InsertClass(), [urlData.id, urlData.name, urlData.grade, urlData.year], (err, data, fields) => {
        if (err) {
            console.log(err);
            res.status(statusCodes.OK).json({ status: 0 });
            return;
        }
        res.status(statusCodes.OK).json({ status: 1 });
    });
}

function addStudent(dbConnection, req, res, urlData) {
    console.log(urlData[0]);
    let queryQueue = [];
    let student = [];

    for (var i = 0; i < urlData.length; ++i) {
        var request = urlData[i];
        queryQueue.push(i);
        student.push(request.student_id);

        dbConnection.query(storage.Query_AssignStudentClass(), [request.class, request.student_id], (err, data, fields) => {
            if (err) {console.log(err); res.status(statusCodes.OK).json({ status: 0 }); return; }
            queryQueue.pop();

            if (queryQueue.length == 0) {
                console.log("end");
                let getSubject = "select id from sm_subject;";

                dbConnection.query(getSubject, (err, data, fields) => {
                    console.log(data);
                    if (err) { console.log(err); res.status(statusCodes.OK).json({ status: 0 }); return; }
                    let subjects = data;
                    let success = true;

                    for (var k = 0; k < student.length; ++k) {
                        for (var i = 0; i < subjects.length; ++i) {
                            if (!success) return;
                            queryQueue.push(i);
                            queryQueue.push(i);

                            let subject = subjects[i].id;
                            let initQ = "INSERT INTO sm_transcript(student_code ,semester ,  _subject)VALUES(?,?,?)";

                            // Query for first semester
                            dbConnection.query(initQ, [student[k], 1, subject], (err, data, fields) => {
                                if (err) { console.log(err); res.status(statusCodes.OK).json({ status: 0 }); success = false; return; }

                                queryQueue.pop();
                                if (queryQueue.length == 0) {
                                    success = true;
                                    res.status(statusCodes.OK).json({ status: 1 });
                                }
                            });

                            // Query for second semester
                            dbConnection.query(initQ, [student[k], 2, subject], (err, data, fields) => {
                                if (err) { console.log(err); res.status(statusCodes.OK).json({ status: 0 }); success = false; return; }

                                queryQueue.pop();
                                if (queryQueue.length == 0) {
                                    success = true;
                                    res.status(statusCodes.OK).json({ status: 1 });
                                }
                            });
                        }
                    }
                });
            }
        });
    };
}

function getAcademicYears(dbConnection, req, res, urlData) {
    dbConnection.query(storage.Query_GetYears(), (err, data, fields) => {
        if (err) throw err;
        res.status(statusCodes.OK).json(data);
    });
}

module.exports =
{
    InsertClass: insertClass,
    GetClassStudent: getClassStudent,
    GetNumberOfStudentsInClass: getNumberOfStudentsInClass,
    GetAllClasses: getAllClasses,
    AddStudent: addStudent,
    GetAcademicYears: getAcademicYears,
}