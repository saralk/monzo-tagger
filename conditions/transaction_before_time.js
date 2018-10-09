const moment = require('moment');

module.exports = {
    "check": function(txn, condition) {
        //TODO timezones
        //TODO "time inbetween range"
        const date = moment(txn.created);
        const hour = date.hour();
        const minute = date.minute();

        return hour <= condition.time_hours && minute <= condition.time_mins;
    }
}
