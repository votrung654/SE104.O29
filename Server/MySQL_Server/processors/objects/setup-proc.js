let statusCodes = require('./../status-codes');
let fs = require('fs');
let sysUtil = require('./../../utils/system');
let storage = require('./../../storage/storage');
let connection;
let syntaxes        = require('./../query-syntaxes');
let methods         = require('./../../utils/http-methods');

function setupStatus(req, res, err = 0) {
    res.status(statusCodes.OK).json({ error: 0, data: sysUtil.GetProgress() });
}

function setupDB(req, res, urlData)
{
    let mysql = require('mysql');
    // Database connection
    let config = require('./../../config');
    let dbconf = config.CreateConnectionConfig('./admin-setup/dbsetup.json');
    connection = mysql.createConnection(dbconf);

    // Connect to database
    connection.connect((err) => {
        if (err) {
            console.log("Error connecting database...\n\n" + err);

            // Reset setup progress, force user to reconfig
            sysUtil.TrackSetupProgress(0);
            setupStatus(req, res);
            return;
        }

        console.log("Database is connected! Setting up database...\n\n"); 
        let dbName = urlData.dbname;
        connection.query(storage.Query_SetupDatabase(dbName), (err, data, fields) => {
            if (err) {
                console.log("Error setting up database...\n" + err);
                // Reset setup progress, force user to reconfig
                sysUtil.TrackSetupProgress(0);
                setupStatus(req, res);
                return;
            }

            console.log("Database created");
        });

        connection.end();
    });
    
}

function receiveDBSubmission(req, res, urlData) {
    // console.log(urlData);
    console.log("Receive Database config");
    fs.writeFileSync(`./admin-setup/${sysUtil.SetupFiles().dbSetup}`, JSON.stringify(urlData));

    try {
        setupDB(req, res, urlData);
    } catch (e) {
        console.log(e);
    }

    // sysUtil.TrackSetupProgress(sysUtil.GetProgress() + 1);
    // setupStatus(req, res);
}

function receiveAdminSubmission(req, res, urlData) {
    console.log(urlData);

    fs.writeFileSync(`./admin-setup/${sysUtil.SetupFiles().adminInfo}`, JSON.stringify(urlData), () => { });
    sysUtil.TrackSetupProgress(sysUtil.GetProgress() + 1);
    setupStatus(req, res);
}

function checkAdmin(req, res, urlData) {
    console.log(urlData);
    let admin = require(`./../../admin-setup/${sysUtil.SetupFiles().adminInfo}`);
    res.status(statusCodes.OK).json(
        { "status": admin.username == urlData.username && admin.password == urlData.password ? true : false });
}

function finishSetup(req, res, appList) {
    let mysql = require('mysql');
    // Database connection
    let config = require('./../../config');

    connection = mysql.createConnection(config.CreateMySQLDBConfig('./admin-setup/dbsetup.json'));
    // Connect to database
    connection.connect((err) => {
        if (err) {
            console.log("Error connecting database...\n\n" + err);

            // Reset setup progress, force user to reconfig
            sysUtil.TrackSetupProgress(0);
            setupStatus(req, res);
            return;
        }

        console.log("Database is connected!\n\n");

        let processor = require('./../../processors/queries-processor');
        let studentApp = appList[0];
        let teacherApp = appList[1];
        let authApp = appList[2];

        processor.ProcessStudentQueries(studentApp, connection);
        processor.ProcessTeacherQueries(teacherApp, connection);
        processor.ProcessAuthenticationQueries(authApp, connection);

        sysUtil.TrackSetupProgress(sysUtil.GetProgress() + 1);
        setupStatus(req, res);
    });
}

module.exports =
{
    ReceiveDBSubmission: receiveDBSubmission,
    ReceiveAdminSubmission: receiveAdminSubmission,
    CheckAdmin: checkAdmin,
    Finish: finishSetup,
    Status: setupStatus
}