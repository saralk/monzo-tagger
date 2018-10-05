const env = require('env2')('./.env');
const fs = require('fs');
const winston = require('winston');
const Monzo = require('./monzo');
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

const rules_defintion = JSON.parse(fs.readFileSync('rules.json'));

monzo.getTransactions((err, transactions) => {
    rulerunner.run(transactions, rules);  
});
