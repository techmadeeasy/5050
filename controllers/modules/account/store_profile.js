var promise_query = require('../utils/promise_connection');

module.exports = (params) => {
    return new Promise((resolve, reject) => {

        var farmer_id;
        promise_query('select ID from Farmer where email_address = ?', [params.user._json.email])
        .then(result => {
            if(result.length > 0){
                farmer_id = result[0].ID;
                return promise_query('update Farmer set profile = ? where ID = ?', [params.user._raw, result[0].ID]);
            }else{
                return promise_query('insert into Farmer (fullname, email_address, profile)values(?,?,?)', [params.user._json.name, params.user._json.email, params.user._raw]);
            }
        })
        .then(result => resolve({farmer_id: farmer_id ? farmer_id: result.insertId}))
        .catch(error => reject(error));

    });
}
