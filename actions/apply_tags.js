module.exports = {
    "apply": function(client, transaction, action) {
        console.log(client);
        client.setNotes(action.tags.map((t) => {
            return '#' + t;
        }).join(' '));
    }
}
