const env = require('env2')('./.env');
const fs = require('fs');
const winston = require('winston');
const Monzo = require('./monzo');

const monzo = new Monzo(process.env.MONZO_ACCOUNT_ID, process.env.MONZO_ACCESS_TOKEN); 

const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.simple(),
    transports: [
        new winston.transports.Console()
    ]
});

const rules_defintion = JSON.parse(fs.readFileSync('rules.json'));

function checkConditions(transaction, conditions) {
    return conditions.every((condition) => {
        const checker = require(`./conditions/${condition.condition_type}`);
        const result = checker.check(transaction, condition);
        
        logger.debug(`${JSON.stringify(condition)} is ${result}`);

        return result;
    });
}

monzo.getTransactions((err, transactions) => {

    transactions.forEach((txn) => {
        logger.debug('');
        logger.debug(`Checking txn ${txn.id}, ${txn.description} ${txn.amount}`);

        rules_defintion.rules.forEach((ruleset) => {

            if (checkConditions(txn, ruleset.conditions)) {
                logger.debug(`txn passes all conditions`); 
            } else {
                logger.debug('txn DOES NOT pass all conditions');
            }

        });
    });

});
