let storage = require('./../../storage/storage');
let statusCodes = require('./../status-codes');

function insertTeacher(dbConnection, req, res, urlData)
{
    dbConnection.query(storage.Query_InsertTeacher(
        urlData.id, urlData.passwd, urlData.username, urlData.fullname, 
        urlData.gender, urlData.dob, urlData.addr, urlData.mail, urlData.phone
    ), (err, data, fields) => 
    {
        if (err) throw err;
        res.status(statusCodes.OK).json(data);
    });
}

function updateTeacherProfile(dbConnection, req, res, urlData)
{

}

function getTeacherInfo(dbConnection, req, res, urlData)
{
    dbConnection.query(storage.Query_GetTeacherInfo(req.params.id), (err, data, fields) => 
    {
        if (err) throw err;
        res.status(statusCodes.OK).json(data);
    });
}

module.exports = 
{
    InsertTeacher: insertTeacher,
    GetTeacherDetail: getTeacherInfo
}