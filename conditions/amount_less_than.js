module.exports = {
    "check": function(txn, condition) {
        const txn_amt = txn.amount < 0 ? txn.amount * -1 : txn.amount;
        return txn_amt < condition.amount_pence; 
    }
}
