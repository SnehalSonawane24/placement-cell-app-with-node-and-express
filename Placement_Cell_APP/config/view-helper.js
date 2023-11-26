// write this line in package.json inside script
// "prod_start": "set PLACEMENTCELL_ENVIRONMENT=production&& node index.js"

const env = require('../config/environment');
const fs = require('fs');
const path = require('path');

module.exports = (app) => {
    app.locals.assetPath = function(filePath){
        if (env.name == 'development'){
            return '/' + filePath;
        }

        return '/' + JSON.parse(fs.readFileSync(path.join(__dirname, '../public/rev-manifest.json')))[filePath];;
    }
}