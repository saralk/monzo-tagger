const request = require('request');

const MONZO_API_DOMAIN = 'https://api.monzo.com';

class Monzo {
    constructor(account_id, access_token) {
        this.account_id = account_id,
        this.access_token = access_token
    }

    convertObjectToUrlParams(params) {
        return Object.keys(params).map((k) => {
            return `${k}=${params[k]}`;
        }).join('&');
    }

    makeGetRequest(endpoint, params, cb) {
        params.account_id = this.account_id;
        const url = `${MONZO_API_DOMAIN}/${endpoint}?${this.convertObjectToUrlParams(params)}`; 
        return request(url, {
            'auth': {
                'bearer': this.access_token
            }
        }, cb);
    }

    getTransactions(cb) {
        this.makeGetRequest('transactions', {}, (err, res, body) => {
            if (err) {
                cb(true); 
                return;
            }

            cb(false, JSON.parse(body).transactions);
        });
    }
}

module.exports = Monzo
