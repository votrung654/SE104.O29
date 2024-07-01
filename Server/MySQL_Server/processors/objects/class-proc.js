let storage = require('./../../storage/storage');
let statusCodes = require('./../status-codes');
const { query } = require('express');

function requestLastIdOfPrefix(dbConnection, prefix, callback) {
    let q = "SELECT count(id) as rawID FROM sm_class where id like ? order by id";
    dbConnection.query(q, [`${prefix}%`], (err, data, fields) => {
        console.log(data[0].rawID);
        let order = (data[0].rawID + 1).toString();
        while (order.length < 4) order = '0' + order;
        console.log(order);
        callback(`${prefix}${order}`);
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

function insertClass(dbConnection, req, res, urlData) {
    requestLastIdOfPrefix(dbConnection, new Date(Date.now()).getFullYear().toString(), (id) => 
    {
        dbConnection.query(storage.Query_InsertClass(
        id, urlData.name, urlData.grade, urlData._year
        ), (err, data, fields) => 
        {
            if (err) throw err;
            res.status(statusCodes.OK).json(data);
        });
    });
}

function updateClass(dbConnection, req, res, urlData) {
    dbConnection.query(storage.Query_UpdateClass(
        urlData.id, urlData.name, urlData.grade, urlData._year
    ), (err, data, fields) =>
    {
        if (err) throw err;
        res.status(statusCodes.OK).json(data);
    }
    );
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

function getClassById(dbConnection, req, res, urlData) {
    dbConnection.query(storage.Query_GetClassById(), [urlData.id], (err, data, fields) => {
        if (err) throw err;
        if (data.length === 0) {
            res.status(statusCodes.NOT_FOUND).json({ message: 'Class not found' });
        } else {
            res.status(statusCodes.OK).json(data[0]);
        }
    });
}

module.exports =
{
    InsertClass: insertClass,
    UpdateClass: updateClass,
    GetClassStudent: getClassStudent,
    GetNumberOfStudentsInClass: getNumberOfStudentsInClass,
    GetAllClasses: getAllClasses,
    AddStudent: addStudent,
    GetAcademicYears: getAcademicYears,
    GetClassById: getClassById,
}