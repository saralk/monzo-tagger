class RuleRunner {
    constructor(monzoClient, logger) {
        this.monzo = monzoClient;
        this.logger = logger;
    }

    run(transactions, rules) {
        transactions.forEach((txn) => {
            if (this.checkConditions(txn, rules.conditions)) {
                this.applyActions(txn, rules.actions);
            }
        });
    }

    applyActions(txn, actions) {
        actions.forEach((action) => {
            const action_definiton = require(`./actions/${action.action_type}`);
            action_definiton.apply(this.monzo, txn, action);
        });
    }

    checkConditions(transaction, conditions) {
        return conditions.every((condition) => {
            const checker = require(`./conditions/${condition.condition_type}`);
            const result = checker.check(transaction, condition);

            return result;
        });
    }
}

module.exports = RuleRunner
