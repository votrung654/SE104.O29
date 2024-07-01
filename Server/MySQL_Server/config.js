// let config = 
// {
//     host        : 'localhost',
//     user        : 'bach',
//     password    : 'Bach01248',
//     database    : 'STUDENTMANAGEMENT',
//     insecureAuth: true
// };
function createConnectionConfigFromJSON(path)
{
    let dbConfig = require(path);
    let config = 
    {
        host    : dbConfig.hostname,
        user    : dbConfig.username,
        password: dbConfig.password,
        insecureAuth: true
    } 
    // console.log(config);
    return config;
}

function createConfigFromJSON(path) {
    let dbConfig = require(path);
    let config = {
        host: dbConfig.hostname,
        user: dbConfig.username,
        password: dbConfig.password,
        database: dbConfig.dbname,
        port: dbConfig.port, // Add this line if your MySQL server is not running on the default port
        insecureAuth: true
    };
    return config; // Add this line to return the config object
}

function getDatabaseNameFromConfig(path)
{
    let dbConfig = require(path);
    return dbConfig.dbname;
}

module.exports = 
{
    CreateMySQLDBConfig: createConfigFromJSON,
    CreateConnectionConfig: createConnectionConfigFromJSON,
    GetDBName: getDatabaseNameFromConfig
}