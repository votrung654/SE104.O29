let storage = require('./../../storage/storage');
let statusCodes = require('./../status-codes');

function insertYear(dbConnection, req, res, urlData)
{
    dbConnection.query(storage.Query_InsertYear(), [urlData.start_date, urlData.finish_date, 200], (err, data, fields) => 
    {
        if (err) throw err;
        res.status(statusCodes.OK).json(data);
    }); 
}

module.exports =
{
    InsertYear: insertYear
}