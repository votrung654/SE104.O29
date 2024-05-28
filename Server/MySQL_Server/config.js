// let config = 
// {
//     host        : 'localhost',
//     user        : 'bach',
//     password    : 'Bach01248',
//     database    : 'STUDENTMANAGEMENT',
//     insecureAuth: true
// };
function createConfigFromJSON(path)
{
    let dbConfig = require(path);
    let config = 
    {
        host    : dbConfig.hostname,
        user    : dbConfig.username,
        password: dbConfig.password,
        database: dbConfig.dbname,
        port: dbConfig.port,
        insecureAuth: true
    } 
    // console.log(config);
    return config;
}

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