let storage = require('../../storage/storage');
let statusCodes = require('../status-codes');
let loginStatus = require('../login-status');
/*
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



*/
function doLogin(dbConnection, req, res, urlData)
{
    console.log('urlData:', urlData); // kiểm tra giá trị của urlData

    if (!urlData.username || !urlData.password) 
    {
        res.status(statusCodes.BadRequest).json({status: "Username and password must be provided"});
        return;
    }
    let username = urlData.username;
    let password = urlData.password;

    console.log('username:', username, 'password:', password); // kiểm tra giá trị của username và password

    dbConnection.query(storage.Query_GetPasswordFrom(username), (err, data, fields) =>
    {
        console.log('err:', err, 'data:', data, 'fields:', fields); // kiểm tra giá trị của err, data, và fields
        if (err) 
        {
            res.status(statusCodes.Unauthorized).json({status: err});
            return; // dừng việc thực thi hàm khi có lỗi
        }
        console.log(data[0]);

        if (data[0] === undefined)
        {
            res.status(statusCodes.OK).json({status: loginStatus.InvalidUsername});
            return;
        }

        if (password === data[0].password) // sử dụng toán tử === để so sánh mật khẩu
        {
            res.status(statusCodes.OK).json({status: loginStatus.LoginSuccessfully});
        }
        else 
        {
            res.status(statusCodes.OK).json({status: loginStatus.WrongPassword});
        }
    });
}
module.exports = 
{
    DoLogin     : doLogin
}