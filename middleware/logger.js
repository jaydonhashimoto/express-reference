const moment = require('moment');

//middleware function
//when a req is made, this function is called
//must use next at the end of each mw function
const logger = (req, res, next) => {
    //log url and date
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format()}`);
    next();
}

module.exports = logger;