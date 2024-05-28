let path = require('path');
let sysUtil = require('./../utils/system');

function processClient(app) {
    if (sysUtil.IsFirstTime()) {
        app.use((req, res, next) => {
            if (!req.url || !req.url.includes(`/setup`)) {
                res.redirect(`/setup`);
            }
            next();
        })
    }

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/index.html'));
    })
}

module.exports = {
    ProcessClient: processClient
}