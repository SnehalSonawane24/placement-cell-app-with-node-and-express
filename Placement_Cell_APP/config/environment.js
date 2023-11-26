const fs = require('fs');
const rfs = require("rotating-file-stream");
const path = require('path');
const dotenv = require('dotenv');


const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);


dotenv.config();

const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory
});




const development = {
    name: process.env.PLACEMENTCELL_NAME,
    port: process.env.PLACEMENTCELL_PORT,
    asset_path: process.env.PLACEMENTCELL_ASSET_PATH,
    session_cookie_key: process.env.PLACEMENTCELL_SESSION_COOKIE_KEY,
    db: process.env.PLACEMENTCELL_DB,

    morgan: {
        mode: 'combined', //dev
        options: {stream: accessLogStream}
    }
}

// module.exports = development;

const production = {
    name: process.env.PLACEMENTCELL_NAME,
    port: process.env.PLACEMENTCELL_PORT,
    asset_path: process.env.PLACEMENTCELL_ASSET_PATH,
    session_cookie_key: process.env.PLACEMENTCELL_SESSION_COOKIE_KEY,
    db: process.env.PLACEMENTCELL_DB,
    morgan: {
        mode: 'combined',
        options: {stream: accessLogStream}
    }
}



module.exports = eval(process.env.PLACEMENTCELL_ENVIRONMENT) == undefined ? development : eval(process.env.PLACEMENTCELL_ENVIRONMENT);

// We will be using Morgan as a middleware
// To save the logs in the file we will be using a middleware that will put those logs in the file but also that file can grow huge, to prevent in growing huge either we create a backup for weekly logs or we keep on deleting the older logs. 