module.exports = {
    "apply": function(client, transaction, action) {
        client.setNotes(transaction.id, action.tags.map((t) => {
            return '#' + t;
        }).join(' '));
    }
}
