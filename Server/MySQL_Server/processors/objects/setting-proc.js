let storage = require('./../../storage/storage');
let statusCodes = require('./../status-codes');


function getAllSetting(dbConnection, req, res) {
    dbConnection.query(storage.Query_GetAllSetting(), (err, data, fields) => {
        if (err) {
            res.status(statusCodes.OK).json([]);
            return;
        }
        res.status(statusCodes.OK).json(data);
    }
    );
}

function updateSetting(dbConnection, req, res, urlData) {
    dbConnection.query(storage.Query_UpdateSetting(
        urlData.value, urlData.settingCode, urlData.settingName
    ), (err, data, fields) => {
        if (err) {
            res.status(statusCodes.OK).json({ status: 0 });
            return;
        }
        res.status(statusCodes.OK).json({ status: 1 });
    }
    );
}

module.exports = {
    GetAllSetting: getAllSetting,
    UpdateSetting: updateSetting
}