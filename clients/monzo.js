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

    makePatchRequest(endpoint, params, cb) {
        params.account_id = this.account_id;
        const url = `${MONZO_API_DOMAIN}/${endpoint}?${this.convertObjectToUrlParams(params)}`; 
        return request.patch(url, {
            'auth': {
                'bearer': this.access_token
            }
        }, cb);
    }

    getTransactions(cb) {
        this.makeGetRequest('transactions', {'expand[]':'merchant'}, (err, res, body) => {
            if (err) {
                cb(true); 
                return;
            }

            console.log(body);;

            cb(false, JSON.parse(body).transactions);
        });
    }

    setNotes(transaction_id, notes) {
        this.makePatchRequest(`transactions/${transaction_id}`, {'metadata[notes]':notes}, (err, res, body) => {
            console.log(body); 
        });
    }
}

module.exports = Monzo
