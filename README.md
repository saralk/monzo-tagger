# monzo-tagger

# notes

> Haven’t tested a direct debit specifically but you can add notes/tags to transactions by using the annotate transaction request with the key “notes”
https://docs.monzo.com/#annotate-transaction

# todo

- [ ] auth to monzo api
- [x] get list of all transactions
- [x] create all conditions
- [ ] create all actions
- [x] run each transaction through the conditions
- [x] apply each action
- [ ] annotate transaction to say that it has been run through a ruleset
- [ ] create tests
