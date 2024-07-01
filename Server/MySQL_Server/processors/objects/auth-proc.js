let storage = require('../../storage/storage');
let statusCodes = require('../status-codes');
let loginStatus = require('../login-status');
 
function doLogin(dbConnection, req, res, urlData)
{
    let username = urlData.username;
    let password = urlData.password;
 
    dbConnection.query(storage.Query_GetPasswordFrom(username), (err, data, fields) =>
    {
        if (err) res.status(statusCodes.Unauthorized).json({status: err});
        console.log(data[0]);
 
        if (data[0] === undefined)
        {
            res.status(statusCodes.OK).json({status: loginStatus.InvalidUsername});
            return;
        }
 
        if (password.localeCompare(data[0].password) == 0)
        {
            res.status(statusCodes.OK).json({status: loginStatus.LoginSuccessfully});
        }
        else
        {
            res.status(statusCodes.OK).json({status: loginStatus.WrongPassword});
        }
    });
}
function doRegister(dbConnection, req, res, urlData) {
    let username = urlData.username;
    let password = urlData.password;
 
    dbConnection.query(storage.Query_CreateUser(username, password), (err, data, fields) => {
        if (err) {
            res.status(statusCodes.Unauthorized).json({status: err});
            return; // Sử dụng return để ngăn không gửi phản hồi thêm nữa
        }
        res.status(statusCodes.OK).json({status: loginStatus.RegisterSuccessfully});
    });
}
module.exports =
{
    DoLogin     : doLogin,
    DoRegister  : doRegister
}