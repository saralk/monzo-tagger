const moment = require('moment');

module.exports = {
    "check": function(txn, condition) {
        if (txn.merchant && txn.merchant.address && txn.merchant.address.latitude) {
            const lat = txn.merchant.address.latitude;
            const lng = txn.merchant.address.longitude;

            return this.getDistance(lat, lng, condition.coords[0], condition.coords[1]) < (condition.radius_meters/1000);
        }

        return condition.result_if_unknown || false;
    },
    "getDistance": function(lat1, lon1, lat2, lon2) {
        var radlat1 = Math.PI * lat1 / 180
        var radlat2 = Math.PI * lat2 / 180
        var theta = lon1 - lon2
        var radtheta = Math.PI * theta / 180
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist)
        dist = dist * 180 / Math.PI
        dist = dist * 60 * 1.1515
        return dist
    }
}
