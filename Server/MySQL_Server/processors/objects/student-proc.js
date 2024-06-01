let storage = require('./../../storage/storage');
let statusCodes = require('./../status-codes');

// Student IDs cache
let sIDs = null;

function requestLastIdOfPrefix(dbConnection, prefix, callback) {
    let q = "SELECT count(id) as rawID FROM sm_student where id like ? order by id";
    dbConnection.query(q, [`${prefix}%`], (err, data, fields) => {
        console.log(data[0].rawID);
        let order = (data[0].rawID + 1).toString();
        while (order.length < 4) order = '0' + order;
        console.log(order);
        callback(`${prefix}${order}`);
    });
}

function insertStudent(dbConnection, req, res, urlData) {
    // console.log(new Date(Date.now()).getUTCFullYear());
    requestLastIdOfPrefix(dbConnection, new Date(Date.now()).getFullYear().toString(), (id) => 
    {
        dbConnection.query(storage.Query_InsertStudent(
            id, urlData.name, urlData.gender, urlData.dob, urlData.addr, urlData.mail
        ), (err, data, fields) => {
            if (err) { res.status(statusCodes.OK).json({ status: 0 }); return; }
            res.status(statusCodes.OK).json({ status: 1, new_id: id });
        });
    });
}

function updateStudent(dbConnection, req, res, urlData) {
    dbConnection.query(storage.Query_UpdateStudent(
        urlData.id, urlData.name, urlData.gender, urlData.dob, urlData.addr, urlData.mail
    ), (err, data, fields) => {
        if (err) { res.status(statusCodes.OK).json({ status: 0 }); return; }
        res.status(statusCodes.OK).json({status: 1});
    });
}

function getStudentDetail(dbConnection, req, res, urlData) {
    console.log(req.params);
    dbConnection.query(storage.Query_GetStudent(req.params.id), (err, data, fields) => {
        if (err) { res.status(statusCodes.NotFound).send(err); return; }
        res.status(statusCodes.OK).json(data);
    });
}

function removeStudent(dbConnection, req, res, urlData) {
    console.log(req.params);
    dbConnection.query(storage.Query_RemoveStudent(req.params.id), (err, data, fields) => {
        if (err) { res.status(statusCodes.NotFound).send(err); return; }
        res.status(statusCodes.OK).json({status: 1});
    });
}

function getStudentListWithAvg(dbConnection, req, res, urlData) {
    let sem1 = 'HỌC KÌ 1';
    let sem2 = 'HỌC KÌ 2';
    let rawResult = { 
        Avg1: null,
        Avg2: null
    }
    let finalResult = {
        status: 0,
        data: []
    };

    dbConnection.query(storage.Query_GetAvgScore(), [sem1, urlData.yearid], (err, data, fields) => {
        if (err) { res.status(statusCodes.OK).json(finalResult); return; }
        rawResult.Avg1 = data;
        for (var i = 0; i < data.length; ++i)
        {
            let item = data[i];
            finalResult.data.push(
                {
                    StudentID: item.StudentID,
                    StudentName: item.StudentName,
                    ClassID: null,
                    ClassName: null,
                    Avg1: item.TBHK,
                    Avg2: null
                }
            );

        }
        // Query AVG2
        dbConnection.query(storage.Query_GetAvgScore(), [sem2, urlData.yearid], (err, data, fields) => 
        {
            if (err) { res.status(statusCodes.OK).json([{ status: 0 }]); return; }
            rawResult.Avg2 = data;

            for (var i = 0; i < data.length; ++i)
            {
                let item = data[i];
                finalResult.data[i].Avg2 = item.TBHK;

                // Query for respective class
                dbConnection.query(storage.Query_GetAvgRespectiveClass(), [finalResult.data[i].StudentID, urlData.yearid], (err, data, fields) =>
                {
                    if (err) { res.status(statusCodes.OK).json([{ status: 0 }]); return; }
                    // {
                    //     let item = data;
                    //     finalResult[i].ClassID = item.id;
                    //     finalResult[i].ClassName = item.name;
                    // }
                    
                    // Query successfully
                    console.log(data[0]);
                    let ind = -1;
                    for (var i = 0; i < finalResult.data.length; ++i)
                    {
                        if (finalResult.data[i].StudentID.localeCompare(data[0].student) == 0)
                        {
                            ind = i;
                            finalResult.data[i].ClassID = data[0].id;
                            finalResult.data[i].ClassName = data[0].name;
                        }
                    }
                    console.log(ind);
                    // finalResult[ind].ClassID = data[0].id;
                    // finalResult[ind].ClassName = data[0].name;

                    let done = true;
                    for (var i = 0; i < finalResult.data.length; ++i)
                    {
                        if (finalResult.data[i].ClassID == null || finalResult.data[i].ClassName == null)
                        {
                            done = false;
                            break;
                        }
                    }

                    if (done)
                    {
                        finalResult.status = 1;
                        console.log(finalResult.data);
                        res.status(statusCodes.OK).json(finalResult);
                    }
                });
            }

        })
    });
}

function getAllStudent(dbConnection, req, res, urlData) {
    dbConnection.query(storage.Query_GetAllStudent(), (err, data, fields) => {
        if (err) { res.status(statusCodes.NotFound).send(err); return; }
        res.status(statusCodes.OK).json(data);
    });
}

module.exports =
{
    InsertStudent: insertStudent,
    UpdateStudent: updateStudent,
    GetStudentDetail: getStudentDetail,
    RemoveStudent: removeStudent,
    GetStudentListWithAvg: getStudentListWithAvg,
    GetAllStudent: getAllStudent,
    RequestLastIdOfPrefix: requestLastIdOfPrefix
};