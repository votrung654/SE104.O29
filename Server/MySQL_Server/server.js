let path        = require('path');
let cors        = require('cors');
let express     = require('express');
let config      = require('./config');
let mysql       = require('mysql');
let crypt       = require('./utils/crypt');
let sysUtil     = require('./utils/system');

// Query processors
let processor   = require('./processors/queries-processor');
let clientProcessor   = require('./processors/client-processor');

const parser    = require('body-parser');

// Apps
let api_v1      = express();
let studentApp  = express();
let classApp    = express();
let trscrApp    = express();
let teacherApp  = express();
let authApp     = express();
let setupApp    = express();
let yearApp     = express();
let settingApp  = express();

let app         = express();

const port      = 8080;

app.use(cors());

// serve the static files from the react app
app.use(express.static(path.join(__dirname, 'client'), {index: false}));

app.use('/v1', api_v1);
api_v1.use(parser.json());

api_v1.use('/student', studentApp); 
studentApp.use(parser.json());

api_v1.use('/class', classApp); 
classApp.use(parser.json());

api_v1.use('/year', yearApp); 
yearApp.use(parser.json());

api_v1.use('/transcript', trscrApp); 
trscrApp.use(parser.json());

api_v1.use('/teacher', teacherApp); 
teacherApp.use(parser.json());

api_v1.use('/auth', authApp); 
authApp.use(parser.json());

api_v1.use('/setting', settingApp);
settingApp.use(parser.json());


app.use('/setup', setupApp);
setupApp.use(parser.json());

// Listen for queries and process
//clientProcessor.ProcessClient(app);

//let appList = [studentApp, teacherApp, authApp];

// if (sysUtil.IsFirstTime())
// {
//     processor.ProcessSetupQueries(setupApp, appList);
// }
// else 
{
    // Database connection
    let connection  = mysql.createConnection(config.CreateMySQLDBConfig('./admin-setup/dbsetup.json'));
    // Connect to database
    connection.connect((err) => 
    {
        // crypt.AES.Encrypt('11112000Bach', "!@#@#@!#",(result) => {console.log('Encryption successful with ' + result); });
        // crypt.AES.Decrypt('2bbd70925fc2ba3560bc36e381e4b8ef', "!@#@#@!#", (result) => console.log('Decryption successful with ' + result));
        if (err) 
        {
            console.log("Error connecting database...\n\n" + err);
            return;
        }

        console.log("Database is connected!\n\n");
        processor.ProcessQuery(api_v1, connection);
        processor.ProcessStudentQueries(studentApp, connection);
        processor.ProcessClassQueries(classApp, connection);
        processor.ProcessTeacherQueries(teacherApp, connection);
        processor.ProcessAuthenticationQueries(authApp, connection);
        processor.ProcessTranscriptQueries(trscrApp, connection);
        processor.ProcessYearQueries(yearApp, connection);
        processor.ProcessSettingQueries(settingApp, connection);
    });

}

app.listen(port, () => {
    console.log(`Listening on port ${port}!`)
});