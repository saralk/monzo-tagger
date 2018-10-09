module.exports = {
    "check": function(txn, condition) {
        return txn.amount < 0;
    }
}
