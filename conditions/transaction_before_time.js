const moment = require('moment');

module.exports = {
    "check": function(txn, condition) {
        //TODO timezones
        //TODO "time inbetween range"
        const date = moment(txn.created);

        const condition_date = date.clone();
        condition_date.hour(condition.time_hours);
        condition_date.minute(condition.time_mins);

        return date.isBefore(condition_date);
    }
}
