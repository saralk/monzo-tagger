const moment = require('moment');

module.exports = {
    "check": function(txn, condition) {
        //TODO timezones
        const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
        const date = moment(txn.created);
        const dow = date.day();

        return condition.days.includes(days[dow]);
    }
}
