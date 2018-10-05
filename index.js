const env = require('env2')('./.env');
const Monzo = require('./monzo');

console.log(process.env.MONZO_ACCOUNT_ID, process.env.MONZO_ACCESS_TOKEN);
const monzo = new Monzo(process.env.MONZO_ACCOUNT_ID, process.env.MONZO_ACCESS_TOKEN); 

monzo.getTransactions((err, transactions) => {
    if (err) {
        return;
    }

    transactions.forEach((txn) => {
        console.log(txn);
    });
});
