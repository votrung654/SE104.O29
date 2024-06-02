let fs = require('fs');
let configSteps = require('./../admin-setup/setup-progress.json').status;

let stateRoute = ['/database', '/admin', '/finish'];
let finishState = stateRoute.length;
let setupFiles = 
{
    dbSetup: 'dbsetup.json',
    adminInfo: 'admin.json',
}

function isFirstTime()
{
    return configSteps < finishState;
}

function trackSetupProgress(step)
{
    configSteps = step;
    fs.writeFileSync('./admin-setup/setup-progress.json', `{ "status" : ${step}}`);
}

module.exports = 
{
    IsFirstTime : isFirstTime,
    TrackSetupProgress: trackSetupProgress,
    GetProgress: () => configSteps,
    GetRoute: (step) => stateRoute[step],
    SetupFiles: () => setupFiles
}