const condition = {
    "check_condition": function(txn, condition) {
        const txn_amt = txn.amount < 0 ? txn.amount * -1 : txn.amount;
        return txn_amt > condition.amount_pence; 
    },
    "fields": [
        {
            "field_name": "amount_pence",
            "type": "integer",
            "Description": "The transaction value must be greater than (in pence)"
        }
    ]
}

module.exports = condition;
