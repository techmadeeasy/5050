var promise_query = require('../utils/promise_connection');
var cryptojs = require('crypto-js');


module.exports = (params) => {
    return new Promise((resolve, reject) => {
        console.log(params);
        promise_query('update Farmer set email_address=?, phone_number=?, fullname=? where ID = ?',
                        [params.email_address, params.phone_number, params.fullname, params.ID])
        .then(result => resolve({success:'true'}))
        .catch(error => reject({message: error.message, profile: params}));

    });
};
