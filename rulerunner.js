class RuleRunner {
    constructor(monzoClient, logger) {
        this.monzo = monzoClient;  
        this.logger = logger;
    },

    run(transactions, rules) {
        transactions.forEach((txn) => {
            this.logger.debug('');
            this.logger.debug(`Checking txn ${txn.id}, ${txn.description} ${txn.amount}`);

            rules.forEach((ruleset) => {

                if (checkConditions(txn, ruleset.conditions)) {
                    this.logger.debug(`txn passes all conditions`); 
                } else {
                    this.logger.debug('txn DOES NOT pass all conditions');
                }

            });
        });      
    }

    checkConditions(transaction, conditions) {
        return conditions.every((condition) => {
            const checker = require(`./conditions/${condition.condition_type}`);
            const result = checker.check(transaction, condition);
            
            this.logger.debug(`${JSON.stringify(condition)} is ${result}`);

            return result;
        });
    }
}
