const request = require('request');

const MONZO_API_DOMAIN = 'https://api.monzo.com';

class Monzo {
    constructor(account_id, access_token, logger) {
        this.account_id = account_id;
        this.access_token = access_token;
        this.logger = logger;
        this.cache = {};
    }

    cacheTransaction(transaction) {
        this.cache[transaction.id] = transaction;
    }

    getTransactionFromCache(id) {
        return this.cache[id];
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

    makePatchRequest(endpoint, object, cb) {
        const params = {
            'account_id': this.account_id
        }
        const url = `${MONZO_API_DOMAIN}/${endpoint}?${this.convertObjectToUrlParams(params)}`;
        return request.patch(url, {
            'auth': {
                'bearer': this.access_token
            },
            'form': object
        }, cb);
    }

    getTransactions(cb) {
        this.makeGetRequest('transactions', {
            'expand[]': 'merchant'
        }, (err, res, body) => {
            if (err) {
                cb(true);
                return;
            }

            const transactions = JSON.parse(body).transactions;

            transactions.forEach((t) => {
                this.cacheTransaction(t);
            });

            cb(false, transactions);
        });
    }

    addTags(transaction_id, tags) {
        const transaction = this.getTransactionFromCache(transaction_id);
        const current_tags = transaction.notes.match(/#\w*/g) || [];
        const new_tags = tags.map((t) => {
            return '#' + t;
        });
        const tags_to_add = new_tags.filter((t) => {
            return current_tags.indexOf(t) === -1;
        }).join(' ');
        const notes = [transaction.notes, tags_to_add].join(' ');

        this.logger.debug([
            `${transaction_id} ${transaction.description}`,
            `current tags: ${current_tags.join()}`,
            `new tags: ${new_tags.join()}`,
            `tags to add: ${tags_to_add}`,
            `notes: ${notes}`
        ].join('\n'));

        this.makePatchRequest(`transactions/${transaction_id}`, {
            'metadata[notes]': notes
        }, (err, res, body) => {});
    }
}

module.exports = Monzo
