let url = require('url');

function appGet(app, syntax, callback, dbConnection)
{
    app.get(syntax, (req, res) => 
    {
        let urlData = url.parse(req.url, true).query;
        console.log(urlData);
        callback(dbConnection, req, res, urlData);
    });   
}

function appPost(app, syntax, callback, dbConnection)
{
    app.post(syntax, (req, res) => 
    {
        let data = req.body;
        console.log(data);
        callback(dbConnection, req, res, data);
    });   
}

function appGetWithoutDB(app, syntax, callback)
{
    app.get(syntax, (req, res) => 
    {
        let urlData = url.parse(req.url, true).query;
        console.log(urlData);
        callback(req, res, urlData);
    });   
}

function appPostWithoutDB(app, syntax, callback)
{
    app.post(syntax, async (req, res) => 
    {
        let data = req.body;
        console.log(data);
        await callback(req, res, data);
    });   
}

module.exports = 
{
    AppGet: appGet,
    AppPost: appPost,
    AppGetWithoutDB: appGetWithoutDB,
    AppPostWithoutDB: appPostWithoutDB
}