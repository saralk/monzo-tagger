module.exports = {
    "apply": function(client, transaction, action) {
        client.addTags(transaction.id, action.tags);
    }
}
