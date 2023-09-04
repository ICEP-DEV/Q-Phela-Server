const fsp = require('fs').promises;
const fs = require('fs');
exports.postAnalytics = async(req, res, next) => {
    const{ip, coordinates} = req.body;
    const validator = await schema.validateAsynch(req.body);
    let reportAnalytics = [];
    if (fs.existsSync(`${__dirname}/storeAnalytics.json`)) {
        const reportFile = await fsp.readFile(`${__dirname}/storeAnalytics.json`, 'utf-8')
        reportAnalytics = JSON.parse(reportFile)
    } else {
        return ('File does not exist');
    }
    reportAnalytics.push({...req.body, createdAt: new Date()})
    await fsp.writeFile('${__dirname}/storeAnalytics.json', JSON.stringify(reportAnalytics))
    res.status(201).json({
        status: 'succesful',
        data: {
            message: 'Information succesfully taken'
        }
    })
    
    
};
