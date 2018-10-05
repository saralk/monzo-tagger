const env = require('env2')('./.env');
const fs = require('fs');
const winston = require('winston');
const Monzo = require('./clients/monzo');
const RuleRunner = require('./rulerunner');

const monzo = new Monzo(process.env.MONZO_ACCOUNT_ID, process.env.MONZO_ACCESS_TOKEN); 

const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.simple(),
    transports: [
        new winston.transports.Console()
    ]
});

const rulerunner = new RuleRunner(monzo, logger);

monzo.getTransactions((err, transactions) => {
    fs.readdirSync('./rules/').filter((f) => { 
        return f.match(/\.json$/)
    }).forEach((file) => {
        rulerunner.run(transactions, JSON.parse(fs.readFileSync(`./rules/${file}`))); 
    })
});
