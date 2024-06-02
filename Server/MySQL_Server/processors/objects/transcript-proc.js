let storage = require('./../../storage/storage');
let statusCodes = require('./../status-codes')

function getTranscriptOfSubject(dbConnection, req, res, urlData)
{
    dbConnection.query(storage.Query_GetSubjectTranscript(), [urlData.class_name, urlData.sem_name, urlData.subj_name, urlData.yearid], (err, data, fields) => 
    {
        if (err) { res.send(err); return; }
        res.status(statusCodes.OK).json(data);
    });
}

function adjustTranscript(dbConnection, req, res, urlData)
{
    let error = false;
    let result = [{status: 0}];

    urlData.forEach(request =>
        {
            if (error) return;
            console.log(`${request.exam_1}, ${request.exam_2}, ${request.sem_name}, ${request.subj_name}`);

            dbConnection.query(storage.Query_UpdateTranscript(), [
                request.exam_1, request.exam_2,
                request.subj_name, request.sem_name, request.student_id
            ], (err, data, fields) =>
            {
                if (err) { error = true; }
                else 
                {
                result.push(
                    { 
                        afftected_on: request.student_id,  
                        subject: request.subj_name,
                        semester: request.sem_name,
                        new_mark: [request.exam_1, request.exam_2]
                    });
                }
                // console.log(data);
                // console.log("Affected: " + request.student_id);
                // res.status(statusCodes.OK).json({ affected: request.student_id });
                if (request == urlData[urlData.length - 1])
                {
                    console.log(error);

                    if (!error) 
                    {
                        result[0].status = 1;
                        console.log(result);
                        res.status(statusCodes.OK).json(result);
                    }
                    else 
                    {
                        res.status(statusCodes.OK).json([{ status: 0 }]);
                    }
                }
            });
        });
}

function showSubjectReport(dbConnection, req, res, urlData)
{
    let result = {
        Pass: null, 
        NoStudent: null
    }

    dbConnection.query(storage.Query_SubjectReport(), [urlData.sem_name, urlData.subj_name, urlData.yearid], (err, data, fields) => 
    {
        if (err) { res.send(err); return; }
        result.Pass = data;
        dbConnection.query(storage.Query_NoStudents(), [urlData.yearid], (err, data, fields) =>
        {
            if (err) { res.send(err); return; }
            result.NoStudent = data;
            console.log(result);
            res.status(statusCodes.OK).json(result);
        });
    });
}

function showSemesterReport(dbConnection, req, res, urlData)
{
    let result = {
        Pass: null, 
        NoStudent: null
    }

    dbConnection.query(storage.Query_SemesterReport(), [urlData.sem_name, urlData.yearid], (err, data, fields) => 
    {
        if (err) { res.send(err); return; }
        result.Pass = data;
        dbConnection.query(storage.Query_NoStudents(), [urlData.yearid], (err, data, fields) =>
        {
            if (err) { res.send(err); return; }
            result.NoStudent = data;
            console.log(result);
            res.status(statusCodes.OK).json(result);
        });
    });
}

module.exports = 
{
    GetTransciptOfSubject: getTranscriptOfSubject,
    AdjustTranscript: adjustTranscript,
    ShowSubjectReport: showSubjectReport,
    ShowSemesterReport: showSemesterReport
};