let mysql           = require('mysql');
let storage         = require('./../storage/storage');
let statusCodes     = require('./status-codes');
let url             = require('url');
let express         = require('express');

let syntaxes        = require('./query-syntaxes');
let methods         = require('./../utils/http-methods');

let studentProc     = require('./objects/student-proc');
let teacherProc     = require('./objects/teacher-proc');
let authProc        = require('./objects/auth-proc');
let setupProc       = require('./objects/setup-proc');
let classProc       = require('./objects/class-proc');
let transcriptProc  = require('./objects/transcript-proc');
let yearProc        = require('./objects/year-proc');

function processListStudentsInClass(dbConnection, req, res, urlData)
{
    if (urlData.classid === undefined) return null;

    dbConnection.query(storage.Query_ListStudentsInClass(urlData.classid), (err, data, fields) => 
    {
        if (err) throw err;
        res.status(statusCodes.OK).json(data);
    });
}

function processNumberOfStudentsInClass(dbConnection, req, res, urlData)
{
    if (urlData.classid === undefined) return null;

    dbConnection.query(storage.Query_GetNumberOfStudentsInClass(urlData.classid), (err, data, fields) => 
    {
        if (err)
        {
            res.status(statusCodes.NotFound);
        }
        res.status(statusCodes.OK).json(data);
    });
}

function processQuery(app, dbConnection)
{
    methods.AppGet(app, syntaxes.listStudentsInClass, processListStudentsInClass, dbConnection);
    // methods.AppGet(app, syntaxes.numberOfStudentsInClass, processNumberOfStudentsInClass, dbConnection);
}

// *****This function processes student queries*****
function processStudentQueries(app, dbConnection)
{
    methods.AppPost(app, syntaxes.insert, studentProc.InsertStudent, dbConnection);
    methods.AppPost(app, syntaxes.update, studentProc.UpdateStudent, dbConnection);
    methods.AppPost(app, syntaxes.get, studentProc.GetStudentListWithAvg, dbConnection);
    methods.AppGet(app, syntaxes.detail, studentProc.GetStudentDetail, dbConnection);
    methods.AppGet(app, syntaxes.show, studentProc.GetAllStudent, dbConnection);
    methods.AppGet(app, syntaxes.remove, studentProc.RemoveStudent, dbConnection);
}
//**************************************************

// *****This function processes student queries*****
function processClassQueries(app, dbConnection)
{
    // methods.AppPost(app, syntaxes.insert, studentProc.InsertStudent, dbConnection);
    methods.AppPost(app, syntaxes.insert, classProc.InsertClass, dbConnection);
    methods.AppPost(app, syntaxes.update, classProc.AddStudent, dbConnection);
    methods.AppPost(app, syntaxes.get + '/student', classProc.GetClassStudent, dbConnection);

    methods.AppPost(app, syntaxes.get + '/summary', classProc.GetNumberOfStudentsInClass, dbConnection);
    methods.AppGet(app, syntaxes.get + '/:yearid', classProc.GetAllClasses, dbConnection);
    methods.AppGet(app, syntaxes.get + '/year', classProc.GetAcademicYears, dbConnection);
}
//**************************************************

// *****This function processes transcript queries*****
function processTranscriptQueries(app, dbConnection)
{
    methods.AppPost(app, syntaxes.get, transcriptProc.GetTransciptOfSubject, dbConnection);
    methods.AppPost(app, syntaxes.update, transcriptProc.AdjustTranscript, dbConnection);

    methods.AppPost(app, syntaxes.show + '/report/subject', transcriptProc.ShowSubjectReport, dbConnection);
    methods.AppPost(app, syntaxes.show + '/report/semester', transcriptProc.ShowSemesterReport, dbConnection);
}
//**************************************************

// *****This function processes academic year queries*****
function processYearQueries(app, dbConnection)
{
    methods.AppPost(app, syntaxes.insert, yearProc.InsertYear, dbConnection);
}
//**************************************************

// *****This function processes teacher (user) queries*****
function processTeacherQueries(app, dbConnection)
{
    methods.AppPost(app, syntaxes.insert, teacherProc.InsertTeacher, dbConnection);
    methods.AppGet(app, syntaxes.detail, teacherProc.GetTeacherDetail, dbConnection);
}
//*********************************************************

// *****This function processes authentication (user) queries*****
function processAuthenticationQueries(app, dbConnection)
{
    methods.AppPost(app, syntaxes.login, authProc.DoLogin, dbConnection);
}
//*********************************************************

function processSetupQueries(app, subappList)
{
    console.log("Setup is not completed, setup API triggered at step " + require('./../utils/system').GetProgress());
    methods.AppPostWithoutDB(app, syntaxes.setup.database, setupProc.ReceiveDBSubmission);
    methods.AppPostWithoutDB(app, syntaxes.setup.admin, setupProc.ReceiveAdminSubmission);
    methods.AppPostWithoutDB(app, syntaxes.setup.check, setupProc.CheckAdmin);
    methods.AppGetWithoutDB(app, syntaxes.setup.status, setupProc.Status);

    app.get(syntaxes.setup.finish, (req, res) =>
    {
        setupProc.Finish(req, res, subappList);
    });   
}

module.exports = 
{
    ProcessQuery: processQuery,
    ProcessStudentQueries: processStudentQueries,
    ProcessTeacherQueries: processTeacherQueries,
    ProcessAuthenticationQueries: processAuthenticationQueries,
    ProcessSetupQueries: processSetupQueries,
    ProcessClassQueries: processClassQueries,
    ProcessTranscriptQueries: processTranscriptQueries,
    ProcessYearQueries: processYearQueries
}