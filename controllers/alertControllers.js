const fsp = require('fs').promises;
const fs = require('fs');
postAnalytics = async(req, res, next) => {}
await fsp.writeFile(`${__dirname}/storeAnalytics.json`, JSON.stringify(reportAnalytics));

// checks if file exists
if (fs.existsSync(`${__dirname}/storeAnalytics.json`)) {
    // If the file exists, reads the file
      const reportFile = await fsp.readFile(`${__dirname}/storeAnalytics.json`, 'utf-8')
    // converts the file to JavaScript Object
    reportAnalytics = JSON.parse(reportFile)
    } else {
      // if file does not exist
       return ('File does not exist');
    }